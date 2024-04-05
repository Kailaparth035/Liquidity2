import React, {Fragment, useMemo} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../../storybook/image';
import {windowWidth} from '../../../../hooks/window';

import {mainStyle as styles} from '../main-style';

export const Partnership = ({data}: any) => {
  const {colors} = useTheme();
  const renderPartnership = useMemo(
    () =>
      data?.items?.map(({media}: any, index: number) =>
        media?.map(({url}: any, idx: number) => (
          <Fragment key={index + idx}>
            <View style={styles.row_50} key={index}>
              <View style={styles.partnershipImage}>
                <ImageView
                  source={{uri: url}}
                  url={url}
                  alt="Partnership"
                  width={windowWidth / 2.4}
                  height={72}
                />
              </View>
            </View>
          </Fragment>
        )),
      ),
    [data?.items],
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.rowWrap}>{renderPartnership}</View>
    </View>
  );
};
