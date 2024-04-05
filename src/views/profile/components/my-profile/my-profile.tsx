import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Header} from '../../../../components';
import {
  AppleUserDataState,
  isDarkModeState,
  ProfileDataState,
  useKeyChain,
  ProfilePcitureState,
  KycProfileDataState,
} from '../../../../states';
import {profileDetailStyles as styles} from '../profile-details/profile-details.styles';
import {APIS, NOT_AVAILABLE, NO_DATA} from '../../../../constants';
import {SVG} from '../../../../storybook/svg';
import {Svg_User_Avatar} from '../../../../assets/icon/svg/user-avatar';
import {Svg_User_Avatar_Light} from '../../../../assets/icon/svg/user-avatar-light';
import {TextInput} from 'react-native-gesture-handler';
import {deleteModalStyle} from '../../../../views/profile/components/bank-accounts/components/DeleteModal.style';
import {toast} from '../../../../libs';
import {COLORS} from '../../../../assets/theme';
import ImagePicker from 'react-native-image-crop-picker';
import {useInterval, useNetwork} from '../../../../hooks';
import {verified} from '../../../../assets/images';
import {myProfileStyles} from './my-profile.styles';
import { Routes } from '../../../../views/routes/constants';
import {selectedAuthUserState} from '../co-owners/states';

