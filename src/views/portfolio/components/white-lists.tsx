import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {tokenDetailsStyles as styles} from '../components/token-details/token-details.styles';
import {IWhitelisted} from '../types';
import NoDataAvailable from './no-data';

interface IWhiteLists {
  whitelists: IWhitelisted[];
}

export const WhiteList: FC<IWhiteLists> = ({whitelists}) => {
  const {colors} = useTheme();
  return (
    <>
      {!!whitelists.length ? (
        whitelists.map((whitelist, i) => (
          <View style={styles.content} key={`${whitelist}_${i}`}>
            <Text
              numberOfLines={1}
              style={[styles.elips, {color: colors.text}]}>
              {whitelist.address}
            </Text>
          </View>
        ))
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};
