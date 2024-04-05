import React, {useCallback, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

import {APIS, Storages} from '../../../../../constants';
import {useNetwork} from '../../../../../hooks';
import {Loader} from '../../../../../storybook/loader';
import {Routes} from '../../../../routes/constants';
import {InitialRouteNameState, UserWatchListState} from '../../../../../states';
import {editWatchlistFooterStyles as styles} from './edit-watchlist-footer.styles';

const EditWatchlistFooter = ({
  dragWatchlist,
  navigation,
  editWatchlistName,
  deleteAssets,
}: any) => {
  const setRouteName = useSetRecoilState(InitialRouteNameState);
  const [watchlist, setWatchlist] = useRecoilState(UserWatchListState);

  const {setItem: setWatchlistStorage} = useAsyncStorage(Storages.Watchlist);

  const [isLoader, setIsLoader] = useState(false);
  const {colors} = useTheme();

  const {patch} = useNetwork();

  const onCancel = useCallback(() => {
    navigation.navigate(Routes.Home);
  }, [navigation]);

  const onSave = useCallback(() => {
    setIsLoader(true);
    const indexes = dragWatchlist.map(({_id}: any, idx: number) => ({
      index: idx + 1,
      asset: _id,
    }));

    let Obj: any = {
      //commented due to facing issue in api call
      // indexes,
      name: editWatchlistName,
    };
    if (deleteAssets?.length > 0) {
      Obj.deleteAssets = deleteAssets;
    }

    patch(`${APIS.WatchLists}/${watchlist?._id}`, Obj).then(res => {
      setRouteName(editWatchlistName);
      const payload = {
        name: editWatchlistName,
        assets: dragWatchlist,
      };
      setWatchlist((prev: any) => ({
        ...prev,
        ...payload,
      }));
      setWatchlistStorage(JSON.stringify(payload));
      navigation.navigate(Routes.Home);
      setIsLoader(false);
    });
  }, [navigation, watchlist?._id, dragWatchlist, editWatchlistName]);

  return (
    <View style={[styles.container, {backgroundColor: colors.ground}]}>
      <TouchableOpacity
        style={[styles.cancelBtn, {backgroundColor: colors.box}]}
        onPress={onCancel}>
        <Text style={[styles.cancelTxt, {color: colors.text}]}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveBtn}
        disabled={isLoader}
        onPress={onSave}>
        {isLoader ? (
          <Loader top={0} size={'small'} />
        ) : (
          <Text style={styles.saveTxt}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditWatchlistFooter;
