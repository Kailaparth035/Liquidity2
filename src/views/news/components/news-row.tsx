import React, {FC, useCallback, useMemo} from 'react';
import {Image, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import {useRecoilState, useRecoilValue} from 'recoil';

import {COLORS} from '../../../assets';
import {INews, isDarkModeState, NewsState} from '../../../states';
import {Loader} from '../../../storybook/loader';
import {SVG} from '../../../storybook/svg';
import {Routes} from '../../routes/constants';
import {newsStyle as styles} from './news.styles';
import {SVG_No_News} from '../../../assets/icon/svg/noNews';
import {SVG_No_News_Light} from '../../../assets/icon/svg/noNews-Light';
import {Default_News} from '../../../assets/images';

type Props = {
  name: string;
  navigation: any;
};

export const NewsRow: FC<Props> = ({name, navigation}) => {
  const news = useRecoilValue(NewsState);
  const {colors} = useTheme();

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  const isLoaded = !!Object.keys(news ?? {}).length;
  const selectedTypeNews: INews[] = useMemo(() => {
    if (name !== 'all') {
      return news?.[name]?.filter(news => news.text) ?? [];
    }
    let allNews: INews[] = [];
    Object.keys(news ?? {}).map(key => {
      allNews.push(...news[key]);
    });
    allNews = allNews.sort((a: any, b: any) => {
      const ADate = moment(a.publishedDate).valueOf();
      const BDate = moment(b.publishedDate).valueOf();
      return BDate - ADate;
    });
    return allNews.filter(news => news.text);
  }, [news]);

  const handleOpenNews = useCallback(
    (news: INews) => {
      navigation.navigate(Routes.NewsLetter, {news});
    },
    [navigation, Routes],
  );

  const newsRender = useMemo(() => {
    if (!isLoaded) {
      return <Loader />;
    }

    if (!selectedTypeNews.length) {
      return (
        <View style={styles.noNews}>
          <SVG
            name={isDarkMode === true ? SVG_No_News : SVG_No_News_Light}
            width={300}
            height={260}
          />
          <Text style={[styles.noNewsTxt, {color: colors.text}]}>
            No news found!
          </Text>
        </View>
      );
    }
    return selectedTypeNews?.map((news, index) => {
      const {image, text, publishedDate, site} = news;
      const date = moment(publishedDate).format('LL');
      return (
        <>
          {index === 0 ? (
            <View
              style={[
                styles.firstItemView,
                {borderBottomColor: colors.border},
              ]}>
              {image ? (
                <Image source={{uri: image}} style={styles.imageStyle} />
              ) : (
                <View style={styles.withoutImageView}>
                  <Image
                    source={Default_News}
                    style={[styles.newsImage, {backgroundColor: colors.box}]}
                    resizeMode="cover"
                  />
                </View>
              )}
              <Text
                numberOfLines={2}
                style={[
                  styles.headline,
                  {color: colors.text, marginHorizontal: 15, marginTop: 10},
                ]}>
                {text}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    marginHorizontal: 15,
                    marginTop: 10,
                  },
                ]}
                numberOfLines={2}>
                {text}
              </Text>
              <View style={styles.foterDetailsView}>
                <View style={styles.footerView}>
                  <Text style={styles.date}>{date}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.location}>{site}</Text>
                </View>
                <Text
                  onPress={() => handleOpenNews(news)}
                  style={styles.readFullArticleText}>
                  Read full article
                </Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity key={index} onPress={() => handleOpenNews(news)}>
              <View style={[styles.newsCard,{borderBottomColor:colors.border}]}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={[styles.newsImage, {backgroundColor: colors.box}]}
                    resizeMode="center"
                  />
                ) : (
                  <Image
                    source={Default_News}
                    style={[styles.newsImage, {backgroundColor: colors.box}]}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.news}>
                  <Text
                    numberOfLines={2}
                    style={[styles.headline, {color: colors.text}]}>
                    {text}
                  </Text>
                  <View style={styles.newsFooter}>
                    <Text style={[styles.date]}>{date}</Text>
                    <View style={[styles.dot]} />
                    <Text style={styles.location}>{site}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </>
      );
    });
  }, [isLoaded, selectedTypeNews, colors]);

  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <View style={{flex: 0.9}}>
        <ScrollView>{newsRender}</ScrollView>
      </View>
    </View>
  );
};
