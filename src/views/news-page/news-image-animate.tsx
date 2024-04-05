import React from 'react';
import {Animated, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_HEIGHT = 300;
const NewsImageAnimate = ({offset, image}: any) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  const headerHeight = offset.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: headerHeight,
      }}>
      <Image
        source={{uri: image}}
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: colors.background,
        }}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

export default NewsImageAnimate;
