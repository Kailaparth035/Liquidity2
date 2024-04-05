//import liraries
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSetRecoilState} from 'recoil';
import {
  PlaidLink,
  LinkExit,
  LinkTokenConfiguration,
  LinkSuccessMetadata,
} from 'react-native-plaid-link-sdk';
import {Loader, SVG} from '../../storybook';
import {ErrorAlert} from '../../helpers/Alter';
import {close_line} from '../../assets/icon/svg/close-line';
import {BankLine} from '../../assets/images';
import {APIS} from '../../constants';
import {useNetwork} from '../../hooks';
import {BankAccountMetadataType} from 'views/profile/components/bank-accounts/types';
import {selectedBankAcount} from '../../states/select-bank';
import {Routes} from '../../views/routes/constants';
import {TRANSACTION_TYPE} from '../../views/deposit/constant';
import {addNewAccountDeoposite} from './addNewaccountDeposite.style';
const AddNewaccountDeposite = ({navigation}: any) => {
  const setAccount = useSetRecoilState(selectedBankAcount);
  const [accounts, setAccounts] = useState<BankAccountMetadataType[]>([]);
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState(false);
  const {colors} = useTheme();
  const {get, post} = useNetwork();
  const {post: generateToken, data: tokenResponse} = useNetwork();
  const config: LinkTokenConfiguration = {
    token,
    noLoadingState: true,
  };

  useEffect(() => {
    SheetModal();
  }, []);

  const handle_OnScccess = async (data: any) => {
    try {
      await onSuccess(data.publicToken, data.metadata);
      const res = await get(APIS.GetBankAccounts);
      setAccounts(res?.data);
      setAccount(res?.data[0]);
      navigation.navigate(Routes.AddFunds, {
        bankList: res?.data,
        transectionType: TRANSACTION_TYPE.Deposite,
      });
    } catch (error: any) {
      ErrorAlert('Error', error.message ?? 'Something went wrong');
    } finally {
    }
  };

  const onSuccess = useCallback<any>(
    async (publicToken: string, metadata: LinkSuccessMetadata) => {
      let payload = {
        bankName: metadata.institution?.name ?? '',
        linkToken: token,
        token: publicToken,
      };
      const response = await post(APIS.TokenExchange, payload);
      if (!response.id) {
        ErrorAlert('Error', response?.message ?? 'Something went wrong');
      }
      setToken('');
      SheetModal();
    },
    [token],
  );

  const SheetModal = async () => {
    const payload = {
      language: 'en',
      countryCodes: ['US'],
    };
    try {
      await generateToken(APIS.LiquidityLinkToken, payload);
    } catch (error) {
      ErrorAlert('Error', JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (tokenResponse?.token) {
      setToken(tokenResponse.token);
    }
  }, [tokenResponse?.token]);
  return (
    <View
      style={[
        addNewAccountDeoposite.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <TouchableOpacity
        style={[addNewAccountDeoposite.closeButton]}
        onPress={() => navigation.goBack()}>
        <SVG name={close_line} width={24} height={24} />
      </TouchableOpacity>
      <View
        style={[
          addNewAccountDeoposite.imageContainer,
          {backgroundColor: colors.headerCard},
        ]}>
        <Image source={BankLine} style={addNewAccountDeoposite.imageStyle} />
      </View>
      <Text style={[addNewAccountDeoposite.text, {color: colors.lightText}]}>
        No bank account available
      </Text>

      <PlaidLink
        onPress={() => {
          setLoader(true);
        }}
        tokenConfig={config}
        onSuccess={success => {
          setLoader(false);
          handle_OnScccess(success);
        }}
        onExit={(exit: LinkExit) => {
          setLoader(false);
        }}>
        <View style={addNewAccountDeoposite.btnContainer}>
          {loader ? (
            <Loader top={0} />
          ) : (
            <Text style={addNewAccountDeoposite.btnText}>
              Add New Bank Accounts
            </Text>
          )}
        </View>
      </PlaidLink>
    </View>
  );
};

export default AddNewaccountDeposite;
