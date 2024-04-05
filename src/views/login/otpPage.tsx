import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {
  AccessTokenState,
  countryCodeState,
  IsLinkedDeviceState,
  IsOtpState,
  IsUserLoginState,
  loginNumberState,
  OtpCodeState,
} from '../../states';
import {useNetwork} from '../../hooks';
import {otpStyles as styles} from './otp.styles';
import {APIS, Storages} from '../../constants';
import {COLORS} from '../../assets';
import {Loader} from '../../storybook/loader';
import {NameLogo} from '../../assets/images';
import {Routes} from '../routes/constants';
import {useTrackEvents} from '../../helpers';
import {
  EDIT,
  ENTER_OTP,
  OTP_NOT_RECEIVED,
  RESEND,
  SENT_OTP_TO,
  VERIFY,
} from './constants';
import {toast} from '../../libs';

interface IError {
  message: string;
  success: boolean;
}

const OtpPage = ({navigation}: any) => {
  const [otpCode, setOtpCode] = useRecoilState(OtpCodeState);
  const [otpCodeValue, setOtpCodeValue] = useState('');
  const [loginNumber, setLoginNumber] = useRecoilState(loginNumberState);
  const selectedCountry = useRecoilValue(countryCodeState);
  const setIsUserLogin = useSetRecoilState(IsUserLoginState);
  const setIsOtp = useSetRecoilState(IsOtpState);
  const {setItem: setMobileNumber} = useAsyncStorage(Storages.MobileNumber);
  const setToken = useSetRecoilState(AccessTokenState);
  const {setItem: setAccessToken} = useAsyncStorage(Storages.Token);
  const [otpLoading, setOtpLoading] = useState(false);
  const [errorOtp, setErrorOtp] = useState<IError>();
  const {colors} = useTheme();
  const {post: postOtp} = useNetwork();
  const {trackEvents} = useTrackEvents();
  const [LinkDeviced, setLinkDeviced] = useRecoilState(IsLinkedDeviceState);
  const [timer, setTimer] = useState(30);
  const [loginLoading, setLoginLoading] = useState(false);
  const {post} = useNetwork();

  const otp = async()=>{
    setOtpLoading(true);
    try {
      let payload = {
        phone: loginNumber,
        otp: otpCodeValue,
        countryCode: selectedCountry,
        type: 'mobile',
      };
      trackEvents('verify-otp', payload);
      const otpVerified = await postOtp(APIS.VerifyPhones, payload);
      if (!otpVerified?.success && !otpVerified?.token ) {
        setOtpCodeValue('');
        setErrorOtp(otpVerified);
        setOtpLoading(false);
        toast(otpVerified?.message);
      }
      if (otpVerified?.success && otpVerified?.token) {
        setOtpCode(otpCodeValue)
        setAccessToken(otpVerified?.token);
        setToken(otpVerified.token);
        setMobileNumber(loginNumber);
        setIsUserLogin(true);
        setOtpCodeValue('');
        setLinkDeviced(true);
        setLoginNumber('');
        navigation.replace(Routes.Home);
      }
      setOtpCodeValue('');
      setIsOtp(false);
      setOtpLoading(false);
    } catch (error) {
      setOtpLoading(false);
      setIsOtp(false);
    }
  };

  useEffect(() => {
    if (otpCodeValue.length === 4) {
      otp();
    }
  }, [otpCodeValue.length]);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const reSendOtp = useCallback(async ({isLoginPage = false}) => {
    setLoginLoading(true);
    const payload = {
      phone: loginNumber,
      countryCode: selectedCountry,
    };
    trackEvents('login-number', payload);
    post(APIS.PhoneCodes, payload)
      .then(res => {
        if (res?.message) {
          toast('Otp send successfully');
          setTimer(30);
        } else {
          toast('Something went wrong');
        }
        setLoginLoading(false);
      })
      .catch(error => {
        setLoginLoading(false);
        toast(error);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  }, []);

  return (
    <ScrollView
      style={[styles.mainContainer, {backgroundColor: colors.ground}]}>
      {loginLoading && (
        <View style={styles.loaderView}>
          <Loader top={Dimensions.get('window').height / 6} size="small" />
        </View>
      )}
      <View style={styles.imageContainer}>
        <Image source={NameLogo} style={styles.logoSize} />
      </View>
      <View style={styles.contain}>
        <Text style={[styles.headingTxt, {color: colors.text}]}>
          {ENTER_OTP}
        </Text>
        <Text style={[styles.verificationTxt, {color: colors.text}]}>
          {SENT_OTP_TO}
        </Text>
        <View style={styles.editNumberView}>
          <Text style={[styles.edit, {color: colors.text}]}>
            {`${selectedCountry}${' '}${loginNumber}`}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsUserLogin(false),
                navigation.replace(Routes.Login),
                setIsOtp(false);
            }}>
            <Text style={[styles.editBtn, {color: colors.yellow}]}>{EDIT}</Text>
          </TouchableOpacity>
        </View>
        <OTPInputView
          style={styles.otp}
          pinCount={4}
          autoFocusOnLoad={false}
          selectionColor={colors.text}
          codeInputFieldStyle={[
            styles.underlineStyleBase,
            {color: colors.text},
            {
              borderColor:
                errorOtp?.success === false
                  ? COLORS['red']
                  : COLORS['input-border-dark'],
            },
          ]}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={setOtpCodeValue}
        />
        <TouchableOpacity
          style={otpCodeValue.length === 4 ? styles.btn : styles.disabledBtn}
          activeOpacity={0.7}
          onPress={()=>otp()}
          disabled={otpLoading || otpCodeValue.length < 4}>
          {!otpLoading ? (
            <Text
              style={otpCodeValue.length === 4 ? styles.txt : styles.disabledTxt}>
              {VERIFY}
            </Text>
          ) : (
            <Loader
              top={0}
              animating={otpLoading}
              size={20}
              color={colors.text}
            />
          )}
        </TouchableOpacity>
        <View style={styles.otpNotReceiveView}>
          <Text style={[styles.resend, {color: colors.text}]}>
            {OTP_NOT_RECEIVED}
          </Text>
          <TouchableOpacity
            onPress={() => reSendOtp({isLoginPage: true})}
            disabled={timer === 0 ? false : true}>
            <Text
              style={[
                styles.editBtn,
                {color: colors.yellow, opacity: timer === 0 ? 1 : 0.5},
              ]}>
              {RESEND}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.resend, {color: colors.text}]}>
            {' '}
            ({'00:' + timer + 's'})
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default OtpPage;