export const MyProfile = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const {patch} = useNetwork();
  const [isLoading, setIsloading] = useState(false);
  const [isValid, setIsValid] = useState<any>({
    Email: null,
  });
  const {getProfileData} = useKeyChain();
  const profileData = useRecoilValue(ProfileDataState);
  const kycprofileData = useRecoilValue(KycProfileDataState);
  const appleUserData = useRecoilValue(AppleUserDataState);
  const [selectImageModal, setSelectImageModal] = useState(false);
  const [profileImage, setProfileImage] = useRecoilState(ProfilePcitureState);
  const {data} = appleUserData[0] ?? {};
  const {colors} = useTheme();
  const {
    countryCode,
    email,
    phone,
    firstName,
    lastName,
    isVerifiedEmail,
    onboardingData,
    customerId,
  } = profileData ?? {};
  const [newemail, setNewEmail] = useState(email);
  const {accreditationStatus,amlStatus,fullAddress, kycStatus,kybStatus} =
    onboardingData ?? {};
  const [selectedAccount, setSelectedAccount] = useRecoilState(
    selectedAuthUserState,
  );

  const LoggedinAccount = useMemo(() => selectedAccount, []);

  const isDarkMode = useRecoilValue(isDarkModeState);
  const {
    post,
    data: imageUploaded,
    loading: loadingProfilePicture,
  } = useNetwork();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEmail = (val: string) => {
    setNewEmail(val);
    setIsValid(true);
  };
  const handleProceed = useCallback(() => {
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (emailValidation.test(newemail)) {
      setIsloading(true);
      const payload = {
        firstName: profileData?.firstName
          ? profileData?.firstName.trim()
          : null,
        lastName: profileData?.lastName ? profileData?.lastName.trim() : null,
        email: newemail.toLocaleLowerCase(),
      };
      patch(`${APIS.Users}/${profileData?.id ?? ''}`, payload)
        .then(resp => {
          setIsloading(false);
          setNewEmail('');
          setShow(false);
          getProfileData();
          toast(resp?.message ?? '');
        })
        .catch(err => {
          toast(err);
        });
    } else {
      setIsValid(false);
    }
  }, [profileData?.id, patch, newemail]);
  const uploadProfilePicture = useCallback((image, type) => {
    if (image && type) {
      let payload = {
        type,
        image,
      };
      post(APIS.profilePicture, payload);
    }
  }, []);

  useEffect(() => {
    if (imageUploaded) {
      setProfileImage(imageUploaded);
    }
  }, [imageUploaded]);

  const convertImageToBase64 = (imageUrl: string, imageType: string) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();

        reader.onload = () => {
          const base64Image = reader?.result ?? ''; // Extract the Base64 data
          uploadProfilePicture(base64Image, imageType);
        };

        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error converting image to Base64:', error);
      });
  };

  const selectFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setSelectImageModal(false);
      let imageType = image.mime.split('/')[1];
      convertImageToBase64(image.path, imageType);
    });
  };

  const selectFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let imageType = image.mime.split('/')[1];
      setSelectImageModal(false);
      convertImageToBase64(image.path, imageType);
    });
  };

  const dataValue = true;

  const handleVerify = () => {
    navigation.navigate(Routes.KycPage, {dataValue});
  };

  const camaleCasheConverter = (text: string) => {
    const formattedData =
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    return formattedData;
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
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
              style={[
                myProfileStyles.emailEditModal,
                {borderColor: isValid ? colors.box : 'red'},
              ]}>
              {isLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <TextInput
                  value={newemail}
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
                  setIsValid(true);
                }}>
                <Text style={deleteModalStyle.deleteTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Header title="My Profile" goBack={goBack} />
      <View style={{flex: 1, marginTop: 30}}>
        <View>
          <View style={styles.container}>
            <View
              style={[styles.contain, {backgroundColor: colors.background}]}>
              {loadingProfilePicture ? (
                <ActivityIndicator />
              ) : profileImage ? (
                <Image source={{uri: profileImage}} style={styles.image} />
              ) : (
                <SVG
                  name={
                    isDarkMode === true
                      ? Svg_User_Avatar
                      : Svg_User_Avatar_Light
                  }
                  width={100}
                  height={100}
                />
              )}
            </View>
            {/* Need to implement for editing profile picture  */}

            <TouchableOpacity
              onPress={() => setSelectImageModal(true)}
              style={styles.edit}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../../../assets/images/Editimage.png')}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS['bg-100-light'],
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.nameContain}>
            {firstName ? (
              <View>
                <Text style={[styles.fullName, {color: colors.text}]}>
                  {firstName + ' ' + lastName}
                </Text>
              </View>
            ) : (
              <Text style={[styles.fullName, {color: colors.text}]}>
                {NOT_AVAILABLE}
              </Text>
            )}
            {customerId ? (
              <Text style={styles.AccountID}>Account ID: {customerId}</Text>
            ) : null}

            {!email && (
              <Text style={[styles.email, {color: colors.text}]}>{email}</Text>
            )}
          </View>
        </View>

        <View style={[styles.valueContainer, {borderTopWidth: 0}]}>
          <Text style={[styles.key, {color: colors.text, marginRight: -10}]}>
            Email
          </Text>
          {isVerifiedEmail && (
            <Image source={verified} style={styles.verifiedImage} />
          )}

          {email !== null ? (
            <Text
              style={[
                styles.value,
                {
                  color: colors.text,
                  textAlign: 'right',
                  marginLeft: -10,
                },
              ]}>
              {email}
            </Text>
          ) : (
            <Text style={[styles.value, {color: colors.text}]}>
              {NOT_AVAILABLE}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              setShow(true);
              setNewEmail(email);
            }}
            style={[styles.editEmailButton, {borderBottomColor: colors.text}]}>
            <Text style={[{color: colors.primary}]}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.valueContainer,{borderTopColor:colors.border}]}>
          <Text style={[styles.key, {color: colors.text}]}>Phone</Text>
          <Text
            style={[
              styles.value,
              {color: colors.text},
            ]}>{`(${countryCode}) ${phone}`}</Text>
        </View>
        <View style={[styles.valueContainer,{borderTopColor: colors.border}]}>
          <Text style={[styles.key, {color: colors.text,marginRight:-15}]}>KYC</Text>
          {kycStatus == 'completed' && (
            <Image source={verified} style={styles.verifiedImage} />
          )}
          <Text style={[styles.value, {color: colors.text}]}>
            {camaleCasheConverter(kycStatus)}
          </Text>
          {kycStatus == 'completed' ? null : (
            <TouchableOpacity
              onPress={() => {
                handleVerify();
              }}
              style={[styles.verifyButton, {borderBottomColor: colors.text}]}>
              <Text style={[{color: colors.primary}]}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>
        {kybStatus ? (
          <View style={[styles.valueContainer,{borderTopColor: colors.border}]}>
            <Text style={[styles.key, {color: colors.text}]}>KYB</Text>

            <Text style={[styles.value, {color: colors.text}]}>
              {camaleCasheConverter(kybStatus)}
            </Text>
            {kybStatus == 'completed' ? null : (
              <TouchableOpacity
                onPress={() => {
                  handleVerify();
                }}
                style={[styles.verifyButton, {borderBottomColor: colors.text}]}>
                <Text style={[{color: colors.primary}]}>Verify</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
        <View style={[styles.valueContainer,{borderTopColor: colors.border}]}>
          <Text style={[styles.key, {color: colors.text,marginRight:-15}]}>AML</Text>
          {amlStatus == 'completed' && (
            <Image source={verified} style={styles.verifiedImage} />
          )}
          <Text style={[styles.value, {color: colors.text}]}>
            {camaleCasheConverter(amlStatus)}
          </Text>
          {amlStatus == 'completed' ? null : (
            <TouchableOpacity
              onPress={() => {
                handleVerify();
              }}
              style={[styles.verifyButton, {borderBottomColor: colors.text}]}>
              <Text style={[{color: colors.primary}]}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.valueContainer, {borderTopColor: colors.border}]}>
          <Text style={[styles.key, {color: colors.text}]}>Accreditation</Text>
          <Text style={[styles.value, {color: colors.text}]}>
            {camaleCasheConverter(accreditationStatus)}
          </Text>
          {accreditationStatus == 'completed' ? null : (
            <TouchableOpacity
              onPress={() => {
                handleVerify();
              }}
              style={[styles.verifyButton, {borderBottomColor: colors.text}]}>
              <Text style={[{color: colors.primary}]}>Verify</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.valueContainer, {borderTopColor: colors.border}]}>
          <Text style={[styles.key, {color: colors.text}]}>Address</Text>
          {
            <Text style={[styles.value, {color: colors.text}]}>
              {fullAddress == ''
                  ? '--'
                  : fullAddress}
            </Text>
          }
        </View>
      </View>
      <Modal
        visible={selectImageModal}
        transparent={true}
        onRequestClose={() => setSelectImageModal(false)}>
        <TouchableWithoutFeedback onPress={() => setSelectImageModal(false)}>
          <View style={myProfileStyles.profileUploadModal}>
            <View style={myProfileStyles.profileUploadModalMainView}>
              <TouchableOpacity
                onPress={() => selectFromCamera()}
                style={myProfileStyles.takePhotoButton}>
                <Image
                  source={require('../../../../assets/images/Camera.png')}
                  style={myProfileStyles.cameraIcon}
                />

                <Text style={myProfileStyles.takePhotoText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={myProfileStyles.takePhotoButton}
                onPress={() => selectFromGallery()}>
                <Image
                  source={require('../../../../assets/images/Gallery.png')}
                  style={myProfileStyles.cameraIcon}
                />
                <Text style={myProfileStyles.chooseImageText}>
                  Choose Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
