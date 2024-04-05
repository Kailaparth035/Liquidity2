import {atom} from 'recoil';

export type INavigate = 'home' | 'portfolio' | 'transaction' | 'request';

export const NavigateState = atom<INavigate>({
  key: 'navigate-bottom',
  default: 'home',
});