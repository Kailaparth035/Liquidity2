import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {View, Text, ScrollView, Modal, ActivityIndicator} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  AccessTokenState,
  IsLinkedDeviceState,
  IsOtpState,
  IsUserLoginState,
  OtpCodeState,
  countryCodeState,
  loginNumberState,
} from '../../states';
import MethodButton from './components/methodButton';
import CustomButton from '../../views/wallet-details/components/CustomButton';
import {Routes} from '../../views/routes/constants';
import {useNetwork} from '../../hooks';
import OtpPage from '../../views/login/otpPage';
import {toast} from '../../libs';
import {Loader} from '../../storybook';
import {APIS, Storages} from '../../constants';
import {MobileVerify, OtpVerify} from '../../assets/images';
import {COLORS} from '../../assets';
import {useTrackEvents} from '../../helpers';
import {webAuthenticationStyles} from './web-authentication.style';

const WebAuthentication = ({navigation}: any) => {
  const {colors} = useTheme();
  const {post, get} = useNetwork();
  const [isApproved, setIsApproved] = useState(false);
  const loginNumber = useRecoilValue(loginNumberState);
  const selectedCountry = useRecoilValue(countryCodeState);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const setIsUserLogin = useSetRecoilState(IsUserLoginState);
  const {setItem: setMobileNumber} = useAsyncStorage(Storages.MobileNumber);
  const setToken = useSetRecoilState(AccessTokenState);
  const {setItem: setAccessToken} = useAsyncStorage(Storages.Token);
  const [LinkDeviced, setLinkDeviced] = useRecoilState(IsLinkedDeviceState);
  const [isOtp, setIsOtp] = useRecoilState(IsOtpState);
  const [otpCode, setOtpCode] = useRecoilState(OtpCodeState);
  const [loadingforOtp, setLoadingforOtp] = useState(false);
  const {trackEvents} = useTrackEvents();

  useEffect(() => {
    let intervalId: any;

    const yourFunction = async () => {
      if (verificationId && !isApproved) {
        try {
          const approvalResponse = await get(
            APIS.userLogin + '/' + verificationId,
          );
          if (approvalResponse?.data?.status === 'rejected') {
            toast('Mobile Request Rejected');
            setVerificationId('');
            setOpenLoadingModal(false);
          }
          if (approvalResponse?.data?.status === 'approved') {
            clearInterval(intervalId);
            const payload = {
              type: 'getTokenWithCode',
              verificationId: verificationId,
            };
            post(APIS.userLogin, payload)
              .then(res => {
                if (res && res?.token) {
                  clearInterval(intervalId);
                  setOpenLoadingModal(false);
                  setAccessToken(res?.token);
                  setToken(res?.token);
                  setMobileNumber(loginNumber);
                  setIsUserLogin(true);
                  setVerificationId('');
                  setLinkDeviced(true);
                  navigation.replace(Routes.Home);
                } else {
                  toast('Something went wrong');
                  setVerificationId('');
                  setOpenLoadingModal(false);
                }
              })
              .catch(error => {
                toast(error);
              });
          }
        } catch (error: any) {
          toast(error);
        }
      }
    };
    if (verificationId && !isApproved) {
      intervalId = setInterval(yourFunction, 3000);
    }

    return () => clearInterval(intervalId);
  }, [verificationId, isApproved]);
  const approvalFromMobile = async () => {
    setOpenLoadingModal(true);

    const payload = {
      type: 'phone',
      phone: loginNumber,
      countryCode: selectedCountry,
    };
    post(APIS.userLogin, payload)
      .then(res => {
        if (res?.message === 'SMS Sent') {
          setVerificationId(res?.verificationId);
        } else {
          toast('Something went wrong');
        }
      })
      .catch(error => {
        toast(error);
      });
  };

  const getOtpWithPhone = async () => {
    setLoadingforOtp(true);
    const payload = {
      phone: loginNumber,
      countryCode: selectedCountry,
    };
    trackEvents('login-number', payload);
    post(APIS.PhoneCodes, payload)
      .then(res => {
        if (res?.message) {
          setLoadingforOtp(false);
          setIsOtp(true), setOtpCode('');
        } else {
          toast('Something went wrong');
        }
      })
      .catch(error => {
        toast(error);
      })
      .finally(() => {
        setLoadingforOtp(false);
      });
  };
  return (
    <>
      {!isOtp ? (
        <View style={webAuthenticationStyles.mainView}>
          {loadingforOtp && (
            <View style={webAuthenticationStyles.loaderView}>
              <Loader
                top={10}
                animating={loadingforOtp}
                size={20}
                color={colors.text}
              />
            </View>
          )}
          <Text
            style={[webAuthenticationStyles.headerText, {color: colors.text}]}>
            Choose Method
          </Text>
          <Text
            style={[
              webAuthenticationStyles.descriptionText,
              {
                color: colors.text,
              },
            ]}>
            Select the method through which you want sign in
          </Text>
          <Text
            style={[
              webAuthenticationStyles.descriptionText,
              {
                color: colors.text,
                fontSize: 16,
              },
            ]}>
            We will send you a confirmation code: {'\n'}
            {selectedCountry + ' ' + loginNumber}{' '}
            <Text
              style={[
                webAuthenticationStyles.descriptionText,
                webAuthenticationStyles.numberEditText,
                {color: colors.text},
              ]}
              onPress={() => navigation.replace(Routes.Login)}>
              Edit
            </Text>
          </Text>
          <ScrollView style={{marginTop: 10}}>
            <MethodButton
              icon={MobileVerify}
              title={'Approval from mobile link'}
              onPress={() => approvalFromMobile()}
            />
            {/* webauthentication flow some blocker so now comment this button */}
            {/* <MethodButton
              icon={DeviceBiometric}
              title={'Device Biometric'}
              onPress={() => {}}
            /> */}
            <MethodButton
              icon={OtpVerify}
              title={'Mobile Text: One-time password'}
              onPress={() => {
                getOtpWithPhone();
              }}
            />
          </ScrollView>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <CustomButton
              label="Back"
              onPress={() => navigation.replace(Routes.Login)}
              isDarkButton={true}
              customButtonStyle={[
                webAuthenticationStyles.button,
                webAuthenticationStyles.buttonextraStyle,
                {
                  backgroundColor: colors.box,
                },
              ]}
              labelStyle={[
                webAuthenticationStyles.buttonText,
                {color: colors.text},
              ]}
            />
          </View>
          <Modal
            visible={openLoadingModal}
            transparent={true}
            onRequestClose={() => {
              setOpenLoadingModal(false), setIsApproved(false);
            }}>
            <View
              style={[
                webAuthenticationStyles.modalMainView,
                {backgroundColor: colors.background},
              ]}>
              <View style={webAuthenticationStyles.modalBackground} />
              <View
                style={[
                  webAuthenticationStyles.modalView,
                  {
                    backgroundColor: colors.box,
                  },
                ]}>
                <Text
                  style={[
                    webAuthenticationStyles.headerText,
                    {color: colors.text, fontSize: 20, marginTop: 0},
                  ]}>
                  Waiting for approval
                </Text>
                <Text
                  style={[
                    webAuthenticationStyles.headerText,
                    {color: colors.text, fontSize: 15, marginTop: 10},
                  ]}>
                  We have sent you a text message to{' '}
                  {selectedCountry + ' ' + loginNumber} Open the link provided
                  in the text message and approve from there
                </Text>
                <View style={webAuthenticationStyles.activityView}>
                  <ActivityIndicator size={50} />
                </View>
                <View style={webAuthenticationStyles.cancelButtonView}>
                  <CustomButton
                    label="Cancel"
                    onPress={() => {
                      setOpenLoadingModal(false),
                        setVerificationId(''),
                        setIsApproved(false);
                    }}
                    isDarkButton={true}
                    customButtonStyle={[
                      webAuthenticationStyles.buttonModal,
                      webAuthenticationStyles.buttonextraStyle,
                      {
                        backgroundColor: COLORS['color-transparent-green'],
                      },
                    ]}
                    labelStyle={[
                      webAuthenticationStyles.buttonText,
                      {color: colors.text},
                    ]}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <OtpPage
          sendOtp={() => setIsOtp(false)}
          navigation={navigation}
          type={'login'}
        />
      )}
    </>
  );
};

export default WebAuthentication;
