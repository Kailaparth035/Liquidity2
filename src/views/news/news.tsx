import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {APIS, Storages} from '../../constants';
import {useNetwork} from '../../hooks';
import {NewsState, ProfileDataState, SelectedLanguageState} from '../../states';
import {TabNavigation} from '../../storybook/tabNavigation';
import {NewsRow} from './components';
import {keys} from './constants';
import {Header} from '../../components';
import {useTrackEvents} from '../../helpers';
import VerifyEmail from '../../views/watchlist/components/VerifyEmail';

const Tab = createMaterialTopTabNavigator();

export const News = ({navigation}: any) => {
  const language = useRecoilValue(SelectedLanguageState);
  const {get, data} = useNetwork();
  const {trackEvents} = useTrackEvents();
  const setNews = useSetRecoilState(NewsState);
  const {setItem: setNewsStorage} = useAsyncStorage(Storages.News);
  const {colors} = useTheme();
  const profileData = useRecoilValue(ProfileDataState);

  useEffect(() => {
    get(APIS.NEWS);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setNewsStorage(JSON.stringify(data.data));
      setNews(data.data);
    }
  }, [data]);

  const tabPress = (name: string) => {
    trackEvents(`news-${name}` as any, {navigate: name});
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <Header title={language?.navigation?.news ?? 'News'} />
      {profileData?.email && profileData?.isVerifiedEmail ? null :  <VerifyEmail/>}
      <TabNavigation width="100%">
        {keys.map(({key}, i) => (
          <Tab.Screen
            name={key}
            options={{
              tabBarLabelStyle: {
                textTransform: 'capitalize',
              },
            }}
            key={`${key}__${i}`}
            listeners={{
              tabPress: () => tabPress(key),
            }}>
            {() => <NewsRow name={key} navigation={navigation} />}
          </Tab.Screen>
        ))}
      </TabNavigation>
    </View>
  );
};
