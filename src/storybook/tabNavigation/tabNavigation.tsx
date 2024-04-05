import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {COLORS} from '../../assets';
import {useTheme} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export const TabNavigation = ({
  children,
  width,
  initialRouteName,
  backgroundColor,
  swipeEnabled,
}: any) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        swipeEnabled: swipeEnabled,
        animationEnabled:false,
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: '#878C99',
        tabBarStyle: {
          backgroundColor: backgroundColor ?? colors.ground,
          width: width ?? '100%',
        },
        tabBarItemStyle: {
          width: 'auto',
          minWidth: 50,
          paddingHorizontal: 16,
        },
        tabBarLabelStyle: {
          margin: 0,
          textTransform: 'none',
          fontWeight: '500',
        },
        tabBarIndicatorStyle: {
          backgroundColor: COLORS['accent-dark'],
        },
      }}>
      {children}
    </Tab.Navigator>
  );
};
