import type {ISigner} from '../types';

import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import NoDataAvailable from './no-data';
import {tokenDetailsStyles as styles} from '../components/token-details/token-details.styles';

interface ISignatures {
  signatures: ISigner[];
}

export const Signatures: FC<ISignatures> = ({signatures}) => {
  const {colors} = useTheme();
  return (
    <>
      {!!signatures.length ? (
        signatures.map((signature, i) => (
          <View style={styles.content} key={`${signature}_${i}`}>
            <Text
              numberOfLines={1}
              style={[styles.elips, {color: colors.text}]}>
              {signature.address}
            </Text>
          </View>
        ))
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};
