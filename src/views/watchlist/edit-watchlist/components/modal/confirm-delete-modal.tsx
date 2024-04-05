import React, {useCallback, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';

import {APIS} from '../../../../../constants';
import {useNetwork} from '../../../../../hooks';
import {
  IsDeleteWatchlistState,
  UserWatchListState,
  WatchListState,
} from '../../../../../states';
import {Loader} from '../../../../../storybook/loader';
import {Modal} from '../../../../../storybook/modal';

import {Routes} from '../../../../routes/constants';
import {confirmDeleteModalStyles as styles} from './confirm-delete-modal.styles';

interface IConfirmDeleteModal {
  navigation: any;
}

const ConfirmDeleteModal = ({navigation}: IConfirmDeleteModal) => {
  const [isOpen, setIsOpen] = useRecoilState(IsDeleteWatchlistState);
  const [watchlists, setWatchlists] = useRecoilState(WatchListState);
  const watchlist = useRecoilValue(UserWatchListState);

  const [isLoader, setIsLoader] = useState(false);
  const {remove} = useNetwork();

  const deleteWatchList = useCallback(() => {
    setIsLoader(true);
    const clone = [...watchlists];
    const foundIdx = clone.findIndex(watchlist => watchlist._id === id);
    remove(`${APIS.WatchLists}/${watchlist?._id}`).then(res => {
      if (foundIdx >= 0) {
        clone.splice(foundIdx, 1);
        setWatchlists(clone);
      }
      setIsOpen(false);
      navigation.navigate(Routes.Home);
      setIsLoader(false);
    });
  }, [watchlist?._id, watchlists, navigation]);

  return (
    <Modal isModal={isOpen} setIsModal={setIsOpen}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.deleteLabel}>Delete {watchlist?.name}</Text>
          <Text style={styles.deleteDesc}>
            Deleting will permanently remove it from the watchlist. This can’t
            be undone.
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setIsOpen(false)}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <View style={styles.footerLine} />
            <TouchableOpacity
              style={styles.deleteBtn}
              disabled={isLoader}
              onPress={deleteWatchList}>
              {isLoader ? (
                <Loader top={0} size={'small'} />
              ) : (
                <Text style={styles.deleteTxt}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDeleteModal;
