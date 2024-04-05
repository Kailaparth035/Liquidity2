// @flow
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  Auction_Image,
  Clock_Image,
  Congrats_Image,
} from '../../../../assets/images';
import StatusBlock from '../../../../views/auction-details/components/StatusBlock';
import {COLORS} from '../../../../assets';
import ScreenView from '../../../../views/auction-details/components/ScreenView';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  auctionDetailsState,
  AuctionDetalisLoaderState,
  latestBidsState,
} from '../../../../views/auction-details/states';
import {useCurrency} from '../../../../hooks/use-currency';
import {useNetwork} from '../../../../hooks';
import {APIS} from '../../../../constants';
import moment from 'moment';
import {
  AUCTION_TYPE,
  calculateRemainingTimeBySec,
  timeConverter,
} from '../../../../views/auction-details/comman/utility';
import {toast} from '../../../../libs';

type AuctionBiddingType = {
  navigation: any;
};

const AuctionBidding = ({navigation}: AuctionBiddingType) => {
  const [AuctionDetails, setAuctionDetails] =
    useRecoilState(auctionDetailsState);
  const {
    maxAuctionBidPrice,
    currentBidPrice,
    userBidPrice,
    stepPrice,
    totalBid,
    name,
    assetIcon,
    tradeType,
    symbol,
    symbolValue,
    endTime,
    dutchPriceUpdateTime,
    timeStepMinutes,
  } = AuctionDetails ?? {};
  const setLatestBids = useSetRecoilState(latestBidsState);
  const [AuctionDetailsLoader, setAuctionDetailsLoader] = useRecoilState(
    AuctionDetalisLoaderState,
  );
  const {colors} = useTheme();
  const [count, setCount] = useState(totalBid ? 1 : 0);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [time, setTime] = useState({});
  const [dutchTime, setDutchTime] = useState({});
  const [dutchsec, setDutchSec] = useState(0);
  const {formatCurrency} = useCurrency();
  const {get, post} = useNetwork();
  var ref = useRef<any>(null);
  var dutchRef = useRef<any>(null);
  const yourBid = useMemo(() => {
    return currentBidPrice + count * stepPrice;
    // setYourBid(myPrice);
  }, [count, stepPrice]);
  const handlePrice = () => {};
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    let leftSeconds = moment(endTime).diff(moment(), 'seconds');
    increace(leftSeconds);

    return () => clearTimeout(ref.current);
  }, [endTime]);

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
  const confirmBid = () => {
    setLoading(true);
    let payload = {
      assetId: AuctionDetails?.assetId,
      auctionId: AuctionDetails?.id,
      isBuyNowPrice: false,
      bidPrice: parseInt(yourBid),
    };

    post(APIS.auctionBid, payload)
      .then(res => {
        if (res?.message) {
          toast(res?.message);
        } else {
          toast('Bid placed successfully');
        }
        getApiCalls();
      })
      .catch(e => {
        console.log('Error in Bid', e);
      })
      .finally(() => {
        setLoader(false);
        setShowModal(false);
        setLoading(false);
        goBack();
      });
  };
  const increace = (x: any) => {
    const {days, hours, minutes, remainingSeconds} = timeConverter(endTime);

    setTime({
      days: days,
      hours: hours,
      minutes: minutes,
      remainingSeconds: remainingSeconds,
    });
    ref.current = setTimeout(() => {
      if (x > 0) {
        increace(x - 1);
      } else {
      }
    }, 1000);
  };

  // dutch timer code
  useEffect(() => {
    let data = moment(dutchPriceUpdateTime).diff(moment(), 'seconds');

    dutchStepTime(data < 0 ? dutchsec : data);
    return () => clearTimeout(dutchRef.current);
  }, [dutchsec]);

  const dutchStepTime = (x: any) => {
    setDutchSec(x);
    const {days, hours, minutes, remainingSeconds} =
      calculateRemainingTimeBySec(x <= 0 ? x : dutchsec);

    setDutchTime({
      days: days,
      hours: hours,
      minutes: minutes,
      remainingSeconds: remainingSeconds,
    });

    dutchRef.current = setTimeout(() => {
      if (x > 0) {
        dutchStepTime(x - 1);
      } else if (dutchsec > 0) {
        setDutchSec(prevState => prevState - 1);
      } else {
        setDutchSec(timeStepMinutes * 60);
      }
    }, 1000);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <ScreenView navigation={navigation} title={name} iconName={'close'}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={assetIcon !== '' ? {uri: assetIcon} : Auction_Image}
            style={styles.imageIcon}
          />
          <View style={{paddingLeft: 12, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.symbalText, {color: colors.text}]}>
                {symbol}
              </Text>
              <View style={[styles.dot, {backgroundColor: colors.lightText}]} />
              <Text style={[styles.symbalText, {color: colors.text}]}>
                {symbolValue}
              </Text>
            </View>
            <Text style={[styles.symbalText, {color: colors.text}]}>
              {tradeType}
            </Text>
          </View>
        </View>
        {tradeType === AUCTION_TYPE.CLASSIC ? (
          <>
            <View style={{flexDirection: 'row', paddingTop: 24}}>
              <View style={{flex: 1}}>
                <StatusBlock
                  title="Current bid"
                  value={formatCurrency(currentBidPrice, 2)}
                />
                <StatusBlock
                  title="Your last bid"
                  isYourHighestBid={currentBidPrice === userBidPrice}
                  value={formatCurrency(userBidPrice, 2)}
                />
              </View>
              <View style={{flex: 1}}>
                <StatusBlock
                  title="Price step"
                  value={formatCurrency(stepPrice, 2)}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={[styles.headerText, {color: colors.text}]}>
                Price step multiplier:
              </Text>
              <View style={styles.containerInputText}>
                <TouchableOpacity
                  onPress={() => {
                    if (1 < count) {
                      setCount(count - 1);
                      handlePrice();
                    }
                  }}
                  style={[styles.actionBtn, {borderColor: colors.text}]}>
                  <Text style={{color: colors.text}}>-</Text>
                </TouchableOpacity>
                <View style={[styles.actionBtn, {borderColor: colors.text}]}>
                  <Text style={{color: colors.text}}>{count}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setCount(count + 1);
                    handlePrice();
                  }}
                  style={[styles.actionBtn, {borderColor: colors.text}]}>
                  <Text style={{color: colors.text}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={{flexDirection: 'row', paddingTop: 24}}>
            <View style={{flex: 1}}>
              <StatusBlock
                title="Current bid"
                value={formatCurrency(currentBidPrice, 2)}
              />
              <StatusBlock
                title="Time left to next step"
                value={`${dutchTime?.days}:${dutchTime?.hours}: ${dutchTime?.minutes}: ${dutchTime?.remainingSeconds}`}
              />
            </View>
            <View style={{flex: 1}}>
              <StatusBlock
                title="Price step"
                value={formatCurrency(stepPrice, 2)}
              />
            </View>
          </View>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.bidPrice}>
          {formatCurrency(
            tradeType === AUCTION_TYPE.CLASSIC ? yourBid : currentBidPrice,
            2,
          )}
        </Text>
        <Text style={[styles.symbalText, {color: colors.text}]}>
          Your bidding price
        </Text>
      </View>

      <View style={styles.timeStatusConatiner}>
        <Text
          style={[
            styles.symbalText,
            {color: colors.text, marginTop: 12, flex: 1},
          ]}>
          Auction ending in
        </Text>
        <Text style={[styles.timerText, {color: colors.text}]}>
          {time.days}d:{time.hours}h:{time.minutes}m:{time.remainingSeconds}s
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setLoader(true);
            confirmBid();
          }}
          style={styles.placeBidButton}>
          {loader ? (
            <ActivityIndicator size={'large'} style={{padding: 6}} />
          ) : (
            <Text style={styles.placeBidButtonText}>Place bid</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal visible={showModal}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.border,
              borderRadius: 80,
              padding: 24,
            }}>
            <Image
              source={isEnded ? Congrats_Image : Clock_Image}
              style={{width: 96, height: 96}}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 24,
              marginTop: 24,
            }}>
            {isEnded
              ? 'Congratulations you won the auction'
              : 'The auction has now ended'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            style={{
              paddingHorizontal: 40,
              paddingVertical: 12,
              backgroundColor: colors.border,
              borderRadius: 4,
              marginTop: 24,
            }}>
            <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  imageIcon: {width: 64, height: 64, borderRadius: 4},
  symbalText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  dot: {
    height: 4,
    width: 4,
    margin: 8,
    borderRadius: 4,
  },
  headerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  containerInputText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  bidPrice: {
    color: COLORS['primary-dark'],
    fontSize: 32,
    lineHeight: 48,
    fontWeight: '600',
  },
  timeStatusConatiner: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 12,
    flex: 1,
    textAlign: 'right',
  },
  placeBidButton: {
    backgroundColor: COLORS['primary-dark'],
    alignItems: 'center',
    borderRadius: 4,
  },
  placeBidButtonText: {
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    color: COLORS['white'],
  },
});
export default AuctionBidding;
