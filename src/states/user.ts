import {atom} from 'recoil';

export const IosAppActiveState = atom({
  key: 'ios-app',
  default: '',
});


export const AccessTokenState = atom({
  key: 'user-access-token',
  default: '',
});

