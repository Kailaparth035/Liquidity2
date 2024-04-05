import React, {useCallback, useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  ScrollView,
} from 'react-native';
import {useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import {Header} from '../../components';
import {profileStyles as styles} from '../profile/profile.styles';
import CustomButton from '../wallet-details/components/CustomButton';
import BankDetailsCard from '../add-funds/components/BankDetailsCard';
import {selectBankstyles} from './select-bank.style';
import {
  BankAccountMetadataType,
  BankAccountType,
} from 'views/profile/components/bank-accounts/types';
import {selectedBankAcount} from '../../states/select-bank/select-bank-account';

if (
  Platform.OS == 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SelectBank = ({navigation, route}: any) => {
  const setAccount = useSetRecoilState(selectedBankAcount);
  const bankList = route.params?.bankList;
  const checkedAccount = route.params?.accountSelected;
  const [data, setData] = useState<BankAccountType>();
  const [selectedAccount, setselectedAccount] = useState<string>(
    checkedAccount.accounts[0].accountId,
  );
  const [openId, setOpenId] = useState<string>(
    checkedAccount.id ?? checkedAccount._id,
  );

  const {colors} = useTheme();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDropDown = (id: string) => {
    if (openId === id) {
      setOpenId('-1');
    } else {
      setOpenId(id);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const handleRadioBtn = (
    bank: BankAccountMetadataType,
    account: BankAccountType,
    selectAccount: BankAccountType,
  ) => {
    setData(selectAccount);
    setselectedAccount(account.accountId);
  };

  return (
    <View
      style={[
        styles.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <Header goBack={goBack} title="Select Bank" />
      <ScrollView>
        <View style={selectBankstyles.listContainer}>
          {bankList.map((item: BankAccountMetadataType, index: number) => (
            <BankDetailsCard
              bank={item}
              showOption={item._id === openId}
              selectedAccount={selectedAccount}
              onRadioPress={handleRadioBtn}
              onDropDownPress={() => {
                handleDropDown(item._id);
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={[selectBankstyles.footer, {backgroundColor: colors.ground}]}>
        <CustomButton
          onPress={goBack}
          customButtonStyle={[
            selectBankstyles.backBtn,
            {backgroundColor: colors.box},
          ]}
          label={'Back'}
          isDarkButton={true}
          labelStyle={{color: colors.text}}
        />
        <CustomButton
          onPress={() => {
            setAccount(data);
            goBack();
          }}
          customButtonStyle={selectBankstyles.selectBtn}
          label={'Select'}
          labelStyle={selectBankstyles.selectLabel}
        />
      </View>
    </View>
  );
};

export default SelectBank;
