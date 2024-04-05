import {useTheme} from '@react-navigation/native';
import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';

import {ImageView} from '../../../../../../storybook/image';

import {windowWidth} from '../../../../hooks/window';

import {mainStyle as styles} from '../main-style';

export const MediaCoverage = ({data}: any) => {
  const {colors} = useTheme();
  const renderNewsLists = useMemo(
    () =>
      data?.items?.map(
        ({heading, media, metadata}: any, index: number) =>
          index !== 0 && (
            <View style={styles.row} key={index}>
              {media.map(({url}: any, index: number) => (
                <Fragment key={index}>
                  <ImageView
                    source={{
                      uri: url,
                    }}
                    url={url}
                    alt="Media Coverage"
                    width={100}
                    height={60}
                  />
                </Fragment>
              ))}

              <View style={styles.mediaCoverageBlogLeft}>
                <Text
                  style={[
                    styles.mediaCoverageBlogHeading,
                    {color: colors.text},
                  ]}>
                  {heading ?? ''}
                </Text>
                <View style={styles.spaceBetween}>
                  <Text style={styles.date}>{metadata?.date ?? ''}</Text>
                  <Text style={styles.readMore}>Read More</Text>
                </View>
              </View>
            </View>
          ),
      ),
    [data?.items],
  );

  return (
    <View>
      <ImageView
        source={{
          uri: data?.items[0]?.media[0]?.url ?? '',
        }}
        url={data?.items[0]?.media[0]?.url ?? ''}
        alt="media coverage"
        width={windowWidth}
        height={216}
      />
      <View
        style={[
          styles.mediaCoverageTextWrapper,
          {backgroundColor: colors.box},
        ]}>
        <Text style={[styles.boldInfo, {color: colors.text}]}>
          {data?.items[0]?.heading ?? ''}
        </Text>
      </View>
      <View style={styles.mt_16}>{renderNewsLists}</View>
    </View>
  );
};
