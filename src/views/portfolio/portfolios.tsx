import React, {useCallback, useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useIsFocused, useTheme} from '@react-navigation/native';

import {
  IsInfoLoaderState,
  LoadingPortfolioState,
  PortfolioState,
  SelectedLanguageState,
} from '../../states';
import {Loader} from '../../storybook/loader';
import {TabNavigation} from '../../storybook/tabNavigation';
import {AllPortfolio} from './components/all-portfolio';
import {PortfolioAssets} from './components/all-portfolio';
import {useInterval, useNetwork} from '../../hooks';
import {usePortfolioApi} from './hooks/use-portfolio-api';
import MarketWatchHeader from '../../views/watchlist/components/header';
import {Routes} from '../../views/routes/constants';
import {Svg_No_Portfolio} from '../../assets';
import {SVG} from '../../storybook';
import {APIS, EMPTY_PORTFOLIO, START_INVESTMENT} from '../../constants';
import {
  FellowOwnersState,
  isOtherAccountState,
  selectedAuthUserState,
} from '../../views/profile/components/co-owners/states';
import {portfolioStyles as styles} from './portfolio.styles';
import {useFortressAccountInfo} from '../../hooks/use-fortressAccountInfo';

const Tab = createMaterialTopTabNavigator();
const tabs = ['All', 'Privates', 'Sba7'];
// const tabs = ['All', 'Privates', 'Music', 'Stocks', 'Forex', 'Commodities'];

const AssetsList = ({navigation}: any) => {
  const isLoader = useRecoilValue(IsInfoLoaderState);
  const portfolio = useRecoilValue(PortfolioState);
  const {getPortfolios} = usePortfolioApi();
  const [language, setLanguage] = useRecoilState(SelectedLanguageState);
  const {colors} = useTheme();
  const {AccountInfo} = useFortressAccountInfo();
  const cashBalance = AccountInfo?.balance;
  const isFocuse = useIsFocused();

  useInterval(getPortfolios, 15000);

  // this section is to get profile information for handling co-owner/authorised user case ///////
  const setFellowOwners = useSetRecoilState(FellowOwnersState);
  const setIsOtherAccount = useSetRecoilState(isOtherAccountState);
  const setLoggedAccount = useSetRecoilState(selectedAuthUserState);
  const loaderPortfolio = useRecoilValue(LoadingPortfolioState);
  const {get: fetchOwners, data} = useNetwork();

  useEffect(() => {
    fetchOwners(APIS.coOwnersExchange);
    getPortfolios();
  }, [isFocuse]);

  useEffect(() => {
    if (data?.data) {
      setFellowOwners(data.data);
      setIsOtherAccount(data.data.find((owner: any) => owner?.isActive));
      const isSelected = data.data.find((coOwner: any) => coOwner.isActive);
      if (isSelected) setLoggedAccount(isSelected);
      else {
        const myAccount = data.data.find((owner: any) => owner.isPrimary);
        setLoggedAccount(myAccount);
      }
    }
  }, [data]);

  // Profile section ends here //////////////////////////////////

  const {blankArray} = useMemo(() => {
    const blankArray: any = [];
    Object.keys(portfolio).map(name => {
      const portfolioData = portfolio[name]?.assets;
      blankArray.push(portfolioData);
    });
    return {blankArray};
  }, [portfolio, isFocuse]);

  const PortfolioData = blankArray.every(item => item.length === 0);

  const handleHome = useCallback(() => {
    navigation.navigate(Routes.Trade);
  }, [navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <MarketWatchHeader
        title={language?.navigation?.portfolio ?? 'Portfolio'}
        navigation={navigation}
      />

      {isLoader ? (
        <Loader />
      ) : (
        <View style={styles.contain}>
          {!PortfolioData || cashBalance ? (
            <TabNavigation width="100%">
              {tabs.map((tab: any, i: number) => (
                <Tab.Screen
                  options={{
                    tabBarLabel: tab === 'Privates' ? 'Pre-IPO' : tab,
                    tabBarLabelStyle: {
                      textTransform:
                        tab === 'Privates'
                          ? 'none'
                          : tab === 'Sba7'
                          ? 'uppercase'
                          : 'none',
                    },
                  }}
                  name={tab === 'Privates' ? 'Pre-IPO' : tab}
                  key={`${tab}__${i}`}>
                  {() =>
                    tab === 'All' ? (
                      loaderPortfolio ? (
                        <ActivityIndicator size={'large'} />
                      ) : (
                        <AllPortfolio
                          portfolio={portfolio}
                          navigation={navigation}
                        />
                      )
                    ) : loaderPortfolio ? (
                      <ActivityIndicator size={'large'} />
                    ) : (
                      <PortfolioAssets
                        portfolio={portfolio}
                        tab={tab}
                        navigation={navigation}
                      />
                    )
                  }
                </Tab.Screen>
              ))}
            </TabNavigation>
          ) : (
            <View
              style={[styles.container, {backgroundColor: colors.background}]}>
              <View style={styles.contain}>
                <View style={styles.noPortfolio}>
                  <SVG name={Svg_No_Portfolio} height={120} />
                  <Text style={[styles.empty, {color: colors.text}]}>
                    {EMPTY_PORTFOLIO}
                  </Text>
                  <View style={{alignSelf: 'center', margin: 10}}>
                    <Text style={styles.subTitle}>{START_INVESTMENT}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.StartBtn}
                    onPress={handleHome}>
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      Start Trading
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default AssetsList;
