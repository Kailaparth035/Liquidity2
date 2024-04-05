import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {BuyDetails} from './components';
import {Header} from '../../components';
import {TabNavigation} from '../../storybook/tabNavigation';
import {buySellSTyles as styles} from './buy-sell.styles';
import {SelectedAssetSheetState} from '../../states';
import OpenOrders from './open-orders';

const Tab = createMaterialTopTabNavigator();

export const BuySell = ({route, navigation}: any) => {
  const {tab: selectedOrderTab, isMusicalType} = route.params ?? {};

  const selectedAssets = useRecoilValue(SelectedAssetSheetState);
  const {symbol} = selectedAssets;

  const tabs = ['Place Order', 'Open Orders', 'Executed Orders'];

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderTab = (tab: string) => {
    switch (tab) {
      case 'Place Order':
        return (
          <BuyDetails
            tab={selectedOrderTab}
            isMusicalType={isMusicalType}
            Symbol={symbol}
            navigation={navigation}
          />
        );
      case 'Open Orders':
        return (
          <OpenOrders type="pending" navigation={navigation} Symbol={symbol} />
        );
      case 'Executed Orders':
        return (
          <OpenOrders
            type="completed"
            navigation={navigation}
            Symbol={symbol}
          />
        );
      default:
        return (
          <BuyDetails
            tab={selectedOrderTab}
            Symbol={symbol}
            navigation={navigation}
          />
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={selectedOrderTab} goBack={goBack} />
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <TabNavigation width="100%" initialRouteName={selectedOrderTab}>
          {tabs.map((tab, ind) => (
            <Tab.Screen name={tab} key={`${tab}__${ind}`}>
              {() => renderTab(tab)}
            </Tab.Screen>
          ))}
        </TabNavigation>
      </View>
    </View>
  );
};
