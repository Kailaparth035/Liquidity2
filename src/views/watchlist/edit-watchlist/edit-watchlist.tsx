import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Header} from '../../../components';
import EditWatchlistFooter from './components/footer/edit-watchlist-footer';
import RenameWatchlist from './components/modal/rename-watchlist';
import Draggable from './components/draggable/draggable-list';
import {editWatchlistStyles as styles} from './edit-watchlist.styles';
import {useRecoilValue} from 'recoil';
import {UserWatchListState} from '../../../states';

export const EditWatchlist = ({navigation}: any) => {
  const watchlist = useRecoilValue(UserWatchListState);
  const {colors} = useTheme();

  const addKeys = watchlist?.assets?.map((asset, i) => ({
    ...asset,
    key: `${asset._id}_${i}`,
  }));

  const [editWatchlistName, setEditWatchlistName] = useState(watchlist?.name);
  const [dragWatchlist, setDragWatchlist] = useState(addKeys ?? []);
  const [deleteAssets, setDeleteAssets] = useState<string[]>([]);

  const deleteWatchlist = (_id: string) => {
    const clone = [...deleteAssets];
    clone.push(_id);
    setDeleteAssets(clone);
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header title="Edit watchlist" goBack={goBack} />
      <RenameWatchlist
        name={editWatchlistName}
        setEdit={setEditWatchlistName}
      />
      <Draggable
        dragWatchlist={dragWatchlist}
        setData={setDragWatchlist}
        deleteWatchlist={deleteWatchlist}
      />
      <EditWatchlistFooter
        dragWatchlist={dragWatchlist}
        navigation={navigation}
        editWatchlistName={editWatchlistName}
        deleteAssets={deleteAssets}
      />
    </View>
  );
};
