import {atom} from 'recoil';

export const IsLogoutState = atom<boolean>({
  key: 'is-logout-modal',
  default: false,
});
