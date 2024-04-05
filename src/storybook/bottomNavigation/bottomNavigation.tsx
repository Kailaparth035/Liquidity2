import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {
  COLORS,
  Svg_Home,
  Svg_Home_Active,
  Svg_News,
  Svg_Portfolio,
  Svg_Profile,
  Svg_Profile_Active,
  Svg_Portfolio_Active,
  Svg_News_Active,
  Svg_Order_Active,
  Svg_Order,
  Svg_Transaction,
  Svg_Auction_Gavel_Dark,
  Svg_Auction_Gavel_Light,
  Svg_Auction_Gavel,
} from '../../assets';
import {SVG} from '../../storybook/svg';
import {bottomNavigationStyles as styles} from './bottomNavigation.style';
import {isDarkModeState, SelectedLanguageState} from '../../states';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Svg_Home_Active_Dark} from '../../assets/icon/svg/ActiveDark';
import {Svg_News_Active_Dark} from '../../assets/icon/svg/newsActiveDark';
import {Svg_Order_Active_Dark} from '../../assets/icon/svg/ordersActiveDark';
import {Svg_Portfolio_Active_Dark} from '../../assets/icon/svg/portfolioActiveDark';
import {Svg_Profile_Active_Dark} from '../../assets/icon/svg/profileActiveDark';
import {Svg_Transaction_Dark} from '../../assets/icon/svg/trade-dark';
import {Svg_Transaction_Light} from '../../assets/icon/svg/trade-light';

const Tab = createBottomTabNavigator();

export const BottomNavigation = ({children}: any) => {
  const [dark, setDark] = useRecoilState(isDarkModeState);
  const language = useRecoilValue(SelectedLanguageState);
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Portfolio"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName = Svg_Transaction;
          switch (route.name) {
            //case language?.navigation?.trade:
            case 'Trade':
              iconName = focused
                ? dark
                  ? Svg_Transaction_Light
                  : Svg_Transaction_Dark
                : Svg_Transaction;

              break;
            case 'Auction':
              iconName = focused
                ? dark
                  ? Svg_Auction_Gavel_Light
                  : Svg_Auction_Gavel_Dark
                : Svg_Auction_Gavel;
              break;
            case language?.navigation?.news:
              iconName = focused
                ? dark
                  ? Svg_News_Active
                  : Svg_News_Active_Dark
                : Svg_News;
              break;
            case language?.navigation?.order:
              iconName = focused
                ? dark
                  ? Svg_Order_Active
                  : Svg_Order_Active_Dark
                : Svg_Order;
              break;
            case language?.navigation?.portfolio:
              iconName = focused
                ? dark
                  ? Svg_Portfolio_Active
                  : Svg_Portfolio_Active_Dark
                : Svg_Portfolio;
              break;
            case language?.navigation?.profile:
              iconName = focused
                ? dark
                  ? Svg_Profile_Active
                  : Svg_Profile_Active_Dark
                : Svg_Profile;
              break;
            default:
              break;
          }
          return <SVG name={iconName} width={20} height={20} />;
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: 'grey',
        tabBarItemStyle: styles.tabBarItem,
        tabBarStyle: [
          styles.tabBar,
          {
            shadowColor: colors.text,
            backgroundColor: colors.ground,
            height: 60,
            paddingBottom: 10,
          },
        ],
        tabBarLabelStyle: styles.tabBarLabel,
      })}>
      {children}
    </Tab.Navigator>
  );
};
