import {Routes} from '../../routes/constants';
import {
  Svg_Apple,
  Svg_Bank,
  Svg_Card,
  Svg_Logout,
  Svg_Minted_Assets,
  Svg_Profile_Line,
  Svg_Setting,
  Svg_Transaction,
  Svg_Wallet_Line,
  Svg_Scan,
  Svg_Co_Owner,
} from '../../../assets';
import {useRecoilValue} from 'recoil';
import {SelectedLanguageState} from '../../../states';

export const ProfileConstants = () => {
  const language = useRecoilValue(SelectedLanguageState);

  const {
    my_profile,
    my_wallet,
    minted_assets,
    co_owner,
    bank_accounts,
    cards,
    transactions,
    connect_with_apple_id,
    settings,
    logout,
    privacy_notice
  } = language?.profile?.topNav ?? {};

  const PROFILE_ACTIONS = [
    {
      title: 'profileView',
      disabled: false,
      icon: '',
      track: 'profile-page',
    },
    {
      title: my_profile ?? 'My Profile',
      disabled: false,
      icon: Svg_Profile_Line,
      route: Routes.MyProfile,
      track: 'profile-myProfile',
    },
    {
      title: my_wallet ?? 'My Wallet',
      disabled: false,
      icon: Svg_Wallet_Line,
      route: Routes.BalanceDetails,
      track: 'profile-myWallet',
    },
    {
      title: minted_assets ?? 'Minted Assets',
      disabled: false,
      icon: Svg_Minted_Assets,
      route: Routes.MintedAssets,
      track: 'profile-minted-assets',
    },
    {
      title: co_owner ?? 'Co-owner/Authorised User',
      disabled: false,
      icon: Svg_Co_Owner,
      route: Routes.CoOwners,
      track: 'profile-minted-assets',
    },
    // {
    //   title: bank_accounts ?? 'Bank Accounts',
    //   disabled: false,
    //   icon: Svg_Bank,
    //   route: Routes.BankAccounts,
    //   track: 'profile-bank-account',
    // },
    // {
    //   title: cards ?? 'Cards',
    //   disabled: false,
    //   icon: Svg_Card,
    //   route: Routes.Cards,
    //   track: 'profile-cards',
    // },
    {
      title: transactions ?? 'Transactions',
      disabled: false,
      icon: Svg_Transaction,
      route: Routes.Transactions,
      track: 'profile-transactions',
    },
    {
      title: connect_with_apple_id ?? 'Connect with Apple Id',
      disabled: false,
      icon: Svg_Apple,
      track: 'profile-connect-apple-id',
    },
   
    {
      title: 'Linked Devices',
      disabled: false,
      icon: Svg_Scan,
      route: Routes.QrScanner,
      track: 'linked-devices',
    },
    {
      title: privacy_notice ?? 'Privacy Notice',
      disabled: false,
      icon: Svg_Card,
      route: Routes.Privacy,
      track: 'privacy',
    },
    {
      title: settings ?? 'Settings',
      disabled: false,
      route: Routes.Settings,
      icon: Svg_Setting,
      track: 'profile-setting',
    },
    {
      title: logout ?? 'Logout',
      disabled: false,
      icon: Svg_Logout,
      track: 'profile-logout',
    },
  ];

  return {PROFILE_ACTIONS};
};
