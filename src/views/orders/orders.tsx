import React, {useEffect, useMemo} from 'react';
import {Modal, Platform, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';

import {
  AccessTokenState,
  ProfileDataState,
  SelectedLanguageState,
} from '../../states';
import {Routes} from '../routes/constants';
import {TabNavigation} from '../../storybook/tabNavigation';
import {Sheet} from '../../storybook/sheet';
import {Header} from '../../components';
import LoginButton from '../login/components/login-button';
import {useTrackEvents} from '../../helpers';
import {OrderedAssets} from '../transaction/components';
import {OrderOptionsSheet} from '../transaction/components/order-option-sheet';
import {
  IsExtraModalState,
  IsOptionsSheetOpenState,
  isBidsVisibleState,
} from '../../states/open-orders/states';
import VerifyEmail from '../../views/watchlist/components/VerifyEmail';
import {BID_TABS, ORDER_TABS} from '../../constants';
import {OrdersStyles as styles} from './orders.styles';
import {AuctionBidList} from './components';

const Tab = createMaterialTopTabNavigator();

const Orders = ({navigation}: any) => {
  const accessToken = useRecoilValue(AccessTokenState);
  const language = useRecoilValue(SelectedLanguageState);
  const [isOpen, setIsOpen] = useRecoilState(IsOptionsSheetOpenState);
  const ExtraModal = useRecoilValue(IsExtraModalState);
  const isBidsVisible = useRecoilValue(isBidsVisibleState);

  const {colors} = useTheme();
  const {trackEvents} = useTrackEvents();

  const {orders: languageOrder} = language ?? {};
  const {order: orderTitle} = language?.navigation ?? {};
  const {topNav} = languageOrder ?? {};
  const tabs = [
    topNav?.open ?? ORDER_TABS.open,
    topNav?.executed ?? ORDER_TABS.executed,
    topNav?.canceled ?? ORDER_TABS.cancelled,
  ];
  const BidTabs = [BID_TABS.open, BID_TABS.outbid, BID_TABS.won];

  const profileData = useRecoilValue(ProfileDataState);

  useEffect(() => {
    if (!accessToken.length) {
      navigation.navigate(Routes.Login);
    }
  }, []);

  const tabPress = (name: string) => {
    trackEvents(`transactions-${name}` as any, {navigate: name});
  };

  const renderList = useMemo(() => {
    return (
      <>
        {isBidsVisible ? (
          <TabNavigation width="100%">
            {BidTabs.map((tab: any, i: number) => (
              <Tab.Screen
                name={tab}
                key={`${tab}__${i}`}
                listeners={{
                  tabPress: () => tabPress(tab),
                }}>
                {() => (
                  <View
                    style={[
                      styles.container,
                      {backgroundColor: colors.background},
                    ]}>
                    <AuctionBidList tab={tab} navigation={navigation}/>
                  </View>
                )}
              </Tab.Screen>
            ))}
          </TabNavigation>
        ) : (
          <TabNavigation width="100%">
            {tabs.map((tab: any, i: number) => (
              <Tab.Screen
                name={tab}
                key={`${tab}__${i}`}
                listeners={{
                  tabPress: () => tabPress(tab),
                }}>
                {() => (
                  <View
                    style={[
                      styles.container,
                      {backgroundColor: colors.background},
                    ]}>
                    <OrderedAssets
                      tab={tab}
                      navigation={navigation}
                      topNav={topNav}
                      index={i}
                    />
                  </View>
                )}
              </Tab.Screen>
            ))}
          </TabNavigation>
        )}
      </>
    );
  }, [isBidsVisible, colors, navigation]);

  return (
    <View style={styles.mainContainer}>
      <Header title={orderTitle ?? 'Orders'} />
      {profileData?.email && profileData?.isVerifiedEmail ? null : (
        <VerifyEmail />
      )}
      {!accessToken.length ? (
        <LoginButton navigation={navigation} />
      ) : (
        renderList
      )}
      <Sheet
        isModal={isOpen}
        setIsModal={setIsOpen}
        height={Platform.OS === 'android' ? 185 : 200}>
        <OrderOptionsSheet navigation={navigation} />
      </Sheet>
      <Modal visible={ExtraModal}></Modal>
    </View>
  );
};

export default Orders;
