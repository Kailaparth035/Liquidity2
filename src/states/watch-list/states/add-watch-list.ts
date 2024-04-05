import {atom} from 'recoil';

interface IPerDay {
  value: number;
  time: number;
}
export interface IAsset {
  _id: string;
  change: any;
  image: string;
  index: number;
  marketPrice: any;
  name: string;
  symbol: string;
  type: string;
  perDay: IPerDay[];
}

export interface ICurrentWatchList {
  _id: string;
  name: string;
  assets: IAsset[]
}

export const CurrentWatchList = atom<ICurrentWatchList[]>({
  key: 'currently-selected-watchlist',
  default: [],
});
