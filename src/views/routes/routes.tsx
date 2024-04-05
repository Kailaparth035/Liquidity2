import React, {useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Login from '../login';
import {
  AccessTokenState,
  IsUserLoginState,
  ProfileDataState,
} from '../../states';
import TransactionDetails from '../transaction/transaction-details';
import TokenDetails from '../portfolio/components/token-details';
import {Routes} from './constants';
import {Storages} from '../../constants';
import BalanceDetails from '../wallet-details';
import Request from '../request';
import {Search} from '../search/search';
import {NewsPage} from '../news-page';
import LandingPage from '../landing';
import {EditWatchlist} from '../watchlist';
import {AssetDetails} from '../asset-details';
import {BuySell} from '../buy-sell';
import {MyProfile} from '../profile/components/my-profile';
import {OnwerDetails, Profile} from '../profile';
import {MintedAssets} from '../profile/components/minted-assets';
import {BankAccounts} from '../profile/components/bank-accounts';
import {Cards} from '../profile/components/cards';
import Transactions from '../transaction';
import {Setting} from '../settings';
import {Onboarding} from '../onboarding';
import {QrScanner} from '../profile';
import {Privacy} from '../privacy';
import KycPage from '../../views/kyc/KycPage';
import KycDetailPage from '../../views/kyc/KycDetailPage';
import {SplashScreen} from '../../views/splash-screen';
import AddFunds from '../../views/add-funds';
import SelectBank from '../../views/select-bank';
import EmailVerifyScreen from '../../views/email-verify/EmailVerifyScreen';
import {CoOwners} from '../profile';
import {AuthUsers} from '../profile/components/auth-users';
import depositScreen from '../../views/deposit/depositScreen';
import AddFundProcessing from '../../views/addFundProcessing/addFundProcessing';
import WalletTransactions from '../../views/wallet-transaction';
import WalletTransactionsDetails from '../../views/wallet-transaction/wallet-transaction-Details';
import Notification from '../../views/notification';
import {RemoveCoOwner} from '../../views/profile/components/co-owners/components/remove-co-owner';
import WireDeposite from '../../views/wire-deposite';
import WireWithdraw from '../../views/wire-withdraw';
import AddNewaccountDeposite from '../../views/addnewaccount-deposite';

import KycCheck from '../../views/kyc/KycCheck';
import kycReview from '../../views/kyc/kycReview';
import SuccessRejected from '../../views/kyc/successRejected';
import KybReview from '../../views/kyc/KybReview';
import UnderReview from '../../views/kyc/UnderReview';
import kycKybReview from '../../views/kyc/kycKybReview';
import NumberVerified from '../../views/number-verified';
import WebAuthentication from '../../views/web-authentication';
import ManageCoOwner from '../../views/profile/components/co-owners/components/manage-co-owner/ManageCoOwner';
import EditRemovalRequest from '../../views/profile/components/co-owners/components/manage-co-owner/EditRemovalRequest';
import {Auction} from '../../views/auction';
import AuctionDetails from '../../views/auction-details/AuctionDetails';
import BidSheet from '../../views/auction-details/BidSheet';
import LatestBids from '../../views/auction-details/LatestBids';
import AuctionBidding from '../../views/auction-details/Classic/AuctionBidding';
import SetMaxBid from '../../views/auction-details/Classic/SetMaxBid';
import SearchScreen from '../../views/auction-details/Classic/SearchScreen';
import BuyAuction from '../../views/auction-details/Classic/BuyAuction';

export const RoutesComponent = () => {
  const [isUserLogin, setIsUserLogin] = useRecoilState(IsUserLoginState);
  const {getItem: getToken} = useAsyncStorage(Storages.Token);
  const userDetails = useRecoilValue(ProfileDataState);
  const setToken = useSetRecoilState(AccessTokenState);
  const [isLoading, setIsLoading] = useState(true);

  const Stack = createNativeStackNavigator();

  const getData = useCallback(() => {
    getToken()
      .then((data: any) => {
        if (data) {
          setToken(data);
          setIsUserLogin(data);
        } else {
          setIsUserLogin(false);
        }
      })
      .catch(err => {
        setIsUserLogin(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [getToken, setIsUserLogin]);

  useEffect(() => {
    if (!isUserLogin) {
      setTimeout(() => {
        getData();
      }, 3000);
    }
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <Stack.Navigator>
      {isUserLogin ? (
        <>
          <Stack.Screen
            name={Routes.Home}
            component={LandingPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.TransactionDetails}
            component={TransactionDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.TokenDetails}
            component={TokenDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.BalanceDetails}
            component={BalanceDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Request}
            component={Request}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Search}
            component={Search}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.EditWatchlist}
            component={EditWatchlist}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AssetDetail}
            component={AssetDetails}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={Routes.NewsLetter}
            component={NewsPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.BuySell}
            component={BuySell}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Profile}
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.MyProfile}
            component={MyProfile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.MintedAssets}
            component={MintedAssets}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.BankAccounts}
            component={BankAccounts}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WireDeposite}
            component={WireDeposite}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WireWithdraw}
            component={WireWithdraw}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.Cards}
            component={Cards}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Transactions}
            component={Transactions}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={Routes.NumberVerified}
            component={NumberVerified}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WebAuthentication}
            component={WebAuthentication}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Settings}
            component={Setting}
            options={{headerShown: false, gestureEnabled: false}}
          />
          <Stack.Screen
            name={Routes.Onboarding}
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.QrScanner}
            component={QrScanner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Privacy}
            component={Privacy}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.KycPage}
            component={KycPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.KycForm}
            component={KycDetailPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.KycCheck}
            component={KycCheck}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.kycKybReview}
            component={kycKybReview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.kycReview}
            component={kycReview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.UnderReview}
            component={UnderReview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.kybReview}
            component={KybReview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.SuccessRejected}
            component={SuccessRejected}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.DepositScreen}
            component={depositScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AddFundProcessing}
            component={AddFundProcessing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AddNewaccountDeposite}
            component={AddNewaccountDeposite}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AddFunds}
            component={AddFunds}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.SelectBank}
            component={SelectBank}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.EmailVerifyScreen}
            component={EmailVerifyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WalletTransactions}
            component={WalletTransactions}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WalletTransactionsDetails}
            component={WalletTransactionsDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.CoOwners}
            component={CoOwners}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.CoOwnersDetails}
            component={OnwerDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AuthUsers}
            component={AuthUsers}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.Notification}
            component={Notification}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.RemoveCoOwner}
            component={RemoveCoOwner}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.ManageCoOwner}
            component={ManageCoOwner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.EditRemovalRequest}
            component={EditRemovalRequest}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AuctionList}
            component={Auction}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AuctionDetails}
            component={AuctionDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.BidSheet}
            component={BidSheet}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.LatestBids}
            component={LatestBids}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.AuctionBidding}
            component={AuctionBidding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.SetMaxBid}
            component={SetMaxBid}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.SearchScreen}
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.BuyAuction}
            component={BuyAuction}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={Routes.Login}
            component={Login}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={Routes.Onboarding}
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.NumberVerified}
            component={NumberVerified}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={Routes.WebAuthentication}
            component={WebAuthentication}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
