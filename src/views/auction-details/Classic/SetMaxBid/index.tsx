// @flow
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import StatusBlock from '../../../../views/auction-details/components/StatusBlock';
import {COLORS} from '../../../../assets';
import ScreenView from '../../../../views/auction-details/components/ScreenView';
import {useNetwork} from '../../../../hooks';
import {APIS} from '../../../../constants';
import {
  auctionDetailsState,
  AuctionDetalisLoaderState,
  latestBidsState,
} from '../../../../views/auction-details/states';
import {useCurrency} from '../../../../hooks/use-currency';
import {toast} from '../../../../libs';
import {AUCTION_TYPE} from '../../../../views/auction-details/comman/utility';

type SetMaxBidType = {
  navigation: any;
};

const SetMaxBid = ({navigation}: SetMaxBidType) => {
  const [AuctionDetails, setAuctionDetails] =
    useRecoilState(auctionDetailsState);
  const setAuctionDetailsLoader = useSetRecoilState(AuctionDetalisLoaderState);
  const setLatestBids = useSetRecoilState(latestBidsState);
  const {colors} = useTheme();
  const [maxBid, setMaxBid] = useState('');
  const [loader, setLoader] = useState(false);
  const {formatCurrency} = useCurrency();
  const {get, post} = useNetwork();

  const handleMaxBid = (val: string) => {
    setMaxBid(val);
  };
  const getApiCalls = () => {
    get(APIS.auction + '/' + AuctionDetails?.id)
      .then(res => {
        setAuctionDetails(res?.data);
        setAuctionDetailsLoader(false);
      })
      .catch(e => {
        setAuctionDetailsLoader(false);
        console.log('Error in auction Details=', e);
      });
    get(APIS.latestBidPriceByAuctionId + AuctionDetails?.id)
      .then(res => {
        setLatestBids(res?.data);
      })
      .catch(e => {
        console.log('Error in Latest bids=', e);
      });
  };
  const diableButton = () => {
    if (AuctionDetails?.tradeType === AUCTION_TYPE.CLASSIC) {
      return !(
        parseInt(maxBid) >=
        parseInt(AuctionDetails?.currentBidPrice + AuctionDetails?.stepPrice)
      );
    } else {
      return false;
    }
  };

  const confirmBid = () => {
    setLoader(true);
    let payload = {
      assetId: AuctionDetails?.assetId,
      auctionId: AuctionDetails?.id,
      isBuyNowPrice: false,
      maxBidPrice: parseInt(maxBid),
    };
    console.log(AuctionDetails?.tradeType, '--', payload);

    post(APIS.auctionBid, payload)
      .then(res => {
        if (res.message) {
          toast(res.message);
        } else {
          toast('Succefully Set MaX Budget');
        }
        getApiCalls();
        setLoader(false);
        navigation.goBack();
      })
      .catch(e => {
        toast(e?.message);
        console.log('Error in Bid', e);
        setLoader(false);
      });
  };
  console.log(
    maxBid == '' &&
      !(
        parseInt(maxBid) >=
        parseInt(AuctionDetails?.currentBidPrice + AuctionDetails?.stepPrice)
      ),
  );

  return (
    <ScreenView
      navigation={navigation}
      title="Set your maximum bid"
      iconName={'close'}>
      <View style={styles.parent}>
        <Text style={[styles.text, {color: colors.lightText}]}>
          {`Set your ${
            AuctionDetails?.tradeType === AUCTION_TYPE.CLASSIC
              ? 'maximum bid'
              : 'maximum budget'
          }. We will automatically bid for you until outbid,ensuring you secure the best deals!`}
        </Text>
        <View style={styles.blockContainer}>
          <View style={{flex: 1}}>
            <StatusBlock
              title="Current bid"
              value={formatCurrency(AuctionDetails?.currentBidPrice, 2)}
            />
            {AuctionDetails?.tradeType === AUCTION_TYPE.CLASSIC ? (
              <StatusBlock
                title="Your last bid"
                value={formatCurrency(AuctionDetails?.highestBidPrice, 2)}
              />
            ) : null}
          </View>
          <View style={{flex: 1}}>
            <StatusBlock
              title="Price step"
              value={formatCurrency(AuctionDetails?.stepPrice, 2)}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.headerText, {color: colors.text}]}>
            Maximum bid
          </Text>
          <View style={[styles.inputContainer, {borderColor: colors.border}]}>
            <TextInput
              placeholder="Enter an amount"
              placeholderTextColor={colors.lightText}
              value={maxBid}
              keyboardType={'number-pad'}
              style={[styles.inputStyle, {color: colors.text}]}
              onChangeText={val => {
                handleMaxBid(val);
              }}
            />
            <TouchableOpacity
              style={[styles.usdBtn, {backgroundColor: colors.ground}]}>
              <Text style={{color:colors.text}}>USD</Text>
            </TouchableOpacity>
          </View>
          {AuctionDetails?.tradeType === AUCTION_TYPE.CLASSIC ? (
            <Text style={[styles.msgText, {color: colors.text}]}>
              {`Enter bid greater than ${formatCurrency(
                parseFloat(AuctionDetails?.currentBidPrice) +
                  parseFloat(AuctionDetails?.stepPrice),
                2,
              )}`}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{}}>
        <TouchableOpacity
          disabled={diableButton()}
          onPress={() => {
            setLoader(true);
            confirmBid();
            setTimeout(() => {}, 3000);
          }}
          style={{
            backgroundColor: diableButton()
              ? 'rgba(69, 116, 245,.5)'
              : COLORS['primary-dark'],
            alignItems: 'center',
            borderRadius: 4,
          }}>
          {loader ? (
            <ActivityIndicator size={'large'} style={{padding: 6}} />
          ) : (
            <Text style={styles.btnText}>Confirm</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  actionBtn: {
    borderWidth: 1,
    borderRadius: 4,
    maxWidth: 114,
    paddingVertical: 12,
    paddingHorizontal: 47,
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  text: {fontSize: 12, lineHeight: 20, fontWeight: '500'},
  blockContainer: {marginTop: 20, flexDirection: 'row'},
  headerText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',

    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  usdBtn: {
    paddingVertical:Platform.OS == 'android' ? 2 : 4,
    paddingHorizontal: 8,
    borderRadius: 14,
    height:25,
    marginTop:Platform.OS == 'android' ? 10 : 0
  },
  msgText: {fontSize: 12, lineHeight: 16, fontWeight: '500', marginTop: 8},
  btnText: {
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS['white'],
  },
});
export default SetMaxBid;
