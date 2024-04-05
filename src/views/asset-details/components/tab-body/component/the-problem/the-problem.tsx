import React, {Fragment, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../../storybook/image';

import {mainStyle as styles} from '../main-style';

export const TheProblem = ({data}: any) => {
  const {colors} = useTheme();
  const renderInfo = useMemo(
    () => (
      <View>
        {data?.items?.map(
          ({heading, description, media}: any, index: number) => (
            <Fragment>
              <Text style={[styles.title, {color: colors.text}]}>
                {index + 1}. {heading}
              </Text>

              {index !== 0 &&
                media?.map(({url}: any, index: number) => (
                  <Fragment key={index}>
                    <ImageView
                      source={{
                        uri: url ?? '',
                      }}
                      url={url ?? ''}
                      alt="sdss"
                      style={{marginVertical: 16}}
                      //@ts-ignore
                      width={'100%'}
                      height={216}
                    />
                  </Fragment>
                ))}

              <Text
                key={index}
                style={[styles.description, {color: colors.text}]}>
                {description.desc}
              </Text>

              {index === 0 &&
                media?.map(({url}: any, index: number) => (
                  <Fragment key={index}>
                    <ImageView
                      source={{
                        uri: url,
                      }}
                      url={url}
                      alt="sdss"
                      style={{marginVertical: 16}}
                      //@ts-ignore
                      width={'100%'}
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
