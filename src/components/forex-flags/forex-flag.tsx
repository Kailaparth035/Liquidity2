import React from 'react';
import {View} from 'react-native';
import {SvgUri} from 'react-native-svg';

import {ForexImageStyles as styles} from './forex-flag.style';

interface IForexFlags {
  imageFrom: string;
  imageTo: string;
}
export const ForexFlags = ({imageFrom, imageTo}: IForexFlags) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.imageFromContainer}>
        <SvgUri
          width="24px"
          height="24px"
          uri={imageFrom}
          style={styles.imageFrom}
        />
      </View>
      <View
        style={styles.imageToContainer}>
        <SvgUri
          width="24px"
          height="24px"
          uri={imageTo}
          style={styles.imageTo}
        />
      </View>
    </View>
  );
};
