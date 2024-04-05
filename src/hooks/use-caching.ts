import {useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {Storages} from '../constants';
import {
  ExploresState,
  NewsState,
  ProfileDataState,
  UserWatchListState,
} from '../states';

export const useCaching = () => {
  const {getItem: userProfile} = useAsyncStorage(Storages.UserProfile);
  const {getItem: watchlistStorage} = useAsyncStorage(Storages.Watchlist);
  const {getItem: exploreStorage} = useAsyncStorage(Storages.Explores);
  const {getItem: newsStorage} = useAsyncStorage(Storages.News);

  const setNews = useSetRecoilState(NewsState);
  const setExplores = useSetRecoilState(ExploresState);
  const setWatchlist = useSetRecoilState(UserWatchListState);
  const setProfileData = useSetRecoilState(ProfileDataState);

  const getLocalStorageData = async () => {
    const localUserProfile: any = await userProfile();
    const _localUserProfile = JSON.parse(localUserProfile);
    if (_localUserProfile) {
      setProfileData(_localUserProfile);
    }
    const localWatchlist: any = await watchlistStorage();
    const _localWatchlist = JSON.parse(localWatchlist);
    setWatchlist(_localWatchlist);

    const localExplores: any = await exploreStorage();
    const _localExplores = JSON.parse(localExplores);
    setExplores(_localExplores);

    const localNews: any = await newsStorage();
    const _localNews = JSON.parse(localNews);
    setNews(_localNews);
  };

  const fetchCachingData = () => {
    getLocalStorageData();
  };

  return {fetchCachingData};
};
