import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../../storybook/image';

import {mainStyle as styles} from '../main-style';

export const WhatWeDo = ({data}: any) => {
  const {colors} = useTheme();
  const renderInfo = useMemo(
    () => (
      <View>
        {data?.items?.map(
          ({heading, description, media}: any, index: number) => (
            <Fragment key={index}>
              <Text style={[styles.title, {color: colors.text}]}>
                {heading ?? ''}
              </Text>
              <Text
                key={index}
                style={[styles.description, {color: colors.text}]}>
                {description ?? ''}
              </Text>
              {media?.map(({url}: any, idx: number) => (
                <Fragment key={idx}>
                  <ImageView
                    source={{
                      uri: url ?? '',
                    }}
                    url={url ?? ''}
                    alt="sdss"
                    //@ts-ignore
                    width={'100%'}
                    style={{marginVertical: 16}}
                    height={216}
                  />
                </Fragment>
              ))}
            </Fragment>
          ),
        )}
      </View>
    ),
    [data?.items],
  );

  return <View style={styles.wrapper}>{renderInfo}</View>;
};
