import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  PlaidLink,
  LinkExit,
  LinkTokenConfiguration,
  LinkSuccessMetadata,
} from 'react-native-plaid-link-sdk';
import {useRecoilValue} from 'recoil';
import {Svg_No_Transaction} from '../../../../assets/icon/svg/noTransactions';
import {Svg_No_Transaction_light} from '../../../../assets/icon/svg/noTransactions-light';
import {Header} from '../../../../components';
import {NoData} from '../../../../components/empty-state';
import {Loader} from '../../../../storybook/loader';
import DeleteModal from './components/DeleteModal';
import {isDarkModeState} from '../../../../states';
import {useNetwork} from '../../../../hooks';
import {APIS} from '../../../../constants';
import AccountCard from './components/accountCard';
import {ErrorAlert} from '../../../../helpers/Alter';
import {BankAccountMetadataType} from './types';
import {BankAccountsStyles as styles} from './bank-accounts.styles';

export const BankAccounts = ({navigation}: any) => {
  const [accounts, setAccounts] = useState<BankAccountMetadataType[]>([]);
  const [loader, setLoader] = useState(false);
  const [loadingArray, setLoadingArray] = useState(new Set());
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const {colors} = useTheme();
  const {post: generateToken, data: tokenResponse} = useNetwork();
  const {get, post, remove} = useNetwork();

  const isDarkMode = useRecoilValue(isDarkModeState);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    get(APIS.GetBankAccounts)
      .then(res => {
        if (res.data) {
          setAccounts(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        ErrorAlert('Error', error);
      });
    SheetModal();
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token],
  );

  const handle_OnScccess = async (data: any) => {
    try {
      await onSuccess(data.publicToken, data.metadata);
      setLoading(true);
      const res = await get(APIS.GetBankAccounts);
      setAccounts(res?.data);
    } catch (error: any) {
      setLoading(false);
      ErrorAlert('Error', error.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const config: LinkTokenConfiguration = {
    token,
    noLoadingState: true,
  };

  const deleteAccount = async (accountId: string) => {
    let copy = loadingArray;
    copy.add(accountId);
    setLoadingArray(copy);
    try {
      await remove(`${APIS.GetBankAccounts}/${accountId}`);
      const newAccountList = await get(APIS.GetBankAccounts);
      setAccounts(newAccountList.data);
      copy = loadingArray;
      copy.delete(accountId);
      setLoadingArray(copy);
    } catch (err) {
      ErrorAlert('Error', 'Something went wrong try again');
    } finally {
      copy = loadingArray;
      copy.delete(accountId);
      setLoadingArray(copy);
    }
  };

  useEffect(() => {
    if (tokenResponse?.token) {
      setToken(tokenResponse.token);
    }
  }, [tokenResponse?.token]);

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <Header title="Bank Accounts" goBack={goBack} />
      {loading ? (
        <Loader />
      ) : accounts.length > 0 ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 100}}
          data={accounts}
          renderItem={({item}) => (
            <AccountCard
              name={item?.bankName}
              loading={loadingArray.has(item?._id)}
              accounts={item?.accounts}
              onDeletePress={() => {
                setDeleteId(item?._id);
                setShowDelete(true);
              }}
            />
          )}
        />
      ) : (
        <NoData
          msg="Nothing Here"
          subMsg="Add bank account to trade"
          svg={
            isDarkMode === true ? Svg_No_Transaction : Svg_No_Transaction_light
          }
          height={220}
        />
      )}
      <View style={[styles.bottomSheet, {backgroundColor: colors.ground}]}>
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
          <View style={styles.btnContainer}>
            {loader ? (
              <Loader top={0} />
            ) : (
              <Text style={styles.btnText}>Add New Bank Accounts</Text>
            )}
          </View>
        </PlaidLink>
      </View>
      <DeleteModal
        title="Remove Account"
        message="Removing Account will remove it from the profile. Do you want to
        remove?"
        isOpen={showDelete}
        handleConfirm={() => {
          setShowDelete(false);
          deleteAccount(deleteId);
        }}
        handleCancel={() => {
          setShowDelete(false);
        }}
      />
    </View>
  );
};
