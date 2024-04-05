import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import appleAuth from '@invertase/react-native-apple-authentication';
import {useIsFocused, useTheme} from '@react-navigation/native';

import {
  isDarkModeState,
  ProfileDataState,
  ProfilePcitureState,
  SelectedLanguageState,
  useKeyChain,
} from '../../../../states';
import {Loader} from '../../../../storybook/loader';
import {SVG} from '../../../../storybook/svg';
import {FlatListScroll} from '../../../../storybook/flatlist';
import {COLORS} from '../../../../assets';
import {APIS, NOT_AVAILABLE} from '../../../../constants';
import {Svg_User_Avatar} from '../../../../assets/icon/svg/user-avatar';
import {IsLogoutState} from '../../../../states/logout/states';
import {useNetwork, usePlatform} from '../../../../hooks';
import {toast} from '../../../../libs';
import {useTrackEvents} from '../../../../helpers';
import {Routes} from '../../../routes/constants';
import {ProfileConstants} from '../../constants';
import {Svg_User_Avatar_Light} from '../../../../assets/icon/svg/user-avatar-light';
import VerifyEmail from '../../../../views/watchlist/components/VerifyEmail';
import {
  FellowOwnersState,
  isOtherAccountState,
  selectedAuthUserState,
} from '../co-owners/states';
import {profileDetailStyles as styles} from './profile-details.styles';
import {useFetchOweners} from '../../../../views/profile/hooks';

