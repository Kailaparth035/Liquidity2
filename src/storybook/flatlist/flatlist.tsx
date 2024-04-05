import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  FlatListProps,
  RefreshControl,
} from 'react-native';
import {COLORS} from '../../assets';
import { useTheme } from '@react-navigation/native';

interface IProps extends FlatListProps<any> {
  hideRefresh?: boolean;
  reload?: () => void | any;
}

export const FlatListScroll = ({
  data,
  renderItem,
  style,
  reload,
  hideRefresh = false,
  ...rest
}: IProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {colors} = useTheme()

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      if (reload) reload();
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={style || styles.container}>
      {hideRefresh ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          {...rest}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
          {...rest}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    // marginTop: StatusBar.currentHeight || 0,
  },
});
