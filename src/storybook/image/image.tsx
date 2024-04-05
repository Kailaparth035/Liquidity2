import React, {useState, useCallback} from 'react';
import {Image, ImagePropsBase, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';

import {Loader} from '../loader';
import {ImageStyles as styles} from './image.styles';

interface ICommon extends ImagePropsBase {
  url: string;
  style?: any;
  alt: string;
}

const WIDTH = 40;
const HEIGHT = 40;

export const ImageView = ({
  url,
  height,
  width,
  style,
  alt,
  ...props
}: ICommon) => {
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {colors} = useTheme();

  const isSvg = /.svg/gi.test(url);

  const onError = useCallback(() => {
    setIsError(true);
  }, [setIsError]);

  return (
    <>
      {loading && (
        <View
          style={[
            styles.loader,
            {width: width ?? WIDTH, height: height ?? HEIGHT},
          ]}>
          <Loader top={0} size="small" />
        </View>
      )}

      {isSvg ? (
        <SvgUri
          width={width ?? WIDTH}
          height={height ?? HEIGHT}
          uri={url}
          style={style}
        />
      ) : (
        <>
          {url && !isError ? (
            <Image
              style={[style, {width: width ?? WIDTH, height: height ?? HEIGHT}]}
              onError={onError}
              onLoad={() => setLoading(false)}
              {...props}
              source={{uri: url}}
            />
          ) : null

          //comented this code so that we can use it once we need.

          //   <View
          //   style={[
          //     styles.loader,{backgroundColor:colors.headerCard},
          //     {width: width ?? WIDTH, height: height ?? HEIGHT},
          //   ]}>
          //   <Text style={styles.firstTxt}>{alt?.[0]}</Text>
          // </View>
          }
        </>
      )}
    </>
  );
};
