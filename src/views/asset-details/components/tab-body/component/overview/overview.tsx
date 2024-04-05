import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../../storybook/image';
import {windowWidth} from '../../../../hooks/window';

import {mainStyle as styles} from '../main-style';

export const OverView = ({data}: any) => {
  const {colors} = useTheme();
  const renderOverView = useMemo(
    () =>
      data?.items?.map(({description, heading, metadata, media}: any) => (
        <Fragment>
          <View style={styles.overViewWrapper}>
            {media.map(({url}: any) => {
              return (
                <View>
                  <ImageView
                    source={{
                      uri: url,
                    }}
                    url={url}
                    alt="OverView"
                    width={windowWidth}
                    height={216}
                  />
                </View>
              );
            })}
            <Text style={styles.days_left}>{metadata?.daysLeft ?? ''}</Text>
            <View style={styles.overViewTextContainer}>
              <View
                style={[
                  styles.overViewFooterWrapper,
                  {backgroundColor: colors.headerCard},
                ]}>
                {metadata?.stats?.map(({title, value}: any) => {
                  return (
                    <View style={{width: '50%', marginVertical: 16}}>
                      <Text
                        style={[
                          styles.overViewBoldContent,
                          {color: colors.text},
                        ]}>
                        {value ?? ''}
                      </Text>
                      <Text style={styles.overViewNormalContent}>
                        {title ?? ''}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <Text style={[styles.additionalInfo, {color: colors.text}]}>
              {metadata?.additionalInfo ?? ''}
            </Text>
          </View>

          <View style={styles.mt_16}>
            <Text style={styles.orgName}>{heading ?? ''}</Text>
            <View>
              <Text style={[styles.overViewDesc, {color: colors.text}]}>
                {description ?? ''}
              </Text>
            </View>
          </View>
        </Fragment>
      )),

    [data?.items],
  );

  return <View>{renderOverView}</View>;
};
