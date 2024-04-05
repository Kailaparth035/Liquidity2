import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {Header} from '../../components';
import MethodTypeButton from '../deposit/components/methodTypeButton';
import CustomButton from '../wallet-details/components/CustomButton';
import {Loader} from '../../storybook';
import {BankAccountMetadataType} from '../profile/components/bank-accounts/types';
import {useNetwork} from '../../hooks';
import {APIS} from '../../constants';
import {ErrorAlert} from '../../helpers/Alter';
import {BankLine, WireLine} from '../../assets/images';
import {Routes} from '../routes/constants';
import {SELECT_ACCOUNT, TRANSACTION_TYPE} from './constant';
import {depositeStyles} from './deposite.style';
import {styles} from '../wallet-details/components/BalanceCard.style';

const depositScreen = (props: any) => {
  const {transactionType} = props.route.params;
  const {colors} = useTheme();
  const {get, loading, setLoading} = useNetwork();
  const [bankAccouts, setBankAccouts] = useState<BankAccountMetadataType[]>([]);
  const [selectedButton, setSelectedButton] = useState(
    SELECT_ACCOUNT.BankAccount,
  );
  const isFocuse = useIsFocused();

  useEffect(() => {
    setLoading(true);
    get(APIS.GetBankAccounts)
      .then(res => {
        if (res?.data) {
          setBankAccouts(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        ErrorAlert('Error', error);
      });
  }, [isFocuse]);

  const onPress = () => {
    if (transactionType === TRANSACTION_TYPE.Deposite) {
      switch (selectedButton) {
        case SELECT_ACCOUNT.BankAccount:
          {
            if (bankAccouts.length) {
              props.navigation.navigate(Routes.AddFunds, {
                bankList: bankAccouts,
                transectionType: TRANSACTION_TYPE.Deposite,
              });
            } else {
              props.navigation.navigate(Routes.AddNewaccountDeposite);
            }
          }
          break;
        case SELECT_ACCOUNT.Card:
          {
            props.navigation.navigate(Routes.Cards, {
              bankList: bankAccouts,
              transectionType: TRANSACTION_TYPE.Deposite,
            });
          }
          break;
        case SELECT_ACCOUNT.Wire:
          {
            props.navigation.navigate(Routes.WireDeposite);
          }
          break;
      }
    } else {
      switch (selectedButton) {
        case SELECT_ACCOUNT.BankAccount:
          {
            if (bankAccouts.length) {
              props.navigation.navigate(Routes.AddFunds, {
                bankList: bankAccouts,
                transectionType: TRANSACTION_TYPE.Withdraw,
              });
            } else {
              props.navigation.navigate(Routes.AddNewaccountDeposite);
            }
          }
          break;

        case SELECT_ACCOUNT.Card:
          {
            props.navigation.navigate(Routes.AddFunds, {
              bankList: bankAccouts,
              transectionType: TRANSACTION_TYPE.Withdraw,
            });
          }
          break;

        case SELECT_ACCOUNT.Wire:
          {
            props.navigation.navigate(Routes.AddFunds, {
              bankList: bankAccouts,
              transectionType: TRANSACTION_TYPE.Withdraw,
              isWire: true,
            });
          }
          break;
      }
    }
  };
  if (loading) return <Loader style={{marginTop: 60}} />;
  return (
    <View
      style={[
        depositeStyles.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <Header
        goBack={() => props.navigation.goBack()}
        title="Select a Method"
      />
      <View style={depositeStyles.pageContainer}>
        <MethodTypeButton
          icon={BankLine}
          label={SELECT_ACCOUNT.BankAccount}
          buttonStyle={{
            backgroundColor: colors.box,
            borderWidth: selectedButton === SELECT_ACCOUNT.BankAccount ? 1 : 0,
            borderColor: colors.text,
          }}
          onPress={() => setSelectedButton(SELECT_ACCOUNT.BankAccount)}
        />

        {/* Hide cards option for payment for now */}

        {/* <MethodTypeButton
          icon={BankCardLine}
          label={SELECT_ACCOUNT.Card}
          buttonStyle={{
            marginTop: 15,
            backgroundColor: colors.box,
            borderWidth: selectedButton === SELECT_ACCOUNT.Card ? 1 : 0,
            borderColor: colors.text,
          }}
          onPress={() => setSelectedButton(SELECT_ACCOUNT.Card)}
        /> */}
        <MethodTypeButton
          icon={WireLine}
          label={SELECT_ACCOUNT.Wire}
          buttonStyle={{
            marginTop: 15,
            backgroundColor: colors.box,
            borderWidth: selectedButton === SELECT_ACCOUNT.Wire ? 1 : 0,
            borderColor: colors.text,
          }}
          onPress={() => setSelectedButton(SELECT_ACCOUNT.Wire)}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={[
            depositeStyles.customeButtonView,
            {backgroundColor: colors.ground},
          ]}>
          <View style={{flex: 1}}>
            <CustomButton
              label="Cancel"
              onPress={() => props.navigation.goBack()}
              isDarkButton={true}
              customButtonStyle={[
                styles.button,
                depositeStyles.buttonextraStyle,
                {
                  backgroundColor: colors.box,
                },
              ]}
              labelStyle={[styles.buttonText, {color: colors.text}]}
            />
          </View>
          <View style={{flex: 1}}>
            <CustomButton
              label="Next"
              onPress={() => {
                onPress();
              }}
              customButtonStyle={[
                styles.button,
                {marginLeft: 7, padding: 5, borderRadius: 8},
              ]}
              labelStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default depositScreen;
