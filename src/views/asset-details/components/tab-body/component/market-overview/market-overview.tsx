import {useTheme} from '@react-navigation/native';
import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';

import {ImageView} from '../../../../../../storybook/image';

import {windowWidth} from '../../../../hooks/window';

import {mainStyle as styles} from '../main-style';

export const MarketOverview = ({data}: any) => {
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
                <View style={{marginTop: 16}} key={idx}>
                  <ImageView
                    source={{
                      uri: url,
                    }}
                    url={url}
                    alt="market overview"
                    width={windowWidth - 50}
                    height={150}
                  />
                </View>
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