export const ProfileDetails = ({navigation}: any) => {
  const [profileData, setProfileData] = useRecoilState(ProfileDataState);
  const isOtherAccount = useRecoilValue(isOtherAccountState);
  const setIsModalOpen = useSetRecoilState(IsLogoutState);
  const language = useRecoilValue(SelectedLanguageState);
  const [profilePicture, setProfilePicture] =
    useRecoilState(ProfilePcitureState);
  const fellowOwners = useRecoilValue(FellowOwnersState);
  const [selectedAccount, setSelectedAccount] = useRecoilState(
    selectedAuthUserState,
  );
  const LoggedinAccount = useMemo(() => selectedAccount, []);

  const {
    countryCode,
    email,
    phone,
    userKycProviderData,
    lastName,
    firstName,
    profileImage,
    customerId,
  } = profileData ?? {};
  const {firstname, surname} = userKycProviderData ?? {};
  const {PROFILE_ACTIONS: ACTIONS} = ProfileConstants();

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const isDark = useRecoilValue(isDarkModeState);
  const {get, data: connections} = useNetwork();
  const {post} = useNetwork();
  const {trackEvents} = useTrackEvents();
  const {colors} = useTheme();
  const {isIOS} = usePlatform();
  const isFocus = useIsFocused();

  const {fetchOwners} = useFetchOweners();
  const {getProfileData, userLoading} = useKeyChain();

  useEffect(() => {
    const isSelected = fellowOwners.find((coOwner: any) => coOwner.isActive);
    if (isSelected) setSelectedAccount(isSelected);
    else {
      const myAccount = fellowOwners.find((owner: any) => owner.isPrimary);
      setSelectedAccount(myAccount);
    }
  }, [fellowOwners]);

  useEffect(() => {
    get(APIS.Connections);
    getProfileData();
  }, []);

  useEffect(() => {
    fetchOwners();
    if (connections?.data) {
      setIsLoader(false);
    }
  }, [connections?.data]);

  useEffect(() => {
    setProfilePicture(profileImage);
  }, [profileImage, isFocus]);

  const reloadProfile = () => {
    get(APIS.Users)
      .then(userData => {
        if (userData?.data) {
          setProfileData(userData.data);
        }
      })
      .catch(err => {});
  };

  const onAppleConnect = async () => {
    const appleAuthResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    setIsLoader(true);
    if (Object.keys(appleAuthResponse)?.length > 0) {
      await post(APIS.Connections, {data: appleAuthResponse, provider: 'IOS'});
      await get(APIS.Connections);
      toast('Your Apple account is connected with Satschel');
    }
  };

  const handleAction = useCallback(({route, track, title}: any) => {
    trackEvents(track, {navigate: track});

    if (route) {
      if (route === Routes.Transactions) {
        navigation.navigate(route, {isBackButton: true});
        return;
      }
      navigation.navigate(route);
      return;
    }
    switch (title) {
      case language?.profile?.topNav?.logout ?? 'Logout':
        setIsModalOpen(true);
        break;
      case language?.profile?.topNav?.connect_with_apple_id ??
        'Connect with Apple Id':
        onAppleConnect();
        break;
      case 'Linked Devices':
        navigation.navigate(route, {isBackButton: true});
        break;
      default:
        break;
    }
  }, []);

  const isAppleDisabled = ({title}: any) =>
    isLoader && title === language?.profile?.topNav?.connect_with_apple_id;

  const isBtnDisable = ({title, disabled}: any) =>
    title === language?.profile?.topNav?.connect_with_apple_id ||
    (title === 'Connect with Apple Id' && connections?.data?.length > 0) ||
    disabled;

  const handleSelectUser = useCallback(() => {
    navigation.navigate(Routes.AuthUsers);
  }, [navigation]);

  return (
    <View
      style={[styles.containerHeight, {backgroundColor: colors.background}]}>
      {userLoading ? (
        <Loader size="large" top={40} />
      ) : (
        <View style={styles.mainContainer}>
          {profileData?.email && profileData?.isVerifiedEmail ? null : (
            <VerifyEmail />
          )}
          <FlatListScroll
            data={ACTIONS}
            style={styles.listContainer}
            hideRefresh={false}
            ListFooterComponent={
              isIOS ? null : <View style={{paddingBottom: 30}} />
            }
            renderItem={({item}) => {
              if (item.title === 'profileView') {
                return (
                  <View>
                    <View style={styles.container}>
                      <View style={styles.contain}>
                        {!profileImage ? (
                          <ActivityIndicator />
                        ) : profilePicture?.length > 0 ? (
                          <Image
                            source={{uri: profilePicture}}
                            style={styles.image}
                          />
                        ) : isDark === true ? (
                          <SVG
                            name={Svg_User_Avatar}
                            width={100}
                            height={100}
                          />
                        ) : (
                          <SVG
                            name={Svg_User_Avatar_Light}
                            width={100}
                            height={100}
                          />
                        )}
                      </View>
                    </View>
                    <View style={styles.nameContain}>
                      {firstname ? (
                        <Text style={[styles.fullName, {color: colors.text}]}>
                          {firstname + ' ' + surname}
                        </Text>
                      ) : firstName ? (
                        <Text style={[styles.fullName, {color: colors.text}]}>
                          {firstName + ' ' + lastName}
                        </Text>
                      ) : (
                        <Text style={[styles.fullName, {color: colors.text}]}>
                          {NOT_AVAILABLE}
                        </Text>
                      )}

                      {!!email && <Text style={styles.email}>{email}</Text>}
                      <Text
                        style={
                          styles.mobile
                        }>{`(${countryCode}) ${phone}`}</Text>
                      {customerId ? (
                        <Text style={styles.AccountID}>
                          Account ID: {customerId}
                        </Text>
                      ) : null}
                    </View>
                    {LoggedinAccount && (
                      <TouchableOpacity onPress={handleSelectUser}>
                        <View style={[styles.list, styles.selectedAsset]}>
                          <View style={styles.userDetailsContainer}>
                            <View>
                              <Image
                                source={{uri: LoggedinAccount?.profileImage}}
                                style={styles.profileImage}
                              />
                            </View>
                            <View style={styles.txtWrapper}>
                              <Text style={styles.txtName}>
                                {LoggedinAccount?.name}
                              </Text>
                              <Text style={styles.txtId}>
                                {'Account Id: ' + LoggedinAccount?.customerId ?? ''}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <FontIcon
                              name="angle-right"
                              color={
                                item.disabled
                                  ? COLORS['btn-disabled']
                                  : colors.text
                              }
                              size={20}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              } else if (!isOtherAccount) {
                return (
                  <TouchableOpacity
                    onPress={() => handleAction(item)}
                    disabled={isBtnDisable(item)}>
                    {isAppleDisabled(item) && (
                      <View style={{position: 'absolute', right: 100}}>
                        <Loader size={'small'} />
                      </View>
                    )}
                    <View
                      style={[styles.list, {borderBottomColor: colors.border}]}>
                      <View style={styles.titleContainer}>
                        <View style={[styles.icon]}>
                          {item.icon && (
                            <SVG
                              name={item.icon}
                              width={24}
                              height={24}
                              color={
                                isBtnDisable(item)
                                  ? COLORS['btn-disabled']
                                  : colors.text
                              }
                            />
                          )}
                        </View>
                        <View style={styles.title}>
                          <Text
                            style={[
                              styles.titleTxt,
                              {
                                color: isBtnDisable(item)
                                  ? COLORS['btn-disabled']
                                  : colors.text,
                              },
                            ]}>
                            {isBtnDisable(item)
                              ? language?.profile?.topNav?.connected_apple_id ??
                                'Connected Apple Id'
                              : item.title}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <FontIcon
                          name="angle-right"
                          color={
                            item.disabled ? COLORS['btn-disabled'] : colors.text
                          }
                          size={20}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            }}
            reload={reloadProfile}
            keyExtractor={(item, i) => `${item.title}__${i}`}
          />
        </View>
      )}
    </View>
  );
};
