import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../../storybook/image';
import {windowWidth} from '../../../../hooks/window';

import {mainStyle as styles} from '../main-style';

export const Team = ({data}: any) => {
  const {colors} = useTheme();
  const renderPartnership = useMemo(
    () =>
      data?.items?.map(({metadata, media}: any, index: number) => (
        <Fragment key={index}>
          <View style={styles.row_50}>
            {media.map(({url}: any, idx: number) => (
              <Fragment key={idx}>
                <ImageView
                  source={{
                    uri: url ?? '',
                  }}
                  url={url ?? ''}
                  alt="Team"
                  width={windowWidth / 2.5}
                  height={192}
                />
              </Fragment>
            ))}
            <View>
              <Text style={[styles.name, {color: colors.text}]}>
                {metadata?.name ?? ''}
              </Text>
              <Text style={styles.designation}>
                {metadata?.designation ?? ''}
              </Text>
            </View>
          </View>
        </Fragment>
      )),
    [data?.items],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.rowWrap}>{renderPartnership}</View>
    </View>
  );
};
