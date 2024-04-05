import React, {useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import {newsPageStyles as styles} from './news-page.style';

const NewsSubHeader = ({title, publishedDate}: any) => {
  const {colors, dark} = useTheme();
  const getPublishedDate = useCallback(
    (date: string) => moment(date).format('DD MMM YYYY'),
    [],
  );

  const returnColor = useMemo(() => {
    const isDark = dark
      ? [
          'rgba(27, 28, 31, 0.6)',
          'rgba(27, 28, 31, 0.7)',
          'rgba(27, 28, 31, 0.8)',
        ]
      : [
          'rgba(225,225,225, 0.5)',
          'rgba(225,225,225, 0.6)',
          'rgba(225,225,225, 0.7 )',
        ];
    return isDark;
  }, [dark]);

  return (
    <View style={styles.newsImageContainer}>
      <LinearGradient colors={returnColor} style={styles.titleContainer}>
        <Text numberOfLines={3} style={[styles.title, {color: colors.text}]}>
          {title}
        </Text>
        <View style={styles.dateView}>
          <Text style={[styles.publishedDate, {color: colors.text}]}>
            {getPublishedDate(publishedDate)}
          </Text>
          <View style={[styles.dot, {backgroundColor: colors.text}]} />
          <Text style={[styles.publishedDate, {color: colors.text}]}>
            Reuters
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default NewsSubHeader;
