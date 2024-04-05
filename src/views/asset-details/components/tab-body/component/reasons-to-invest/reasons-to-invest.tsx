import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {mainStyle as styles} from '../main-style';

export const TheReasonToInvest = ({data}: any) => {
  const {colors} = useTheme();
  const renderInfo = useMemo(
    () => (
      <View>
        {data?.items?.map(({heading, description}: any, index: number) => (
          <Fragment key={index}>
            <Text style={[styles.title, {color: colors.text}]}>
              {heading ?? ''}
            </Text>
            <Text style={[styles.description, {color: colors.text}]}>
              {description ?? ''}
            </Text>
          </Fragment>
        ))}
      </View>
    ),
    [data?.items],
  );

  return <View style={styles.wrapper}>{renderInfo}</View>;
};
