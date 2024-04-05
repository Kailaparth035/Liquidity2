import type {INews} from '../../states';
import type {INavigation} from '../../types';

import React, {FC, useCallback, useMemo, useRef} from 'react';
import {View, ScrollView, SafeAreaView, Animated} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../components';
import {Loader} from '../../storybook/loader';
import NewsSubHeader from './news-sub-header';
import NewsWebview from './news-webview';
import NewsImageAnimate from './news-image-animate';
import {newsPageStyles as styles} from './news-page.style';
import {SVG_SHARE} from '../../assets/icon/svg/transactionFilter';

interface IParams {
  news: INews;
}

export const NewsPage: FC<INavigation> = ({navigation, route}) => {
  const {news}: IParams = useMemo(() => route.params, [route]) as any;
  const {colors} = useTheme();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const {image, publishedDate, title, url} = news;

  const renderNews = useCallback(() => {
    if (!news) {
      return <Loader />;
    }

    const offset = useRef(new Animated.Value(0)).current;
    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={[styles.container, {backgroundColor: colors.background}]}
          forceInset={{top: 'always'}}>
          <NewsImageAnimate offset={offset} image={image} />
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentScroll}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: offset}}}],
              {useNativeDriver: false},
            )}>
            <NewsSubHeader title={title} publishedDate={publishedDate} />
            <NewsWebview url={url} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }, [image]);

  return (
    <View style={styles.newPage}>
      <Header
        title="News"
        goBack={handleGoBack}
        rightIcon={SVG_SHARE}
        // TO-DO : Now comment this line because now not get share icon functionality.
        // rightFunction={() => alert('Hello')}
      />
      {renderNews()}
    </View>
  );
};
