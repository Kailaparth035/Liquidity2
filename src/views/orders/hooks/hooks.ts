import {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import {useNetwork} from '../../../hooks';
import {APIS} from '../../../constants';
import {toast} from '../../../libs';
import {
  OpenAuctionBidState,
  OpenAuctionConfigState,
  OutbidAuctionBidState,
  OutbidAuctionConfigState,
  WonAuctionBidState,
  WonAuctionConfigState,
} from '../../../states/open-orders/states';

export const useGetAuctionBids = () => {
  const setOpenAuctionBids = useSetRecoilState(OpenAuctionBidState);
  const setOutbidAuctionBids = useSetRecoilState(OutbidAuctionBidState);
  const setWonAuctionBids = useSetRecoilState(WonAuctionBidState);
  const setOpenAuctionConfig = useSetRecoilState(OpenAuctionConfigState);
  const setOutbidAuctionConfig = useSetRecoilState(OutbidAuctionConfigState)
  const setWonAuctionConfig = useSetRecoilState(WonAuctionConfigState)
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  
  const {get} = useNetwork();

  const getAuctionList = async (type: string, offset = 0) => {
    if(!!offset) setIsPaginationLoading(true);
    else setIsLoading(true);
    return await get(
      `${APIS.auctionBid}?bidList=1&limit=20&offset=${offset}&bidType=${type}`,
    )
      .then(resp => {
        if (resp?.data) {          
          switch (type) {
            case 'outbid':
              if(!!offset){
                setOutbidAuctionConfig(offset);
                setOutbidAuctionBids((prev:any) => {
                  const newState = [...prev, ...resp.data];
                  return newState;
                })
              } else setOutbidAuctionBids(resp.data);
              break;
            case 'won':
              if(!!offset){
                setWonAuctionConfig(offset);
                setWonAuctionBids((prev:any) => {
                  const newState = [...prev, ...resp.data];
                  return newState;
                })
              } else setWonAuctionBids(resp.data);
              break;
            default:
              if(!!offset){
                setOpenAuctionConfig(offset);
                setOpenAuctionBids((prev:any) => {
                  const newState = [...prev, ...resp.data];
                  return newState;
                })
              } else setOpenAuctionBids(resp.data);
              break;
          }
        }
      })
      .catch(err => {
        console.log('ERRORRRRRRRR', err);
        toast('Somethings went wrong');
      })
      .finally(() => {
        setIsLoading(false);
        setIsPaginationLoading(false);
      });
  };
  return {getAuctionList, isLoading, isPaginationLoading};
};
