import {
  ProfileDataState,
  SelectedLanguageState,
  SelectedCurrencyState,
} from './../states/info/states';
import {UserWatchListState} from './../states/watch-list/states/watchlist';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {
  ApproveDataState,
  IsConnectState,
  IsUserLoginState,
  loginNumberState,
  SendDataState,
} from '../states';
import {Storages} from '../constants';
import {AccessTokenState} from './../states/user';

export const useLogout = () => {
  const setIsUserLogin = useSetRecoilState(IsUserLoginState);
  const setIsConnection = useSetRecoilState(IsConnectState);
  const setDefaultWatchlist = useSetRecoilState(UserWatchListState);

  const resetAccessToken = useResetRecoilState(AccessTokenState);
  const resetSendApproveData = useResetRecoilState(SendDataState);
  const resetApproveData = useResetRecoilState(ApproveDataState);
  const resetProfileData = useResetRecoilState(ProfileDataState);
  const resetLanguage = useResetRecoilState(SelectedLanguageState);
  const resetCurrency = useResetRecoilState(SelectedCurrencyState);

  const {removeItem: removeConnection} = useAsyncStorage(Storages.IsConnection);
  const {removeItem: removeApprove} = useAsyncStorage(Storages.ApprovedData);
  const {removeItem: removeSendToken} = useAsyncStorage(Storages.TokenSend);
  const {removeItem: removeTokenData} = useAsyncStorage(Storages.Token);
  const {removeItem: removeWatchlist} = useAsyncStorage(Storages.Watchlist);
  const {removeItem: removeExploreStorage} = useAsyncStorage(Storages.Explores);

  const logout = () => {
    removeApprove();
    resetApproveData();
    resetSendApproveData();
    resetAccessToken();
    removeTokenData();
    resetProfileData();
    removeWatchlist();
    removeExploreStorage();
    resetLanguage();
    resetCurrency();
    removeConnection(() => {
      setIsConnection(false);
    });
    setIsUserLogin(false);
    removeSendToken();
    setDefaultWatchlist(preState => {
      if (preState) {
        return {
          ...preState,
          name: 'watchlist1',
          assets: [],
        };
      }
    });
  };

  return {logout};
};
