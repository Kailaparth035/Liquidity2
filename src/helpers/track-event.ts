import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';
import {useAnalytics} from '@segment/analytics-react-native';

import {ENVIRONMENT} from '../constants';
import {ProfileDataState} from './../states/info/states';
import {useLoginAuth} from './../views/routes/hooks/use-login-auth';

type EVENTS =
  | 'home'
  | 'home-watchlist'
  | 'home-stocks'
  | 'home-crypto'
  | 'home-privates'
  | 'home-commodities'
  | 'home-forex'
  | 'home-request'
  | 'home-assets-details'
  | 'search-assets-details'
  | 'watchlist-search'
  | 'watchlist-edit'
  | 'news'
  | 'news-all'
  | 'news-stocks'
  | 'news-crypto'
  | 'news-forex'
  | 'news-commodities'
  | 'news-details'
  | 'transaction'
  | 'transaction-all'
  | 'transaction-memo-details'
  | 'portfolio'
  | 'portfolio-all'
  | 'portfolio-stocks'
  | 'portfolio-crypto'
  | 'portfolio-privates'
  | 'portfolio-commodities'
  | 'portfolio-forex'
  | 'profile'
  | 'profile-myProfile'
  | 'profile-minted-assets'
  | 'profile-myWallet'
  | 'profile-bank-account'
  | 'profile-cards'
  | 'profile-transactions'
  | 'profile-connect-apple-id'
  | 'profile-setting'
  | 'profile-logout'
  | 'login-number'
  | 'verify-otp';

export const useTrackEvents = () => {
  const {track} = useAnalytics();
  const profileData = useRecoilValue(ProfileDataState);
  const {isLoggedIn} = useLoginAuth();

  const user = useMemo(() => {
    const profile = JSON.parse(JSON.stringify(profileData ?? {}));
    // delete profile.userKycProviderData;
    // delete profile.kycResult;
    return profile;
  }, [profileData]);

  const trackEvents = (eventName: EVENTS, properties: any) => {
    try {
      if (ENVIRONMENT.isProduction) {
        track(eventName, {...properties, user, isLoggedIn});
      }
    } catch (error) {}
  };

  return {trackEvents};
};
