import type {ICreator} from '../types';

import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import NoDataAvailable from './no-data';
import {tokenDetailsStyles as styles} from '../components/token-details/token-details.styles';

interface ICreators {
  creators: ICreator[];
}

export const Creators: FC<ICreators> = ({creators}) => {
  const {colors} = useTheme();
  return (
    <>
      {!!creators.length ? (
        creators.map((creator, i) => (
          <View style={styles.content} key={`${creator.share}_${i}`}>
            <Text
              numberOfLines={1}
              style={[styles.elips, {color: colors.text}]}>
              {creator.address}
            </Text>
            <Text style={[styles.value, {color: colors.text}]}>
              {creator.share}%
            </Text>
          </View>
        ))
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};
