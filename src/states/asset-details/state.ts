import {IAllSelectedAssests} from '.';
import {atom} from 'recoil';
import {ISelectedMusicAssets} from './type';

export const SelectedAssetDetailsState = atom<IAllSelectedAssests>({
  key: 'selected-asset-details',
  default: {},
});
export const SelectedMusicAssetDetailsState = atom<ISelectedMusicAssets>({
  key: 'selected-Music-asset-details',
  default: {},
});

export const ChartToggleState = atom<'line' | 'candle'>({
  key: 'chart-toggle-state',
  default: 'line',
});
