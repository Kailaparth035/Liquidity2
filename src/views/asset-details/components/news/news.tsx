import React, {FC, useCallback, useMemo} from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {NO_NEWS} from '../../../../constants';
import {Routes} from '../../../routes/constants';
import {INews, SelectedAssetDetailsState} from '../../../../states';
import {useTheme} from '@react-navigation/native';
import {newsStyle as styles} from './news.style';

interface INewsPage {
  symbol: string;
  assetType: string;
  navigation: any;
}

export const News: FC<INewsPage> = ({symbol, navigation}) => {
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const {colors} = useTheme();

  const {news} = useMemo(
    () => assetDetails[symbol] ?? {},
    [assetDetails, symbol],
  );

  const openNews = useCallback(
    (news: INews) => {
      navigation.navigate(Routes.NewsLetter, {news});
    },
    [navigation, Routes],
  );

  const mapedNews = useMemo(() => {
    return news?.map(
      ({image, publishedDate, site, symbol, text, title, url}, index) => (
        <TouchableOpacity
          key={`${url}-${index}`}
          style={styles.newsCard}
          onPress={() =>
            openNews({image, publishedDate, site, text, title, symbol, url})
          }>
          {image ? (
            <Image
              source={{uri: image}}
              style={styles.newsImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>{symbol?.[0] ?? ""}</Text>
            </View>
          )}

          <View style={styles.news}>
            <Text
              style={[styles.headline, {color: colors.text}]}
              numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.newLocation}>
              <Text style={styles.date}>
                {moment(publishedDate).format('MMM DD, YYYY')}{' '}
                {moment(publishedDate).format('h:mm:ss A')}
              </Text>
              <View style={styles.dot} />
              <Text style={styles.location} numberOfLines={1}>{site}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ),
    );
  }, [news]);

  return (
    <View style={styles.newsContainer}>
      {news?.length === 0 ? (
        <Text style={[styles.noNews, {color: colors.text}]}>{NO_NEWS}</Text>
      ) : (
        <ScrollView>{mapedNews}</ScrollView>
      )}
    </View>
  );
};
