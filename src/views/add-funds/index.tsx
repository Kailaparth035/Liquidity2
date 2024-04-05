import React, {useCallback, useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header} from '../../components';
import CustomButton from '../wallet-details/components/CustomButton';
import BankDetailsCard from './components/BankDetailsCard';
import {useNetwork} from '../../hooks';
import {useFortressAccountInfo} from '../../hooks/use-fortressAccountInfo';
import {selectedBankAcount} from '../../states/select-bank';
import {useCurrency} from '../../hooks/use-currency';
import {APIS} from '../../constants';
import {Routes} from '../../views/routes/constants';
import {profileStyles as styles} from '../profile/profile.styles';
import {addFundsStyles} from './add-funds.style';

const AddFunds = ({navigation, route}: any) => {
  const bankList = route.params?.bankList;
  const transectionType = route.params?.transectionType;
  const isWire = route.params?.isWire;
  const selectedAccount = useRecoilValue(selectedBankAcount ?? bankList?.[0]);
  const [amount, setAmount] = useState<string>();
  const [withdrawNote, setWithdrawNote] = useState<string>('');
  const {colors} = useTheme();
  const {formatCurrency} = useCurrency();
  // const info = useRecoilValue(InfoDataState);
  // const {balance} = info.stellar ?? {};
  const {AccountInfo} = useFortressAccountInfo();
  const balance = AccountInfo?.balance;
  const {post, data, loading} = useNetwork();
  const [loadingValue, setLoadingValue] = useState(false);

  const goBack = useCallback(() => {
    navigation.navigate(Routes.DepositScreen, {
      transactionType: transectionType,
    });
  }, [navigation]);

  const handleOnChange = () => {
    navigation.navigate(Routes.SelectBank, {
      bankList: bankList,
      accountSelected: selectedAccount ? selectedAccount : bankList[0],
    });
  };

  const setMaxAmount = () => {
    let maxPrice = '10000';
    if (balance) {
      if (parseInt(balance) > parseInt(maxPrice)) {
        setAmount(maxPrice);
      } else {
        setAmount(`${balance}`);
      }
    } else {
      setAmount(`${balance ?? 0}`);
    }
  };

  const handleDeposite = useCallback(() => {
    const walletBalance = balance ? balance : 0;
    if (!amount) {
      Alert.alert('Please enter amount.');
      return;
    }
    if (amount <= 0 && transectionType === 'Withdraw') {
      Alert.alert('Please enter valid amount.');
      return;
    } else if (amount > walletBalance && transectionType === 'Withdraw') {
      Alert.alert(
        `Your account doesn't have sufficient balance`,
        `Please enter valid amount.`,
      );
      return;
    }
    if (isWire) {
      navigation.navigate(Routes.WireWithdraw, {
        amount: amount,
        note: withdrawNote,
      });
      return;
    }
    setLoadingValue(true);
    const payload = {
      tokenId: selectedAccount?.id ?? bankList[0]?._id,
      accountId:
        selectedAccount?.accounts[0]?.accountId ??
        bankList[0]?.accounts?.[0]?.accountId,
      accountType:
        selectedAccount?.accounts[0]?.subtype?.toUpperCase() ??
        bankList[0]?.accounts?.[0]?.subtype?.toUpperCase(),
      amount,
      transactionType:
        transectionType === 'Withdraw'
          ? 'withdrawl'
          : transectionType?.toLowerCase(),
      mode: 'ach',
    };
    post(APIS.paymentInitiation, payload)
      .then(resp => {
        if (resp?.message) {
          Alert.alert(resp.message);
          return;
        }
        if (resp?.resp?.message) {
          Alert.alert(resp.resp.message);
          return;
        }
        if (resp?.id) {
          setTimeout(() => {
          setLoadingValue(false);
          navigation.navigate(Routes.AddFundProcessing, {
            status: 'Completed',
            id: resp.id,
            transectionType: transectionType,
            amount: amount,
          });
          }, 6000);
        }
      })
      .catch(() => {
        setLoadingValue(false);
      });
  }, [selectedAccount, transectionType, amount, withdrawNote, isWire]);

  return (
    <View
      style={[
        styles.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <Header
        goBack={goBack}
        title={transectionType === 'Deposit' ? 'Add Funds' : 'Withdraw Funds'}
      />
      <View style={addFundsStyles.parent}>
        <KeyboardAwareScrollView>
          {transectionType === 'Withdraw' && (
            <>
              <View
                style={[
                  addFundsStyles.withdrawView,
                  {backgroundColor: colors.box},
                ]}>
                <Text
                  style={[
                    addFundsStyles.balanceText,
                    {fontWeight: '500', color: colors.text},
                  ]}>
                  Available Balance
                </Text>
                <Text
                  style={[addFundsStyles.balanceText, {color: colors.text}]}>
                  {formatCurrency(balance ?? '0', 2)}
                </Text>
              </View>
              <View
                style={[addFundsStyles.dotedLine, {borderColor: colors.border}]}
              />
            </>
          )}

          <Text style={{color: colors.text}}>
            Amount to{transectionType === 'Deposit' ? ' Add' : ' Withdraw'}
          </Text>
          <View
            style={[
              addFundsStyles.amountInputeView,
              {
                borderColor: colors.text,
              },
            ]}>
            <TextInput
              value={amount}
              placeholder={'Amount'}
              style={[
                addFundsStyles.inputField,
                {color: colors.text, borderColor: colors.text},
              ]}
              onChangeText={val => {
                setAmount(val);
              }}
              keyboardType={'decimal-pad'}
              placeholderTextColor={colors.box}
            />
            {transectionType !== 'Deposit' && (
              <TouchableOpacity
                onPress={() => setMaxAmount()}
                style={[
                  addFundsStyles.maxButton,
                  {
                    backgroundColor: colors.ground,
                  },
                ]}>
                <Text style={{color: colors.text}}>Max</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={[addFundsStyles.listHeader, {color: colors.text}]}>
            {transectionType} From
          </Text>
          {isWire ? (
            <>
              <TextInput
                multiline
                placeholder="Write a note here..."
                placeholderTextColor={colors.text}
                style={[
                  styles.noteComment,
                  {borderColor: colors.text, color: colors.text},
                ]}
                value={withdrawNote}
                onChangeText={text => {
                  setWithdrawNote(text);
                }}
              />
            </>
          ) : (
            <BankDetailsCard
              bank={selectedAccount ? selectedAccount : bankList[0]}
              Button={true}
              onChangePress={handleOnChange}
            />
          )}
        </KeyboardAwareScrollView>
      </View>
      <View style={[addFundsStyles.footer, {backgroundColor: colors.ground}]}>
        <CustomButton
          onPress={goBack}
          customButtonStyle={[
            addFundsStyles.backBtn,
            {backgroundColor: colors.box},
          ]}
          label={'Cancel'}
          isDarkButton={true}
          labelStyle={{color: colors.text}}
        />
        <CustomButton
          onPress={handleDeposite}
          customButtonStyle={addFundsStyles.addBtn}
          label={transectionType === 'Deposit' ? 'Add Funds' : 'Withdraw'}
          labelStyle={addFundsStyles.addBtnText}
          disabled={loadingValue}
          isLoading={loadingValue}
        />
      </View>
    </View>
  );
};

export default AddFunds;
