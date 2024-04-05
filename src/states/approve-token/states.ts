import {atom} from 'recoil';

export const IsApproveModalState = atom<boolean>({
  key: 'is-create-approve-token-modal-state',
  default: false,
});

export const CreateModalDetailsState = atom<any>({
  key: 'create-token-modal-state',
  default: {},
});

export const IsFirebaseOpenState = atom<boolean>({
  key: 'is-firebase-open-state',
  default: false,
});
