// @flow
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ScreenView from '../../../../views/auction-details/components/ScreenView';
import FooterButtons from '../../../../views/auction-details/components/FooterButtons';
import {SVG} from '../../../../storybook';
import {DOLLER_SVG} from '../../../../assets/icon/svg/doller-svg';
import {
  Auction_Image,
  Background_Image,
  Clock_Image,
  Congrats_Image,
  Dog_Image,
} from '../../../../assets/images';
import {COLORS} from '../../../../assets';
import {
  auctionDetailsState,
  AuctionDetalisLoaderState,
  latestBidsState,
} from '../../../../views/auction-details/states';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useCurrency} from '../../../../hooks/use-currency';
import {APIS} from '../../../../constants';
import {useNetwork} from '../../../../hooks';
import {toast} from '../../../../libs';
import moment from 'moment';
import {timeConverter} from '../../../../views/auction-details/comman/utility';

type BuyAuctionType = {navigation: any};

const BuyAuction = ({navigation}: BuyAuctionType) => {
  const [AuctionDetails, setAuctionDetails] =
    useRecoilState(auctionDetailsState);
  const [AuctionDetailsLoader, setAuctionDetailsLoader] = useRecoilState(
    AuctionDetalisLoaderState,
  );
  const {
    buynowPrice,
    currentBidPrice,
    userBidPrice,
    stepPrice,
    totalBid,
    endTime,
    name,
    assetIcon,
    tradeType,
    symbol,
    symbolValue,
  } = AuctionDetails ?? {};
  const [time, setTime] = useState({});
  const setLatestBids = useSetRecoilState(latestBidsState);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setstatus] = useState('success');
  const [showConfirm, setshowConfirm] = useState(true);
  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();
  const {formatCurrency} = useCurrency();
  const {get, post} = useNetwork();
  const confirmModel = () => {
    return (
      <>
        <Text style={styles.text}>Are you sure you want to buy it now?</Text>
        <View
          style={{
            alignSelf: 'center',
            borderRadius: 48,
            padding: 12,
            top: 20,
            zIndex: 999,
            backgroundColor: 'white',
          }}>
          <SVG name={DOLLER_SVG} width={24} height={24} />
        </View>
        <ImageBackground
          source={Background_Image}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{borderRadius: 8}}>
          <Text
            style={{
              fontSize: 36,
              lineHeight: 40,
              fontWeight: '600',
            }}>
            $1,10,000
          </Text>
        </ImageBackground>
        <View style={{width: '100%', marginTop: 24}}>
          <TouchableOpacity
            onPress={() => {
              setshowConfirm(false);
            }}
            style={{
              backgroundColor: COLORS['primary-dark'],
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              flexDirection: 'row',
            }}>
            {loader ? <ActivityIndicator size="small" /> : null}
            <Text
              style={{
                fontSize: 14,
                lineHeight: 24,
                fontWeight: '600',
                color: 'white',
                paddingLeft: 10,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            style={{
              backgroundColor: colors.box,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              marginTop: 8,
            }}>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 24,
                fontWeight: '600',
                color: colors.text,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  var ref = useRef<any>(null);

  useEffect(() => {
    let leftSeconds = moment(endTime).diff(moment(), 'seconds');
    increace(leftSeconds);

    return () => clearTimeout(ref.current);
  }, [endTime]);

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

  const getHeaderMsg = (status: any) => {
    if (status === 'success') {
      return 'Congratulations you bought the auction successfully';
    }
    if (status === 'fail') {
      return 'Something went wrong on our end';
    } else {
      return 'The auction has now ended';
    }
  };
  const getIcon = (status: any) => {
    if (status === 'success') {
      return Congrats_Image;
    }
    if (status === 'fail') {
      return Dog_Image;
    } else {
      return Clock_Image;
    }
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
      isBuyNowPrice: true,
      bidPrice: parseInt(buynowPrice),
    };
    post(APIS.auctionBid, payload)
      .then(res => {
        toast(res?.message);
        getApiCalls();
      })
      .catch(e => {
        console.log('Error in Bid', e);
      })
      .finally(() => {
        setLoader(false);
        setShowModal(true);
        setLoading(false);
        goBack();
      });
  };
  const congrats = () => {
    return (
      <>
        <View
          style={{
            backgroundColor: colors.border,
            borderRadius: 80,
            padding: 24,
          }}>
          <Image source={getIcon(status)} style={{width: 96, height: 96}} />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 24,
            marginTop: 24,
            textAlign: 'center',
          }}>
          {getHeaderMsg(status)}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setshowConfirm(true);
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
      </>
    );
  };

  return (
    <ScreenView navigation={navigation} title={name} iconName={'close'}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: assetIcon} ?? Auction_Image}
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
      <View style={{flex: 1}}>
        <ImageBackground
          source={Background_Image}
          resizeMode="cover"
          style={styles.image}
          imageStyle={{borderRadius: 8}}>
          <Text style={styles.buyPriceText}>
            {formatCurrency(buynowPrice, 2)}
          </Text>
        </ImageBackground>
        <Text style={[styles.messageText, {color: colors.lightText}]}>
          You will buy the assets at the above price instantly.
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.symbalText, {color: colors.text, flex: 1}]}>
          Auction ending in
        </Text>
        <Text
          style={[
            styles.symbalText,
            {color: colors.text, textAlign: 'right', fontSize: 16},
          ]}>
          {time.days}d:{time.hours}h:{time.minutes}m:{time.remainingSeconds}s
        </Text>
      </View>
      <View>
        <FooterButtons
          isSingle={true}
          feeded={true}
          feededLable={'Buy now'}
          feedOnPress={() => {
            confirmBid();
          }}
          style={{marginVertical: 16}}
        />
      </View>
      <Modal visible={showModal}>
        <View style={styles.modalConatiner}>
          {showConfirm ? confirmModel() : congrats()}
        </View>
      </Modal>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  parent: {},
  image: {
    height: 236,
    width: '100%',
    borderRadius: 8,
    backgroundColor: ' rgba(240, 244, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  dot: {
    height: 4,
    width: 4,
    margin: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  imageIcon: {width: 64, height: 64, borderRadius: 4},
  symbalText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  buyPriceText: {fontSize: 36, lineHeight: 40, fontWeight: '600'},
  messageText: {marginTop: 12, fontSize: 14, lineHeight: 20, fontWeight: '400'},
  modalConatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
export default BuyAuction;
