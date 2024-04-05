import {atom} from 'recoil';
import {BankAccountType} from '../../views/profile/components/bank-accounts/types';

export const selectedBankAcount = atom<BankAccountType | null>({
  key: 'selected-bank-account',
  default: null,
});
