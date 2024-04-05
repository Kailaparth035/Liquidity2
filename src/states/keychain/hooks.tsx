import {useCallback, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import Keychain from 'react-native-keychain';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {KeyChainDataState} from '../login';
import {useNetwork} from '../../hooks';
import {ProfileDataState} from '..';
import {useWallet} from '../../hooks/use-wallet';
import {APIS, Storages} from '../../constants';
import {LinkListState, SelectedCurrencyState, SelectedLanguageState} from '../info';

export const useKeyChain = () => {
  const setProfileData = useSetRecoilState(ProfileDataState);
  const setKeyChainData = useSetRecoilState(KeyChainDataState);
  const setCurrency = useSetRecoilState(SelectedCurrencyState);
  const setLanguage = useSetRecoilState(SelectedLanguageState);
  const [userLoading, setUserLoading] = useState(false);
  const setLinkList = useSetRecoilState(LinkListState)

  const {getItem: getToken} = useAsyncStorage(Storages.Token);
  const {getItem: getMobileNumber} = useAsyncStorage(Storages.MobileNumber);
  const {setItem: setUserProfileStorage} = useAsyncStorage(
    Storages.UserProfile,
  );

  const {get} = useNetwork(false);
  const {generateWallet} = useWallet();

  const updateKeychain = useCallback(async (blockchain, mobileNumber) => {
    const wallet: any = await generateWallet(blockchain);
    const {publicKey: username, secret: password} = wallet ?? {};

    if (username && password) {
      const keychainValue = await Keychain.setGenericPassword(
        username,
        password,
        {
          service: `${mobileNumber}.${blockchain}`,
        },
      );
      if (keychainValue) {
        setKeyChainData((prev: any) => ({
          ...prev,
          [blockchain]: keychainValue,
        }));
      }
      return keychainValue;
    }
  }, []);

  const getKeyChainAccess = useCallback(async () => {
    const mobileNumber = (await getMobileNumber()) ?? '';
    try {
      // for Stellar
      let stellarCredentials: any = await Keychain.getGenericPassword({
        service: `${mobileNumber}.stellar`,
      });

      if (!stellarCredentials) {
        stellarCredentials = updateKeychain('stellar', mobileNumber);
      } else {
        setKeyChainData((prev: any) => ({
          ...prev,
          stellar: stellarCredentials,
        }));
      }

      // for Solana
      let solanaCredentials: any = await Keychain.getGenericPassword({
        service: `${mobileNumber}.solana`,
      });

      if (!solanaCredentials) {
        solanaCredentials = await Keychain.getGenericPassword({
          service: mobileNumber,
        });
      }

      if (!solanaCredentials) {
        stellarCredentials = updateKeychain('solana', mobileNumber);
      }

      if (solanaCredentials) {
        setKeyChainData((prev: any) => ({...prev, solana: solanaCredentials}));
      }
    } catch (error) {}
  }, [getMobileNumber, setKeyChainData]);

  const getProfileData = useCallback(() => {
    getToken().then(token => {
      if (token) {
        setUserLoading(true);
        get(APIS.Users).then(userData => {
          if (userData?.data) {
            setProfileData(userData.data);
            setUserProfileStorage(JSON.stringify(userData.data));
            if (userData?.data?.settings?.currency) {
              setCurrency(userData.data.settings.currency);
            }
          }
          setUserLoading(false);
        }).catch(err => {
          setUserLoading(false);
        });
      }
    });
  }, [get, getToken]);

  const getDevicesInfoApi = useCallback(() => {
    get(APIS.usersDeviceLogin).then(res => {
      if (res.data) {
        setLinkList(res.data)
      }
    });
  }, []);


  return {getKeyChainAccess, getProfileData, userLoading,getDevicesInfoApi};
};
