// @flow
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Header} from '../../../components';
import {
  Auction_Image,
  Correct_Image,
  NoBids_Image,
  Warning_Image,
} from '../../../assets/images';
import {SVG} from '../../../storybook';
import {COLORS, Svg_Bank} from '../../../assets';
import {useTheme} from '@react-navigation/native';
import StatusBlock from '../components/StatusBlock';
import FooterButtons from '../components/FooterButtons';
import TimerStatus from '../components/TimerStatus';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CardView from '../components/CardView';
import CardTitle from '../components/CardTitle';
import BidSheetCard from '../components/BidSheetCard';
import DocContainer from '../components/DocContainer';
import {Routes} from '../../../views/routes/constants';
import Bid from '../components/Bid';
import Timer from '../components/Timer';
import {SVG_EMPTY_HEART} from '../../../assets/icon/svg/empty-heart';
import {useNetwork} from '../../../hooks';
import {useCurrency} from '../../../hooks/use-currency';
import {APIS} from '../../../constants';
import {SVG_FEEDED_HEART} from '../../../assets/icon/svg/feeded-heart';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  auctionDetailsState,
  AuctionDetalisLoaderState,
  latestBidsState,
} from '../states';
import AuctionWinner from '../components/AuctionWinner';
import {
  AUCTION_TYPE,
  calculateRemainingTimeBySec,
  manupulate,
  STATUS,
} from '../comman/utility';
import {capitalize} from '../../../views/utils';
import {toast} from '../../../libs';
import EditHistory from '../components/EditHistory';
import moment from 'moment';

type AuctionDetailsType = {
  navigation: any;
  route?: any;
};

