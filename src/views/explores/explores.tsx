import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, Alert, BackHandler} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {
  ExitApp,
  ExploresState,
  IsExploresState,
  ProfileDataState,
  SelectedLanguageState,
  UserWatchListState,
} from '../../states';

import {Loader} from '../../storybook/loader';
import MarketWatchHeader from '../watchlist/components/header';
import {exploreStyles as styles} from './explore.styles';
import {useTabExplore, useWatchList} from '../watchlist/hooks/get-watchlist';
import {useInterval, useNetwork, usePlatform} from '../../hooks';
import {useKeyChain} from '../../states';
// import {useTrackEvents} from '../../helpers';
import {useLoginAuth} from '../routes/hooks/use-login-auth';
import {APIS} from '../../constants';
import {Routes} from '../../views/routes/constants';
import {IsCancelConfirmationState} from '../../states/open-orders/states';
import RNExitApp from 'react-native-exit-app';
import AnimatedTabBar from '../../components/AnimatedTabBar';

export const Explore = ({navigation}: any) => {
  const explores = useRecoilValue(ExploresState);
  const watchlist = useRecoilValue(UserWatchListState);
  const isLoader = useRecoilValue(IsExploresState);
  const [language, setLanguage] = useRecoilState(SelectedLanguageState);
  const userDetails = useRecoilValue(ProfileDataState);
  const exitApp = useRecoilValue(ExitApp);
  const setIsCancelModal = useSetRecoilState(IsCancelConfirmationState);

  const [isGettingData, setIsGettingData] = useState(false);
  const {getWatchList} = useWatchList();
  const {getTabAssets} = useTabExplore();
  const {get, data} = useNetwork();
  // const {trackEvents} = useTrackEvents();
  const {isLoggedIn} = useLoginAuth();
  const {getProfileData} = useKeyChain();
  const {colors} = useTheme();
  const {isAndroid} = usePlatform();
  const allExplorer = useMemo(() => {
    if (watchlist) {
      return {[watchlist?.name]: watchlist?.assets, ...explores};
    }
    return explores;
  }, [watchlist, explores]);

  useEffect(() => {
    getWatchList(true);
    get(APIS.MultiLanguage);
    setIsCancelModal(false);
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        Alert.alert('Exit application', 'Are you sure you want to exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => RNExitApp.exitApp(),
          },
        ]);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [exitApp]);

  useEffect(() => {
    if (data?.data) {
      const {
        language,
        home,
        navigation,
        orders,
        portfolio,
        news,
        key,
        profile,
      } = data.data ?? {};
      setLanguage((prevState: any) => {
        return {
          ...prevState,
          key,
          language,
          home,
          navigation,
          orders,
          portfolio,
          news,
          profile,
        };
      });
    }
  }, [data]);

  // useInterval(() => {
  //   if (isLoggedIn) {
  //      getTabAssets('privates');
  //   }
  // }, 5000);

  // commenting Below Code As this is not required for now commented by  @avinashSatschel

  // ==========================SOCKET START========================================
  // const {client: cryptoClient} = useCryptoSocket();
  // const {client: stocksClient} = useStockSocket();
  // const {client: forexClient} = useForexSocket();

  // // this will listen the communication from server
  // useEffect(() => {
  //   cryptoClient.onmessage = ({data}) => {
  //     const newJson = JSON.parse(data);
  //     const {lp: price, s: symbol} = newJson;
  //     if (price) {
  //       const assetSymbol = symbol.toUpperCase();
  //       const type = newJson.type === 'loss' ? 'loss' : 'gain';
  //       Queue.add({price, type, symbol: assetSymbol});
  //     }
  //   };
  // }, [cryptoClient]);

  // useEffect(() => {
  //   Queue.consume((id: any, data: any) => {
  //     const {symbol, ...rest} = data;
  //     setTimeout(() => EVENTS.socket.emit(symbol, rest), 10);
  //   });
  // }, []);

  // useEffect(() => {
  //   stocksClient.onmessage = ({data}) => {
  //     const newJson = JSON.parse(data);
  //     const {lp: price, s: symbol} = newJson;
  //     if (price) {
  //       const assetSymbol = symbol.toUpperCase();
  //       const type = newJson.type === 'loss' ? 'loss' : 'gain';
  //       Queue.add({price, type, symbol: assetSymbol});
  //     }
  //   };
  // }, [stocksClient]);

  // useEffect(() => {
  //   forexClient.onmessage = ({data}) => {
  //     const newJson = JSON.parse(data);
  //     const {lp: price, s: symbol} = newJson;
  //     if (price) {
  //       const assetSymbol = symbol.toUpperCase();
  //       const type = newJson.type === 'loss' ? 'loss' : 'gain';
  //       Queue.add({price, type, symbol: assetSymbol});
  //     }
  //   };
  // }, [forexClient]);
  // // ==========================SOCKET END========================================

  // const tabPress = (name: string) => {
  //   trackEvents(`home-${name}` as any, {navigate: name});
  // };

  const keys = Object.keys(allExplorer ?? {}).filter(
    key =>
      key !== 'marketIndexes' &&
      key !== 'crypto' &&
      key !== 'music' &&
      key !== 'stocks' &&
      key !== 'forex' &&
      key !== 'commodities',
  );

  // keys index changed from these code of lines
  const fromIndex = keys.indexOf('music');
  const toIndex = 1;
  const element = keys.splice(fromIndex, 1)[0];
  keys.splice(toIndex, 0, element);

  const order = [
    keys[0],
    'privates',
    'music',
    'sba7',
    'stocks',
    'forex',
    'commodities',
  ];
  keys.sort((a, b) => order.indexOf(a) - order.indexOf(b));

  useEffect(() => {
    setIsCancelModal(false);
  }, []);

  useEffect(() => {
    if (userDetails?.status === 'pending') {
      setTimeout(() => {
        getProfileData();
        setIsGettingData(prev => !prev);
      }, 5000);
    }
  }, [userDetails?.status, isGettingData]);

  return (
    <View
      style={[styles.exploreContainer, {backgroundColor: colors.background}]}>
      <View
        style={[
          styles.exploreHeader,
          {
            backgroundColor: colors.background,
            paddingTop: isAndroid ? 25 : 0,
          },
        ]}>
        <MarketWatchHeader
          title={language?.navigation?.trade ?? 'Trade'}
          navigation={navigation}
        />
      </View>
      {isLoader || !watchlist?.assets ? (
        <Loader top={40} color={colors.text} />
      ) : (
        <>
          {keys.length > 0 ? (
            <AnimatedTabBar keys={keys} navigation={navigation} />
          ) : (
            <Text style={styles.noExploreData}>No any explore found.</Text>
          )}
        </>
      )}
    </View>
  );
};
