import React, {FC, useCallback, useMemo} from 'react';
import {View} from 'react-native';
import { useTheme } from '@react-navigation/native';

import {Events, News, OverView} from '../';
import {ASSETS_DETAILS_TAB} from '../../../../constants';
import {tabBodyStyle as styles} from './tab-body.style';

interface ITabBody {
  tab: string;
  symbol: string;
  assetType: string;
  navigation: any;
}

export const TabBody: FC<ITabBody> = ({tab, symbol, assetType, navigation}) => {
const {colors} = useTheme()

  const {EVENTS, NEWS, OVERVIEW} = useMemo(
    () => ASSETS_DETAILS_TAB,
    [ASSETS_DETAILS_TAB],
  );

  const getTheCurrentTab = useCallback(() => {
    switch (tab) {
      case NEWS:
        return (
          <News symbol={symbol} assetType={assetType} navigation={navigation} />
        );
      case EVENTS:
        return <Events symbol={symbol} assetType={assetType} />;
      case OVERVIEW:
        return <OverView symbol={symbol} assetType={assetType} />;
    }
  }, [tab]);

  return <View style={[styles.tabBody,{backgroundColor:colors.background}]}>{getTheCurrentTab()}</View>;
};
