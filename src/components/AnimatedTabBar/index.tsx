// @flow
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, FlatList} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../assets';
import {capitalize} from '../../views/utils';
import AssetsView from '../../views/landing/components/AssetsView';
import {styles} from './styles';

type AnimatedTabBarType = {
  keys: Array<string>;
  navigation: any;
};

const AnimatedTabBar = ({keys, navigation}: AnimatedTabBarType) => {
  const width = Dimensions.get('window').width;
  const ref = useRef();
  const flatlistref = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    flatlistref.current.scrollToIndex({
      index: currentIndex,
      animated: true,
      viewPosition: 0.5,
    });
    ref.current.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  const Tab = ({item, style, index}: any) => {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          setCurrentIndex(index);
        }}>
        <View>
          <Text
            style={[
              styles.text,
              {
                color:
                  currentIndex == index ? COLORS['color-orange'] : colors.text,
              },
            ]}>
            {capitalize(item)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onScrollEnd = (e: any) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum > -1) {
      setCurrentIndex(pageNum);
    }
  };

  return (
    <View style={styles.parent}>
      <View style={{flexDirection: 'row'}}>
        <FlatList
          ref={flatlistref}
          horizontal
          data={keys}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Tab
                style={[
                  styles.tabStyle,
                  {
                    borderColor:
                      currentIndex == index
                        ? COLORS['color-orange']
                        : colors.background,
                  },
                ]}
                item={
                  item === 'privates'
                    ? 'Pre-IPO'
                    : item?.length > 15
                    ? item.slice(0, 15) + '...'
                    : item === 'null' ?  'watchlist' : item
                }
                index={index}
              />
            );
          }}
        />
      </View>
      <View style={styles.assetRowListContainer}>
        <FlatList
          ref={ref}
          horizontal
          data={keys}
          initialScrollIndex={currentIndex}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({item: Item, index}) => {
            return (
              <View
                style={{
                  width,
                  flex: 1,
                }}>
                <AssetsView
                  watchlistName={keys[0]}
                  index={currentIndex}
                  assetType={keys[index]}
                  navigation={navigation}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AnimatedTabBar;
