import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Header} from '../../components';
import CustomeInpute from '../wire-withdraw/components/customeInpute';
import CustomButton from '../wallet-details/components/CustomButton';
import {styles} from './wireWithdraw.style';
import {useNetwork} from '../../hooks';
import {APIS} from '../../constants';
import {Routes} from '../../views/routes/constants';
import {toast} from '../../libs';
import {SelectScroll} from '../../storybook';
import {pickerSelectStyles} from '../../storybook/selectScroll/pickerSelect.style';
import {pickerSelectStylesNew as dummy} from '../login/login.styles';
import {useRecoilState} from 'recoil';
import {isDarkModeState} from '../../states';
import {COUNTRY_US} from '../../views/login/constants/countries';
import {State_array} from './components/stateData';

const WireWithdraw = ({navigation, route}: any) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [bankAddress2, setBankAddress2] = useState('');
  const [bankZipCode, setBankZipCode] = useState('');
  const [bankCity, setBankCity] = useState('');
  const [bankState, setBankState] = useState('');
  const [country, setCountry] = useState<any>(null);
  const [bankCountry, setBankCountry] = useState<any>(null);
  const note = route.params.note;
  const amount = route.params.amount;

  const [isValid, setIsValid] = useState<any>({
    accountNumber: null,
    routingNumber: null,
    firstName: null,
    lastName: null,
    zipCode: null,
    country: null,
    streetAddress: null,
    city: null,
    state: null,
    bankName: null,
    bankAddress: null,
    bankZipCode: null,
    bankCity: null,
    bankState: null,
    bankCountry: null,
  });

  const [stage, setStage] = useState(1);
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();
  const {post, loading} = useNetwork();

  const validate = () => {
    const nameValidation = /^[a-zA-Z]{3,15}$/;
    if (stage === 1) {
      if (
        accountNumber?.length > 8 &&
        accountNumber?.length < 17 &&
        routingNumber?.length === 9 &&
        nameValidation.test(firstName) &&
        nameValidation.test(lastName) &&
        zipCode?.length > 4 &&
        zipCode?.length < 9 &&
        streetAddress?.length > 5 &&
        streetAddress?.length < 25 &&
        city?.length > 3 &&
        city?.length < 15 &&
        state?.length > 1 &&
        state?.length < 25 &&
        country?.length > 1
      ) {
        setStage(2);
      }
      setIsValid({
        accountNumber: accountNumber?.length > 8 && accountNumber?.length < 17,
        routingNumber: routingNumber?.length === 9,
        firstName: nameValidation.test(firstName),
        lastName: nameValidation.test(lastName),
        zipCode: zipCode?.length > 4 && zipCode?.length < 9,
        streetAddress: streetAddress?.length > 5 && streetAddress?.length < 25,
        city: city?.length > 3 && city?.length < 15,
        state: state?.length > 1 && state?.length < 25,
        country: country?.length > 1,
      });
    } else {
      setIsValid((prev: any) => {
        const newState = {
          ...prev,
          bankName: bankName?.length > 5 && bankName?.length < 20,
          bankAddress: bankAddress?.length > 5 && bankAddress?.length < 20,
          bankZipCode: bankZipCode?.length > 4 && bankZipCode?.length < 9,
          bankCity: bankCity?.length > 3 && bankCity?.length < 15,
          bankState: bankState?.length > 1 && bankState?.length < 25,
          bankCountry: bankCountry?.length > 1,
        };
        return newState;
      });
      if (
        bankName?.length > 5 &&
        bankName?.length < 20 &&
        bankAddress?.length > 5 &&
        bankAddress?.length < 20 &&
        bankZipCode?.length > 4 &&
        bankZipCode?.length < 9 &&
        bankCity?.length > 3 &&
        bankCity?.length < 15 &&
        bankState?.length > 1 &&
        bankState?.length < 25 &&
        bankCountry?.length > 1
      ) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const payload = {
      destination: {
        wireInfo: {
          accountNumber,
          routingNumber,
          receiverName: `${firstName} ${lastName}`,
          receiverAddress: {
            street1: streetAddress,
            postalCode: zipCode,
            city,
            state,
            country: 'US',
          },
          receiverBankName: bankName,
          receiverBankAddress: {
            street1: bankAddress,
            street2: bankAddress2,
            postalCode: bankZipCode,
            city: bankCity,
            state: bankState,
            country: 'US',
          },
        },
      },
      funds: amount,
      mode: 'wire',
    };
    if (note?.length > 0) {
      payload.comment = note;
    }

    post(APIS.paymentInitiation, payload).then(resp => {
      // getting default in API response when we get 500 error
      if (resp === 'default') {
        Alert.alert('Something went wrong');
        return;
      }
      if (resp) {
        if (resp?.message) {
          Alert.alert(resp.message);
        } else {
          toast('Transaction Completed');
          navigation.navigate(Routes.AddFundProcessing, {
            status: 'Completed',
            id: resp?.id ?? resp?.transactionId,
            transectionType: resp?.transectionType,
            amount: amount,
          });
        }
      }
    });
  };

  const handleBack = useCallback(() => {
    if (stage === 1) {
      setBankName('');
      setBankAddress('');
      setBankAddress2('');
      setBankCity('');
      setBankState('');
      setBankZipCode('');
      setBankState('');
      setBankCountry('');
      navigation.goBack();
    } else {
      setStage(1);
    }
  }, [stage]);

  return (
    <View style={[styles.wireContainer, {backgroundColor: colors.background}]}>
      <Header
        goBack={() => navigation.goBack()}
        title={'Recipient wire details'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.pageContainer}
          showsVerticalScrollIndicator={false}>
          {stage === 1 && (
            <>
              <CustomeInpute
                placeholderText="1234567890"
                title="Account number"
                keyboardType={'number-pad'}
                value={accountNumber}
                onchangeText={(text: string) => setAccountNumber(text)}
                maxLength={16}
                extraTitleStyle={{marginTop: 10}}
              />
              {isValid.accountNumber === false && (
                <Text style={styles.errorTxt}>Invalid account number</Text>
              )}
              <CustomeInpute
                placeholderText="0987654321"
                title="Routing number"
                keyboardType={'number-pad'}
                value={routingNumber}
                onchangeText={(text: string) => setRoutingNumber(text)}
                maxLength={9}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.routingNumber === false && (
                <Text style={styles.errorTxt}>Invalid routing number</Text>
              )}
              <CustomeInpute
                placeholderText="Name"
                title="First Name"
                keyboardType={'default'}
                value={firstName}
                onchangeText={(text: string) => setFirstName(text)}
                maxLength={50}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.firstName === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <CustomeInpute
                placeholderText="Name"
                title="Last Name"
                keyboardType={'default'}
                value={lastName}
                onchangeText={(text: string) => setLastName(text)}
                maxLength={50}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.lastName === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <CustomeInpute
                placeholderText="Street"
                title="Street address"
                keyboardType={'default'}
                value={streetAddress}
                onchangeText={(text: string) => setStreetAddress(text)}
                maxLength={100}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.streetAddress === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <CustomeInpute
                placeholderText="Name"
                title="City"
                keyboardType={'default'}
                value={city}
                onchangeText={(text: string) => setCity(text)}
                maxLength={50}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.city === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              {/* <CustomeInpute
                placeholderText="12345"
                title="State"
                keyboardType={'default'}
                value={state}
                onchangeText={(text: string) => setState(text)}
                maxLength={5}
                extraTitleStyle={{marginTop: 15}}
              /> */}
              <CustomeInpute
                placeholderText="12345"
                title="ZIP code"
                keyboardType={'number-pad'}
                value={zipCode}
                onchangeText={(text: string) => setZipCode(text)}
                maxLength={5}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.zipCode === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <View style={{marginTop: 20}}>
                <SelectScroll
                  style={isDark === true ? dummy : pickerSelectStyles}
                  name="State"
                  options={State_array}
                  label="State"
                  selectedItem={state}
                  setSelectedItem={(data: any) => {
                    setState(data);
                  }}
                  placeholder="Select State"
                />
                {isValid.state === false && (
                  <Text style={styles.errorTxt}>Invalid</Text>
                )}
              </View>
              <View style={{marginTop: 20}}>
                <SelectScroll
                  style={isDark === true ? dummy : pickerSelectStyles}
                  name="country"
                  options={COUNTRY_US}
                  label="Country"
                  selectedItem={country}
                  setSelectedItem={(data: any) => {
                    setCountry(data);
                  }}
                  placeholder="Select Country"
                />
                {isValid.country === false && (
                  <Text style={styles.errorTxt}>Invalid</Text>
                )}
              </View>
            </>
          )}
          {stage === 2 && (
            <>
              <CustomeInpute
                placeholderText="Bank Name"
                title="Bank Name"
                keyboardType={'default'}
                value={bankName}
                onchangeText={(text: string) => setBankName(text)}
                maxLength={50}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.bankName === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <CustomeInpute
                placeholderText="Street"
                title="Street address"
                keyboardType={'default'}
                value={bankAddress}
                onchangeText={(text: string) => setBankAddress(text)}
                maxLength={100}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.bankAddress === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <CustomeInpute
                placeholderText="Street"
                title="Street address 2"
                keyboardType={'default'}
                value={bankAddress2}
                onchangeText={(text: string) => setBankAddress2(text)}
                maxLength={100}
                extraTitleStyle={{marginTop: 15}}
              />
              <CustomeInpute
                placeholderText="12345"
                title="ZIP code"
                keyboardType={'number-pad'}
                value={bankZipCode}
                onchangeText={(text: string) => setBankZipCode(text)}
                maxLength={5}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.bankZipCode === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}

              <CustomeInpute
                placeholderText="City"
                title="City"
                keyboardType={'default'}
                value={bankCity}
                onchangeText={(text: string) => setBankCity(text)}
                maxLength={50}
                extraTitleStyle={{marginTop: 15}}
              />
              {isValid.bankCity === false && (
                <Text style={styles.errorTxt}>Invalid</Text>
              )}
              <View style={{marginTop: 20}}>
                <SelectScroll
                  style={isDark === true ? dummy : pickerSelectStyles}
                  name="State"
                  options={State_array}
                  label="State"
                  selectedItem={bankState}
                  setSelectedItem={(data: any) => setBankState(data)}
                  placeholder="Select State"
                />

                {isValid.bankState === false && (
                  <Text style={styles.errorTxt}>Invalid</Text>
                )}
              </View>
              <View style={{marginTop: 20}}>
                <SelectScroll
                  style={isDark === true ? dummy : pickerSelectStyles}
                  name="country"
                  options={COUNTRY_US}
                  label="Country"
                  selectedItem={bankCountry}
                  setSelectedItem={(data: any) => {
                    setBankCountry(data);
                  }}
                  placeholder="Select Country"
                />
                {isValid.bankCountry === false && (
                  <Text style={styles.errorTxt}>Invalid</Text>
                )}
              </View>
            </>
          )}
        </ScrollView>

        <View
          style={{
            // flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={[
              styles.customeButtonView,
              {backgroundColor: colors.ground},
            ]}>
            <View style={{flex: 1}}>
              <CustomButton
                label="Back"
                onPress={handleBack}
                isDarkButton={true}
                customButtonStyle={[
                  styles.button,
                  styles.buttonextraStyle,
                  {
                    backgroundColor: colors.box,
                  },
                ]}
                labelStyle={[styles.buttonText, {color: colors.text}]}
              />
            </View>
            <View style={{flex: 1}}>
              <CustomButton
                label={stage === 1 ? 'Next' : 'Submit'}
                onPress={validate}
                customButtonStyle={[
                  styles.button,
                  {marginLeft: 7, padding: 5, borderRadius: 8},
                ]}
                labelStyle={styles.buttonText}
                disabled={loading}
                isLoading={loading}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default WireWithdraw;
