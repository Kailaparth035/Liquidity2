import {atom} from 'recoil';

export const AppleUserDataState = atom<any>({
  key: 'apple-id-connect-data',
  default: [],
});