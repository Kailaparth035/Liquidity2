import {atom} from 'recoil';
import {IAccount, IOwner, IOwnerDetails} from './types';

export const CoOwnersState = atom<IAccount[] | IOwner[] | []>({
  key: 'co-owners-state',
  default: [],
});

export const CoOwnersDetailsState = atom<IOwnerDetails | {}>({
  key: 'co-owners-details-state',
  default: {},
});

export const FellowOwnersState = atom<any>({
  key: 'fellow-owners-state',
  default: [],
});

export const selectedAuthUserState = atom<any>({
  key: 'selected-auth-user-state',
  default: {},
});

export const isOtherAccountState = atom<boolean>({
  key: 'is-other-account-state',
  default: false,
});
export const DocumentDetails = atom<any>({
  key: 'Document-Details-state',
  default: [],
});
