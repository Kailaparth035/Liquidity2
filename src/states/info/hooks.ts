import {APIS} from './../../constants/api';
import {useCallback, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState, useRecoilState} from 'recoil';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {IsInfoLoaderState, AssetsState} from './states';
import {useNetwork} from './../../hooks';
import {
  KeyChainDataState,
  InfoDataState,
  IsConnectState,
  IsModalOpenState,
  InfoState,
} from './../login';
import {ProfileDataState} from '.';
import {Storages} from './../../constants';
import {IsApproveModalState} from '../approve-token';

export const useInfo = (type?: string, channelName?: string) => {
  const keyChainData = useRecoilValue(KeyChainDataState);
  const [, setAllInfo] = useRecoilState(InfoState);
  const [info, setInfoData] = useRecoilState(InfoDataState);
  const setIsLoader = useSetRecoilState(IsInfoLoaderState);
  const {setItem} = useAsyncStorage(Storages.IsConnection);
  const {post} = useNetwork();
  const setIsConnection = useSetRecoilState(IsConnectState);
  const {getItem} = useAsyncStorage(Storages.MobileNumber);
  const setModalVisible = useSetRecoilState(IsModalOpenState);
  const profileData = useRecoilValue(ProfileDataState);
  const setAssets = useSetRecoilState(AssetsState);
  const setIsApproveModal = useSetRecoilState(IsApproveModalState);

  const {get} = useNetwork();
  const {get: getAssets, data: assetsData} = useNetwork();
  const {patch: patchSolanaAddress} = useNetwork();
  const {patch: patchStellarAddress} = useNetwork();
  const {post: postKeys} = useNetwork(false);

  useEffect(() => {
    if (assetsData) {
      setAssets(assetsData);
    }
  }, []);

  const fetchInfoData = useCallback(async () => {
    // Deprecated. TODO: @awadhesh to remove
    try {
      const res = await get(APIS.Info);
      if (
        res?.data &&
        Object.keys(res.data)?.length > 0 &&
        res.data.stellar.balance !== info.stellar.balance
      ) {
        setInfoData(res.data);
      }
      if (profileData?.id) {
        await getAssets(APIS.TokensUserId + profileData.id);
      }

      const allInfo = await get(APIS.Info);

      const data = allInfo?.data;
      if (data && Object.keys(data)?.length) {
        if (!data?.solana?.address && profileData?.id) {
          await patchSolanaAddress(`${APIS.Users}/${profileData.id}`, {
            solanaAddress: keyChainData?.solana?.username,
          });
        }
        if (!data?.stellar?.address && profileData?.id) {
          await patchStellarAddress(`${APIS.Users}/${profileData.id}`, {
            stellarAddress: keyChainData?.stellar?.username,
          });
        }
        setAllInfo(data);

        try {
          if (
            keyChainData?.solana?.password &&
            keyChainData?.stellar?.password
          ) {
            postKeys(APIS.WalletKey, {
              solana: keyChainData.solana.password,
              stellar: keyChainData.stellar.password,
            });
          }
        } catch (error) {}
      }

      if (profileData?.id) {
        await getAssets(APIS.TokensUserId + profileData.id);
      }
    } catch (error) {}
  }, [get, keyChainData, setInfoData, setIsLoader, profileData, info]);

  const updateEvent = useCallback(
    async ({auth, nonce, blockchain = 'solana'}: any) => {
      try {
        if (profileData?.id) {
          let data: any = {
            approved: auth,
            userId: profileData.id,
            blockchain,
          };
          if (nonce) {
            data.nonce = nonce;
          }

          if (auth && !type) {
            data = {
              ...data,
              publicKey: keyChainData?.[blockchain]?.username,
              userId: profileData.id,
            };
          }
          if (auth && type) {
            data = {
              ...data,
              secret: keyChainData?.[blockchain]?.password,
            };
          }

          const phone = await getItem();
          const obj = {
            channelName:
              channelName ?? (type === 'create' ? 'tokens' : 'users'),
            eventName:
              auth || type === 'create'
                ? `${phone}:permission`
                : `${phone}:disconnect`,
            data,
          };

          post(APIS.Events, obj).then((res: any) => {
            if (res.success) {
              if (auth) {
                setItem('true');
                setIsConnection(true);
              }
              setModalVisible(false);
              setIsApproveModal(false);
            }
          });
        }
      } catch (error) {}
    },
    [
      getItem,
      keyChainData,
      post,
      setIsConnection,
      setItem,
      setModalVisible,
      type,
      profileData?.id,
    ],
  );

  return {fetchInfoData, updateEvent};
};
