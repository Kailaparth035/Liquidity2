import React, {FC, useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../../../assets';
import {
  IsAddedToWatchListState,
  SelectedAssetSheetState,
  UserWatchListState,
} from '../../../states';
import {styles} from './searchedRow.styles';
import {toast} from '../../../libs';
import {useNetwork} from '../../../hooks';
import {APIS} from '../../../constants';
import {useTabExplore, useWatchList} from '../../watchlist/hooks/get-watchlist';
import {ImageView} from '../../../storybook/image';
import {useTrackEvents} from '../../../helpers';
import {Routes} from '../../routes/constants';

interface IProps {
  row: any;
  type?: string;
  searched: string;
  isLoggedIn: boolean;
  navigation: any;
}

const WIDTH = 40;
const HEIGHT = 40;

const SearchedRow: FC<IProps> = ({row, searched, isLoggedIn, navigation}) => {
  const watchlist = useRecoilValue(UserWatchListState);
  const setIsAddedToWAtchlist = useSetRecoilState(IsAddedToWatchListState);
  const setSelectedSheet = useSetRecoilState(SelectedAssetSheetState);

  const [isInList, setIsInList] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const {patch} = useNetwork();
  const {getWatchList} = useWatchList();
  const {trackEvents} = useTrackEvents();
  const {colors} = useTheme();
  const {getTabAssets} = useTabExplore();

  const {name, symbol, image, type} = row;

  useEffect(() => {
    watchlist?.assets.forEach((asset: {symbol: string}) => {
      if (asset.symbol === symbol) {
        setIsInList(true);
      }
    });
  }, [searched, watchlist?.assets]);

  const handleAddToWatchlist = async () => {
    const payload = {
      assets: [
        {
          symbol: symbol,
          index: (watchlist?.assets.length ?? 0) + 1,
          type: type,
        },
      ],
    };
    setLoading(true);
    try {
      await patch(`${APIS.AddToWatchlist}${watchlist?._id}`, payload);
      setIsAddedToWAtchlist(preState => !preState);
      getTabAssets('watchlist');
      // await getWatchList(true);
      setLoading(false);
      setIsInList(true);
      toast('Added to list');
    } catch (err) {
      setLoading(false);
      toast('Having issue in connecting to server, might loose data');
    }
  };

  const onOpenDetails = () => {
    const {symbol, id} = row ?? {};
    const obj = {
      symbol,
      type,
      id,
    };
    trackEvents('search-assets-details', obj);
    setSelectedSheet(obj);
    navigation.navigate(Routes.AssetDetail);
  };

  return (
    <View style={styles.searchedContainer}>
      <TouchableOpacity onPress={onOpenDetails} style={styles.imageContainer}>
        {image && !isError ? (
          <ImageView
            source={{uri: image}}
            url={image}
            style={styles.image}
            alt={symbol?.[0] ?? ''}
          />
        ) : (
          <View
            style={[
              styles.loader,
              {backgroundColor: colors.headerCard},
              {width: WIDTH, height: HEIGHT},
            ]}>
            <Text style={styles.firstTxt}>{symbol?.[0] ?? ''}</Text>
          </View>
        )}
        <View style={styles.detailContainer}>
          <Text style={[styles.symbolTxt, {color: colors.text}]}>{symbol}</Text>
          <Text style={styles.nameTxt} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
      {isLoggedIn ? (
        <TouchableOpacity
          style={styles.actionContainer}
          onPress={handleAddToWatchlist}
          disabled={isInList || loading}>
          <View>
            {searched !== '' && loading ? (
              <ActivityIndicator size={20} />
            ) : isInList ? (
              <Icons
                name="done"
                color={COLORS['green']}
                style={styles.addIcon}
              />
            ) : (
              <Icons name="add" color={colors.text} style={styles.addIcon} />
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.actionContainer} />
      )}
    </View>
  );
};

export default SearchedRow;
