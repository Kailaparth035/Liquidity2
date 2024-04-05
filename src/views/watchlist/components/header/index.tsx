import {useTheme} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {ExitApp, isDarkModeState, ProfileDataState} from '../../../../states';

import {
  Svg_Search,
  Svg_Edit,
  Svg_Notification,
  Svg_Auction_Gavel,
} from '../../../../assets';
import {useTrackEvents} from '../../../../helpers';
import {SVG} from '../../../../storybook/svg';
import {Routes} from '../../../routes/constants';
import {useLoginAuth} from '../../../routes/hooks/use-login-auth';
import {headerStyles as styles} from './header.styles';
import {Weather_Light} from '../../../../assets/icon/svg/weather-light';
import {Weather_dark} from '../../../../assets/icon/svg/weather-dark';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ENVIRONMENT, MODE} from '../../../../constants';

import VerifyEmail from '../VerifyEmail';
const MarketWatchHeader = ({navigation, title}: any) => {
  const {isLoggedIn} = useLoginAuth();
  const {trackEvents} = useTrackEvents();
  const {colors} = useTheme();
  const [darkMode, setDarkMode] = useRecoilState(isDarkModeState);
  const setExitApp = useSetRecoilState(ExitApp);
  const profileData = useRecoilValue(ProfileDataState);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setExitApp(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleSearch = useCallback(() => {
    setExitApp(false);
    trackEvents('watchlist-search', {});
    navigation.navigate(Routes.Search);
  }, [navigation]);

  const editWatchlist = useCallback(() => {
    navigation.navigate(Routes.EditWatchlist);
    trackEvents('watchlist-edit', {});
  }, [navigation]);

  const handleNotification = useCallback(() => {
    trackEvents('home-request', {});
    if (isLoggedIn) {
      navigation.navigate(Routes.Request);
    } else {
      navigation.navigate(Routes.Login);
    }
  }, [navigation, isLoggedIn]);

  const toggleSwitch = useCallback(async () => {
    setDarkMode((previousState: any) => !previousState);
    await AsyncStorage.setItem(MODE.DARK, JSON.stringify(!darkMode));
  }, [darkMode]);

  return (
    <>
      <View style={[styles.headerContainer, {backgroundColor: colors.ground}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: Platform.OS === 'android' ? 18 : 0,
          }}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        </View>
        <View style={styles.buttons}>
          {title !== 'Trade' && (
            <>
              <TouchableOpacity
                style={styles.btnToRequest}
                onPress={toggleSwitch}>
                <SVG
                  name={darkMode !== true ? Weather_dark : Weather_Light}
                  width={20}
                  height={20}
                  color={colors.text}
                />
              </TouchableOpacity>
              {/* {!ENVIRONMENT.isProduction ? (
                <TouchableOpacity
                  style={styles.btnToRequest}
                  onPress={() => {
                    navigation.navigate(Routes.Notification);
                  }}>
                  <SVG
                    name={Svg_Notification}
                    width={20}
                    height={20}
                    color={COLORS['red']}
                  />
                </TouchableOpacity>
              ) : null} */}
              <TouchableOpacity
                style={styles.btnToRequest}
                onPress={handleNotification}>
                <SVG
                  name={Svg_Notification}
                  width={20}
                  height={20}
                  color={colors.text}
                />
              </TouchableOpacity>
            </>
          )}
          {title === 'Trade' && (
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.btnToRequest}>
              <SVG
                name={Svg_Search}
                width={20}
                height={20}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
          {isLoggedIn && title === 'Trade' && (
            <TouchableOpacity
              onPress={editWatchlist}
              style={styles.btnToRequest}>
              <SVG name={Svg_Edit} width={20} height={20} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {profileData?.email && profileData?.isVerifiedEmail ? null : (
        <VerifyEmail />
      )}
    </>
  );
};

export default MarketWatchHeader;
