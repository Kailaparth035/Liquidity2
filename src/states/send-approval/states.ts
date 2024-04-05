import {atom} from 'recoil';

export const IsSendModalState = atom<boolean>({
  key: 'is-send-token-modal-state',
  default: false,
});

export const SendModalDetailsState = atom<any>({
  key: 'send-token-modal-state',
  default: {},
});