const AuctionDetails = ({navigation, route}: AuctionDetailsType) => {
  const keys = ['Files', 'Edit history'];
  const width = Dimensions.get('window').width;
  const {auctionId, isWatchlist} = route.params;
  const [AuctionDetailsLoader, setAuctionDetailsLoader] = useRecoilState(
    AuctionDetalisLoaderState,
  );
  // const [isLike, setIsLike] = useState(isWatchlist);
  const [AuctionDetails, setAuctionDetails] =
    useRecoilState(auctionDetailsState);
  const {
    assetIcon,
    symbol,
    name,
    description,
    status,
    symbolValue,
    tradeType,
    stepPrice,
    highestBidPrice,
    buynowPrice,
    startPrice,
    currentBidPrice,
    assetImage,
    endTime,
    totalBid,
    startTime,
    dataRoom,
    highestBidderDetails,
    userBidPrice,
    maxAuctionBidPrice,
    id,
    reservePrice,
  } = AuctionDetails ?? {};
  const [readMore, setReadMore] = useState<SetStateAction<any>>(3);
  const [editHistory, setEditHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [latestBids, setLatestBids] = useRecoilState(latestBidsState);
  const [outerStatus, setOuterStatus] = useState(status);
  const [dutchTime, setDutchTime] = useState<any>({
    days: '00',
    hours: '00',
    min: '00',
    sec: '00',
  });
  const [dutchsec, setDutchSec] = useState(0);
  const {colors} = useTheme();
  const flatlistref = useRef();
  const ref = useRef();
  const {get, remove: removeMaxBid} = useNetwork();
  const {formatCurrency} = useCurrency();
  var dutchRef = useRef<any>(null);
  const handleCallBack = (val: any) => {
    setOuterStatus(val);
  };

  useEffect(() => {
    getApiCalls();
  }, [status, auctionId]);

  const handelRemoveBid = () => {
    removeMaxBid(`${APIS.auctionMaxBid}${auctionId}`)
      .then(res => {
        toast('Budget Removed');
        getApiCalls();
      })
      .catch(e => {
        toast(e?.message);
      });
  };

  useEffect(() => {
    if (!AuctionDetailsLoader) {
      flatlistref?.current.scrollToIndex({
        index: currentIndex,
        animated: true,
        viewPosition: 0.5,
      });
      ref.current?.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getApiCalls = () => {
    get(APIS.auction + '/' + auctionId ?? AuctionDetails?.id)
      .then(res => {
        setAuctionDetails(res?.data);
        setOuterStatus(res?.data?.status);
        getEditHistory(res?.data?.folderId);
        setAuctionDetailsLoader(false);
        setRefreshing(false);
      })
      .catch(e => {
        setAuctionDetailsLoader(false);
        setRefreshing(false);
        console.log('Error in auction Details=', e);
      });
    get(APIS.latestBidPriceByAuctionId + auctionId)
      .then(res => {
        setLatestBids(res?.data);
      })
      .catch(e => {
        console.log('Error in Latest bids=', e);
      });
  };

  const getEditHistory = (folderId: string) => {
    get(APIS.auctionDataroomLog + folderId)
      .then(res => {
        setEditHistory(res?.data);
      })
      .catch(e => {
        console.log('Error in Edit History=', e);
      });
  };

  const getIcon = (val: any) => {
    const {status} = val;
    if (status) {
      return Correct_Image;
    } else {
      return Warning_Image;
    }
  };
  const getMessage = (val: any) => {
    const {isWinner, status} = val ?? {};

    if (isWinner) {
      return 'You won this auction';
    } else if (!!status) {
      return `Auction won by ${manupulate(symbol, isWinner, true)}`;
    } else {
      return 'No bids received, auction ended.';
    }
  };

  const onScrollEnd = (e: any) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    if (pageNum > -1) {
      setCurrentIndex(pageNum);
    }
  };

  const Tab = ({item, style, index}: any) => {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          setCurrentIndex(index);
        }}>
        <View>
          <Text
            style={[
              styles.text,
              {
                color:
                  currentIndex == index
                    ? COLORS['primary-dark']
                    : colors.lightText,
              },
            ]}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onRefresh = React.useCallback(() => {
    setAuctionDetailsLoader(true);
    getApiCalls();
  }, []);

  useEffect(() => {
    if (tradeType !== AUCTION_TYPE.CLASSIC) {
      let data = moment(AuctionDetails?.dutchPriceUpdateTime).diff(
        moment(),
        'seconds',
      );

      if (outerStatus === STATUS.LIVE) {
        dutchStepTime(data < 0 ? dutchsec : data);
      }
    }
    return () => clearTimeout(dutchRef.current);
  }, [dutchsec, outerStatus]);

  const dutchStepTime = (x: any) => {
    setDutchSec(x);
    const {days, hours, minutes, remainingSeconds} =
      calculateRemainingTimeBySec(x <= 0 ? x : dutchsec);

    setDutchTime({
      days: days,
      hours: hours,
      min: minutes,
      sec: remainingSeconds,
    });

    dutchRef.current = setTimeout(() => {
      if (x > 0) {
        dutchStepTime(x - 1);
      } else if (dutchsec > 0) {
        setDutchSec(prevState => prevState - 1);
      } else {
        if (AuctionDetails?.timeStepMinutes) {
          setDutchSec(AuctionDetails?.timeStepMinutes * 60);
        }
      }
    }, 1000);
  };

  if (AuctionDetailsLoader) {
    return <ActivityIndicator size={'large'} style={{marginTop:30}}/>;
  }
  return (
    <View style={{flex: 1}}>
      <Header
        title="Details"
        goBack={goBack}
        //wish list featureadded... remove for now
        // rightIcon={isLike ? SVG_FEEDED_HEART : SVG_EMPTY_HEART}
        // rightFunction={() => {
        //   handleLike();
        // }}
      />

      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={[
            styles.parent,
            {backgroundColor: colors.border},
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              source={
                AuctionDetails?.assetImage[0]
                  ? {uri: AuctionDetails?.assetImage[0]}
                  : Auction_Image
              }
              style={{width: '100%', height: 258}}>
              {outerStatus == STATUS.COMPLETED ? (
                <View style={styles.winnerContainer}>
                  <Image source={getIcon(highestBidderDetails)} />
                  <Text style={styles.winnerHeader}>
                    {highestBidderDetails?.isWinner
                      ? 'Congratulations'
                      : 'Auction ended'}
                  </Text>
                  <Text style={styles.winnerMsg}>
                    {getMessage(highestBidderDetails)}
                  </Text>
                </View>
              ) : null}
            </ImageBackground>
          </View>
          <View style={{backgroundColor: colors.background, padding: 16}}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={{padding: 10}}>
                {!assetIcon ? (
                  <SVG name={Svg_Bank} height={20} width={20} />
                ) : (
                  <Image source={{uri: assetIcon}} style={styles.iconStyle} />
                )}
              </View>
              <View style={{paddingLeft: 8}}>
                <Text style={[styles.nameText, {color: colors.text}]}>
                  {name}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.symbolText, {color: colors.lightText}]}>
                    {symbol}
                  </Text>
                  <Text style={[styles.symbolText, {color: colors.lightText}]}>
                    .{symbolValue}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexWrap: 'nowrap',
                paddingTop: 12,
              }}>
              <Text
                numberOfLines={readMore ? 3 : 100}
                style={[styles.discription, {color: colors.lightText}]}>
                {description}
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => {
                  setReadMore(!readMore);
                }}>
                <Text style={{color: COLORS['primary-dark']}}>
                  {description ? (readMore ? 'Read More' : 'Read Less') : null}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {outerStatus == STATUS.COMPLETED && highestBidderDetails?.status ? (
            <CardView>
              <CardTitle title="Auction Winner" />
              <AuctionWinner item={highestBidderDetails} />
            </CardView>
          ) : null}
          <CardView cardContainerStyle={styles.cardContainerStyle}>
            <CardTitle title="Auction Stats" />
            {outerStatus == STATUS.COMPLETED ||
            highestBidderDetails?.status ? null : (
              <View style={styles.timmerView}>
                <Timer
                  type={tradeType}
                  startDate={startTime}
                  endTime={endTime}
                  status={outerStatus}
                  setOuterStatus={handleCallBack}
                />
              </View>
            )}
            <View style={styles.blockConatiner}>
              <View style={{flex: 1}}>
                <StatusBlock title="Status" value={capitalize(outerStatus)} />
                <StatusBlock
                  title="Starting bid"
                  value={formatCurrency(startPrice, 2)}
                />
                <StatusBlock
                  title="Price step"
                  value={formatCurrency(stepPrice, 2)}
                />
              </View>
              <View style={{flex: 1}}>
                <StatusBlock
                  title="Auction Type"
                  value={capitalize(tradeType)}
                />
                <StatusBlock
                  title={
                    tradeType !== AUCTION_TYPE.CLASSIC
                      ? 'Reserve price'
                      : 'Buy now price'
                  }
                  value={formatCurrency(
                    tradeType !== AUCTION_TYPE.CLASSIC
                      ? reservePrice
                      : buynowPrice,
                    2,
                  )}
                />
                <StatusBlock
                  title={
                    tradeType === AUCTION_TYPE.CLASSIC
                      ? 'Your last bid'
                      : 'Time left to next step'
                  }
                  isYourHighestBid={
                    currentBidPrice === userBidPrice &&
                    tradeType === AUCTION_TYPE.CLASSIC
                  }
                  value={
                    tradeType === AUCTION_TYPE.CLASSIC
                      ? formatCurrency(highestBidPrice, 2)
                      : `${dutchTime.hours}:${dutchTime.min}:${dutchTime.sec}`
                  }
                />
              </View>
            </View>
          </CardView>
          {/* <CardView>
            <Text style={{fontSize: 16, fontWeight: '600', lineHeight: 24}}>
              Loan Information
            </Text>
            <View style={{flexDirection: 'row', paddingTop: 12}}>
              <View style={{flex: 1}}>
                <StatusBlock title="Categories" value="Loans" />
                <StatusBlock title="CUSIP #" value="194939271" />
              </View>

              <View style={{flex: 1}}>
                <StatusBlock title="Sub category" value="SBA7" />
                <StatusBlock title="Loan type" value="Individual" />
              </View>
            </View>
          </CardView> */}
          {outerStatus === STATUS.COMPLETED ? null : (
            <CardView>
              <CardTitle
                title={
                  tradeType === AUCTION_TYPE.CLASSIC
                    ? 'Set your maximum bid'
                    : 'My max. budget'
                }
              />
              <Text
                style={[styles.text, {color: colors.lightText, paddingTop: 4}]}>
                {`Set your ${
                  tradeType === AUCTION_TYPE.CLASSIC
                    ? 'maximum bid'
                    : 'maximum budget'
                }. We will automatically bid for you until outbid,ensuring you secure the best deals!`}
              </Text>

              <View style={{}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(Routes.SetMaxBid);
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={[
                      styles.symbolText,
                      {color: COLORS['primary-light']},
                    ]}>
                    {tradeType === AUCTION_TYPE.CLASSIC
                      ? 'Set Maximum Bid'
                      : 'Set Max. Budget'}
                  </Text>
                  <View style={{justifyContent: 'flex-start', paddingLeft: 8}}>
                    <Icon
                      name={'chevron-right'}
                      color={COLORS['primary-light']}
                      size={24}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {maxAuctionBidPrice === 0 ? null : (
                <View
                  style={[
                    styles.maxBidContainer,
                    {
                      backgroundColor: colors.ground,
                      borderBottomColor: colors.border,
                    },
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.symbolText,
                        {flex: 1, color: colors.lightText},
                      ]}>
                      {tradeType === AUCTION_TYPE.CLASSIC
                        ? 'Current maximum bid'
                        : 'Current max. budget'}
                    </Text>
                    <TouchableOpacity onPress={handelRemoveBid}>
                      <Icon
                        name={'delete-outline'}
                        color={COLORS['red']}
                        size={16}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.maxBidPriceText, {color: colors.text}]}>
                    {formatCurrency(maxAuctionBidPrice, 2)}
                  </Text>
                </View>
              )}
            </CardView>
          )}
          <CardView>
            <View style={{flexDirection: 'row'}}>
              <CardTitle title="Latest bids" />
              <Text
                style={[styles.text, {color: colors.lightText, paddingTop: 4}]}>
                ({totalBid} bids)
              </Text>
              {totalBid > 0 && (
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => {
                    navigation.navigate(Routes.LatestBids, {
                      auctionId: auctionId,
                    });
                  }}>
                  <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
              )}
            </View>
            {totalBid !== 0 ? (
              <Bid item={latestBids[0]} />
            ) : (
              <View style={{alignSelf: 'center', padding: 20}}>
                <Image source={NoBids_Image} />
                <Text
                  style={[
                    styles.text,
                    {
                      color: colors.lightText,
                      paddingTop: 4,
                      textAlign: 'center',
                    },
                  ]}>
                  No Bids Yet
                </Text>
              </View>
            )}
          </CardView>
          <View style={{backgroundColor: colors.background, marginTop: 1,paddingTop:10}}>
            <View style={{paddingHorizontal: 16}}>
              <CardTitle title="Data room" />
            </View>
            <View style={{flexDirection: 'row', padding: 16}}>
              <FlatList
                ref={flatlistref}
                horizontal
                data={keys}
                keyExtractor={(item, index) => keys[index]}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <Tab
                      style={[
                        styles.tabStyle,
                        {
                          borderColor:
                            currentIndex == index
                              ? COLORS['primary-dark']
                              : colors.background,
                        },
                      ]}
                      item={item}
                      index={index}
                    />
                  );
                }}
              />
            </View>
            <View>
              <FlatList
                ref={ref}
                horizontal
                data={keys}
                keyExtractor={(item, index) => keys[index]}
                initialScrollIndex={currentIndex}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        width,
                        height: 300,
                      }}>
                      {index == 0 ? (
                        <DocContainer dataRoom={dataRoom} />
                      ) : (
                        <EditHistory editHistory={editHistory ?? []} />
                      )}
                    </View>
                  );
                }}
              />
            </View>
          </View>
          {/* <CardView>
            <View style={{flexDirection: 'row'}}>
              <CardTitle title="Bid sheet" />
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  navigation.navigate(Routes.BidSheet);
                }}>
                <Text
                  style={{
                    color: COLORS['primary-dark'],
                    fontSize: 14,
                    lineHeight: 24,
                    fontWeight: '500',
                    textAlign: 'right',
                  }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <BidSheetCard />
            <BidSheetCard />
          </CardView> */}
        </ScrollView>
      </View>
      {/* fix Footer */}
      {outerStatus == STATUS.COMPLETED ? null : (
        <View>
          <TimerStatus
            status={outerStatus}
            startTime={startTime}
            endTime={endTime}
            currentBidPrice={formatCurrency(currentBidPrice, 2)}
          />

          <View style={{padding: 16}}>
            {tradeType == 'classic' ? (
              <FooterButtons
                lable1="Buy now"
                feededLable="Place bid"
                onPress={() => {
                  navigation.navigate(Routes.BuyAuction);
                }}
                feedOnPress={() => {
                  navigation.navigate(Routes.AuctionBidding);
                }}
              />
            ) : (
              <FooterButtons
                isSingle={true}
                feededLable="Place bid"
                feeded={true}
                feedOnPress={() => {
                  navigation.navigate(Routes.AuctionBidding);
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {},
  text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  tabStyle: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  assetRowListContainer: {flex: 1, justifyContent: 'center'},
  iconContaner: {
    height: 40,
    width: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  winnerContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerHeader: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: 'white',
    paddingTop: 20,
    paddingBottom: 4,
  },
  winnerMsg: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: 'white',
  },
  iconStyle: {height: 40, width: 40, borderRadius: 4},
  nameText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  symbolText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  dot: {
    height: 4,
    width: 4,
    // margin: 8,
    alignSelf: 'flex-end',
    marginBottom: 3,
    borderRadius: 4,
  },
  discription: {fontSize: 14, lineHeight: 20, fontWeight: '400'},
  blockConatiner: {flexDirection: 'row', paddingTop: 12},
  viewAllText: {
    color: COLORS['primary-dark'],
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
    textAlign: 'right',
  },
  maxBidContainer: {
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  maxBidPriceText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  cardContainerStyle: {padding: 0, paddingHorizontal: 16,paddingTop:10},
  timmerView: {marginTop: 15, marginBottom: 10},
});
export default AuctionDetails;
