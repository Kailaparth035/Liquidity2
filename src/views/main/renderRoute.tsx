import React from 'react';
import {useRecoilValue} from 'recoil';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomNavigation} from '../../storybook/bottomNavigation';
import Portfolio from '../portfolio';
import {Profile} from '../profile';
import {News} from '../news';
import {Explore} from '../explores';
import {useCryptoSocket, useForexSocket, useStockSocket} from '../../hooks';
import {Routes} from '../routes/constants';
import {useLoginAuth} from '../routes/hooks/use-login-auth';
import {useTrackEvents} from '../../helpers';
import Orders from '../orders/orders';
import {SelectedLanguageState} from '../../states';
import {Auction} from '../../views/auction';

const Tab = createBottomTabNavigator();

const MainRoute = ({navigation}: any) => {
  const {onConnect: onCryptoConnect} = useCryptoSocket();
  const {onConnect: onStockConnect} = useStockSocket();
  const {onConnect: onForexConnect} = useForexSocket();
  const language = useRecoilValue(SelectedLanguageState);

  const {isLoggedIn} = useLoginAuth();
  const {trackEvents} = useTrackEvents();

  const bottomRoutes = [
    {
      name: language?.navigation?.portfolio ?? 'Portfolio',
      component: Portfolio,
    },
    {name: language?.navigation?.auction ?? 'Auction', component: Auction},
    {name: language?.navigation?.news ?? 'News', component: News},
    {name: language?.navigation?.trade ?? 'Trade', component: Explore},
    {name: language?.navigation?.order ?? 'Order', component: Orders},
    {name: language?.navigation?.profile ?? 'Profile', component: Profile},
  ];

  const updateSocket = (name: string) => {
    trackEvents(name?.toLowerCase() as any, {navigate: name});

    if (!isLoggedIn && !/trade/gi.test(name) && !/news/gi.test(name)) {
      navigation.navigate(Routes.Login);
    }
    if (/trade/gi.test(name)) {
      onCryptoConnect();
      onStockConnect();
      onForexConnect();
      // EVENTS.socket = new EventEmitter();
    } else {
      // TODO
      // cryptoClient.close();
      // stocksClient.close();
      // EVENTS.socket.removeAllListeners();
    }
  };

  return (
    <BottomNavigation>
      {bottomRoutes.map(({name, component}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          listeners={{
            tabPress: () => updateSocket(name),
            tabLongPress: () => updateSocket(name),
          }}
        />
      ))}
    </BottomNavigation>
  );
};

export default MainRoute;
