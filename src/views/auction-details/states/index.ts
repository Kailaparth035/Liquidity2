import {atom} from 'recoil';

export const auctionDetailsState = atom<any>({
  key: 'auction-Details-state',
  default: {},
});

export const latestBidsState = atom<any>({
  key: 'latest-bids-state',
  default: [],
});
export const AuctionDetalisLoaderState = atom<boolean>({
  key: 'auction-Details-loader-state',
  default: true,
});
