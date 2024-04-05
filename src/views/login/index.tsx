import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useSetRecoilState} from 'recoil';

import {
  countryCodeState,
  isDarkModeState,
  IsOtpState,
  IsUserLoginState,
  loginNumberState,
} from '../../states';
import OtpPage from './otpPage';
import {useNetwork} from '../../hooks';
import {
  loginStyles,
  loginStyles as styles,
  pickerSelectStylesNew as dummy,
} from './login.styles';
import {NameLogo} from '../../assets/images';
import {APIS} from '../../constants';
import {SelectScroll} from '../../storybook/selectScroll';
import {Loader} from '../../storybook/loader';
import {ASK_MOBILE, ASK_MOBILE2, NEXT, WILL_SEND_CODE} from './constants';
import {COUNTRIES} from './constants/countries';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Routes} from '../routes/constants';
import {useTrackEvents} from '../../helpers';
import {pickerSelectStyles} from '../../storybook/selectScroll/pickerSelect.style';
import {toast} from '../../libs';

const Login = ({navigation}: any) => {
  const [isOtp, setIsOtp] = useRecoilState(IsOtpState);
  const [loginNumber, setLoginNumber] = useRecoilState(loginNumberState);
  const [loginLoading, setLoginLoading] = useState(false);
  const {colors} = useTheme();
  const [selectedCountry, setSelectedCountry] =
    useRecoilState(countryCodeState);
  const [isDark, setIsDark] = useRecoilState(isDarkModeState);

  const {post} = useNetwork();
  const {trackEvents} = useTrackEvents();

  const onLoginBtn = useCallback(
    async ({isLoginPage = false}) => {
      setLoginLoading(true);

      const payload = {
        phone: loginNumber,
        countryCode: selectedCountry,
      };
      trackEvents('login-number', payload);
      post(APIS.verifyPhone, payload)
        .then(isNumberRes => {
          if (isNumberRes?.isRegisteredUser) {
            navigation.replace(Routes.WebAuthentication);
          } else {
            post(APIS.PhoneCodes, payload)
              .then(res => {
                if (res?.message && isLoginPage) {
                  setIsOtp(!isOtp);
                } else {
                  toast('Something went wrong');
                }
              })
              .catch(error => {
                toast(error);
              })
              .finally(() => {
                setLoginLoading(false);
              });
          }
        })
        .catch(error => {
          toast(error);
        })
        .finally(() => {
          setLoginLoading(false);
        });
    },
    [loginNumber, post, selectedCountry],
  );

  const onChanged = useCallback(text => {
    setLoginNumber(text.replace(/[^0-9]/g, ''));
  }, []);

  const handleCountry = useCallback((countryCode: string) => {
    setSelectedCountry(countryCode);
  }, []);

  const isDisabled = useMemo(() => {
    return loginNumber.length <= 6 || selectedCountry.length < 1;
  }, [loginNumber, selectedCountry]);

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: colors.ground}}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={64}
      accessible={false}>
      <View style={styles.mainView}>
        {!isOtp ? (
          <>
            <View style={styles.logoContainer}>
              <Image source={NameLogo} style={styles.logoSize} />
            </View>
            <View style={styles.contain}>
              <Text style={[styles.mobileTxt, {color: colors.text}]}>
                {ASK_MOBILE}
              </Text>
              <Text style={[styles.mobileTxt, {color: colors.text}]}>
                {ASK_MOBILE2}
              </Text>
              <Text style={[styles.verificationTxt, {color: colors.text}]}>
                {WILL_SEND_CODE}
              </Text>
              <View style={[styles.head, {borderColor: colors.inputlogin}]}>
                <View
                  style={[
                    styles.countrySelect,
                    {borderRightColor: colors.inputlogin},
                  ]}>
                  <SelectScroll
                    style={isDark === true ? dummy : pickerSelectStyles}
                    name="country"
                    options={COUNTRIES}
                    label="Country"
                    selectedItem={selectedCountry}
                    setSelectedItem={(data: any) => handleCountry(data)}
                    placeholder="Select Country"
                  />
                </View>
                <Text style={[styles.countryCode, {color: colors.text}]}>
                  {selectedCountry}
                </Text>
                <TextInput
                  style={[
                    styles.loginInput,
                    {
                      color: colors.text,
                      marginLeft: selectedCountry.length > 3 ? 135 : 120,
                    },
                  ]}
                  placeholder="XXXXXXXXXX"
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={(text: string) => onChanged(text)}
                  placeholderTextColor={colors.text}
                  value={loginNumber}
                />
              </View>
            </View>

            <TouchableOpacity
              style={isDisabled ? loginStyles.disabledBtn : loginStyles.btn}
              disabled={isDisabled}
              onPress={() => onLoginBtn({isLoginPage: true})}
              activeOpacity={0.7}>
              {loginLoading ? (
                <Loader
                  animating={loginLoading}
                  size={20}
                  top={0}
                  color={colors.text}
                />
              ) : (
                <Text style={styles.txt}>{NEXT}</Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <OtpPage navigation={navigation} />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
