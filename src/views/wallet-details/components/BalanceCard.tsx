// @flow
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {styles} from './BalanceCard.style';
import CustomButton from './CustomButton';
import {useCurrency} from '../../../hooks/use-currency';
import {APIS, NO_DATA} from '../../../constants';
import {useRecoilValue} from 'recoil';
import {InfoDataState} from '../../../states';
import {COLORS} from '../../../assets';
import {BankLine, BankCardLine} from '../../../assets/images';
import AddBalanceButton from './AddBalanceButton';
import {Routes} from '../../../views/routes/constants';
import {
  SELECT_ACCOUNT,
  TRANSACTION_TYPE,
} from '../../../views/deposit/constant';
import {useFortressAccountInfo} from '../../../hooks/use-fortressAccountInfo';
import {useNetwork} from '../../../hooks';
import {Loader} from '../../../storybook';

type BalanceCardType = {
  onPress: any;
  navigateBankAccount: any;
  navigateCard: any;
  bankAccounts?: any;
};

const BalanceCard = ({
  onPress,
  navigateBankAccount,
  navigateCard,
  bankAccounts,
}: BalanceCardType) => {
  const {colors} = useTheme();
  const {formatCurrency} = useCurrency();
  const info = useRecoilValue(InfoDataState);
  const [accountInfo, setAccountInfo] = useState('0');
  const {get} = useNetwork();
  const [loading, setLoading] = useState(false);
  // const {balance} = info.stellar ?? {};
  // const {AccountInfo} = useFortressAccountInfo();
  const balance = parseFloat(accountInfo?.balance);
  const [callCount, setCallCount] = useState(0);

  const accountFortress = () => {
    get(APIS.fortressAccountInfo).then(res => {
      if (res.data) {
        setAccountInfo(res.data);
      }
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      accountFortress();
      setLoading(false);
    }, 2000 * 3);

    return () => clearTimeout(timer);
  }, [callCount]);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      if (callCount < 4) {
        accountFortress();
        setCallCount(prevCount => prevCount + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [callCount]);

  return (
    <View style={[styles.card]}>
      <Text style={[styles.text, {color: colors.lightText}]}>
        Available balance
      </Text>
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Loader style={{alignSelf: 'center'}} />
        </View>
      ) : (
        <Text style={[styles.ammountText, {color: colors.text}]}>
          {formatCurrency(balance ?? '0', 2)}
        </Text>
      )}
      <View style={styles.customeButtonView}>
        <View style={{flex: 1}}>
          <CustomButton
            label={TRANSACTION_TYPE.Withdraw}
            onPress={() => onPress(TRANSACTION_TYPE.Withdraw)}
            disabled={!balance || balance == 0}
            isDarkButton={true}
            customButtonStyle={[
              styles.button,
              {
                backgroundColor: colors.box,
                marginRight: 7,
              },
            ]}
            labelStyle={[styles.buttonText, {color: colors.text}]}
          />
        </View>
        <View style={{flex: 1}}>
          <CustomButton
            label={TRANSACTION_TYPE.Deposite}
            onPress={() => {
              onPress(TRANSACTION_TYPE.Deposite);
            }}
            customButtonStyle={[styles.button, {marginLeft: 7}]}
            labelStyle={styles.buttonText}
          />
        </View>
      </View>
      <View style={styles.bankDetailsButtonView}>
        <AddBalanceButton
          icon={BankLine}
          label={SELECT_ACCOUNT.BankAccount}
          number={bankAccounts.length + ' Accounts'}
          buttonStyle={{marginRight: 7, backgroundColor: colors.box}}
          onPress={() => navigateBankAccount()}
          // Routes.BankAccounts
        />
        {/* <AddBalanceButton
          icon={BankCardLine}
          label={SELECT_ACCOUNT.Cards}
          number="2 cards"
          buttonStyle={{marginLeft: 7, backgroundColor: colors.box}}
          onPress={() => navigateCard()}
          // Routes.Cards
        /> */}
      </View>
    </View>
  );
};

export default BalanceCard;
