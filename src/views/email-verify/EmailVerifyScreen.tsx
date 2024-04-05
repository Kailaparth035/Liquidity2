// @flow
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {ProfileDataState, useKeyChain} from '../../states';
import {Verify_Email_Image} from '../../assets/images';
import {useNetwork} from '../../hooks';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {APIS, Storages} from '../../constants';
import {Header} from '../../components';
import {toast} from '../../libs';
import {deleteModalStyle} from '../../views/profile/components/bank-accounts/components/DeleteModal.style';

const EmailVerifyScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const {colors} = useTheme();
  const profileData = useRecoilValue(ProfileDataState);
  const {getItem: getToken} = useAsyncStorage(Storages.Token);
  const {post, loading} = useNetwork();
  const {patch} = useNetwork();
  const [isLoading, setIsloading] = useState(false);
  const [isValid, setIsValid] = useState<any>({
    Email: null,
  });
  const {getProfileData} = useKeyChain();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const verifyEmail = async () => {
    if (profileData?.email) {
      const token = await getToken();
      if (token) {
        post(APIS.EmailVerification, {}).then(res => {
          toast(res.message);
        });
      }
    } else {
      setShow(true);
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  const handleEmail = (val: string) => {
    setEmail(val);
    setIsValid(true);
  };
  const handleProceed = useCallback(() => {
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailValidation.test(email)) {
      setIsloading(true);
      const payload = {
        firstName: profileData?.firstName
          ? profileData?.firstName.trim()
          : null,
        lastName: profileData?.lastName ? profileData?.lastName.trim() : null,
        email: email.toLocaleLowerCase(),
      };
      console.log(payload);
      patch(`${APIS.Users}/${profileData?.id ?? ''}`, payload).then(resp => {
        setIsloading(false);
        console.log('Success');
        getProfileData();
        toast(resp?.message ?? "Email changed successfully");
        setEmail('');
        setShow(false);
      });
    } else {
      setIsValid(false);
    }
  }, [profileData?.id, patch, email]);

  return (
    <>
      <Header title=" " goBack={goBack} />

      {/* <EmailModel
        showModel={show}
        setShowModel={setShow}
        handleProceed={handleProceed}
        loading={isLoading}
        isValid={isValid}
      /> */}
      <Modal
        visible={show}
        transparent
        style={{backgroundColor: 'rgba(255,0,0,0.3)'}}>
        <View
          style={[
            deleteModalStyle.container,
            {backgroundColor: 'rgba(45, 45, 46,0.3)'},
          ]}>
          <View
            style={[
              deleteModalStyle.body,
              {backgroundColor: colors.background},
            ]}>
            <Text style={[deleteModalStyle.deleteLabel, {color: colors.text}]}>
              Enter your Email
            </Text>
            <View
              style={{
                borderWidth: 1,
                margin: 20,
                borderRadius: 8,
                padding: 10,
                borderColor: isValid ? colors.box : 'red',
              }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <TextInput
                  value={email}
                  onChangeText={text => handleEmail(text)}
                  placeholder={'Enter email'}
                  placeholderTextColor={colors.text}
                  style={{color: colors.text}}
                  keyboardType={'email-address'}
                />
              )}
            </View>
            <View style={[deleteModalStyle.footer, {borderColor: colors.box}]}>
              <TouchableOpacity
                style={deleteModalStyle.cancelBtn}
                onPress={() => {
                  handleProceed();
                }}>
                <Text style={deleteModalStyle.cancelTxt}>Submit</Text>
              </TouchableOpacity>
              <View
                style={[deleteModalStyle.footerLine, {borderColor: colors.box}]}
              />
              <TouchableOpacity
                style={deleteModalStyle.deleteBtn}
                onPress={() => {
                  setShow(false);
                  setEmail('');
                }}>
                <Text style={deleteModalStyle.deleteTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={[
          styles.parent,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Image
          source={Verify_Email_Image}
          style={{height: 120, width: 120, marginBottom: 16}}
        />
        <Text style={[styles.header_text, {color: colors.text}]}>
          Verification email sent
        </Text>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={[styles.para_text, {color: '#878899'}]}>
            We have sent you an email to{' '}
            <Text style={[{color: colors.text}]}>
              {profileData?.email ?? 'your email address'}
            </Text>
            . Kindly click on the link provided in the email and complete the
            verification process from there.
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Didn’t received the email ? </Text>
          {loading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <TouchableOpacity onPress={verifyEmail}>
              <Text style={[{color: '#F5BA45'}]}>
                {!profileData?.email ? 'Edit email' : 'Resend'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 51,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'center',
    paddingBottom: 4,
  },
  para_text: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 26,
    color: '#8D9099',
    textAlignVertical: 'center',
  },
  footerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginTop: 24,
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
export default EmailVerifyScreen;
