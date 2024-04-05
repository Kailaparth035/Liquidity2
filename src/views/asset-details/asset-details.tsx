import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import {Loader} from '../../storybook/loader';
import {TabNavigation} from '../../storybook/tabNavigation';
import {
  AssetsHeader,
  Chart,
  ChartStats,
  AssetsFooter,
  TabBody,
} from './components';
import {useNetwork} from '../../hooks/use-network';
import {APIS, STOCK_DETAILS_TABS, ASSETS, MULTI_ASSETS} from '../../constants';
import {
  isDarkModeState,
  SelectedAssetDetailsState,
  SelectedAssetSheetState,
  SelectedMusicAssetDetailsState,
} from '../../states';
import {Header} from '../../components';
import {assetsDetailsStyle as styles} from './asset-details.styles';
import {Svg_No_Details} from '../../assets';
import {useLoginAuth} from '../routes/hooks/use-login-auth';
import {NoData} from '../../components/empty-state';
import {
  AssetDetailsTabs,
  OverView,
  MarketOverview,
  MediaCoverage,
  Partnership,
  ProminentInvestor,
  TheReasonToInvest,
  Team,
  TechnicalCharts,
  TheProblem,
  TheSolution,
  WhatWeDo,
  AssetDetailsTabLabel,
} from './components/tab-body/component';
import {Svg_No_Details_light} from '../../assets/icon/svg/no-details-light';
import MusicStream from '../../components/src/MusicStream';
import MusicState from '../../components/src/MusicState';
import MusicInvester from '../../components/src/MusicaInvester';
import MusicDevident from '../../components/src/MusicDevident';
import {OrderBook} from '../../views/buy-sell/components/orderBook';
import {TechnicalChartsMusic} from './components/MusicalHeader/components/TechnicalChartsForMusic';
import {PolarPieChart} from '../../../src/storybook/charts-kit/polar-pie/polar-pie';
import {MenuSection} from '../../assets/images';
import Discription from './components/MusicalHeader/components/Description';
import {selectedAuthUserState} from '../../views/profile/components/co-owners/states';

const Tab = createMaterialTopTabNavigator();

//@ts-ignore
console.reportErrorsAsExceptions = false;
console.disableYellowBox = true;

let updatePreviousIndex = 0;
const {COMMODITY, CRYPTO, FOREX, MARKETINDEX, STOCK, PARIVATE, MUSIC} = ASSETS;
const {
  STOCKS,
  CRYPTO: CRYPTOS,
  COMMODITIES,
  FOREX: FOREXS,
  MARKETINDEX: MARKETINDEXS,
  PRIVATES,
} = MULTI_ASSETS;

const polarChart = [
  {name: 'Spotify', value: '195.75', color1: '#2AB87E'},
  {name: 'Youtube', value: '153.89', color1: '#F55353'},
  {name: 'Apple Music', value: '59.42', color1: '#FFFF'},
  {name: 'Amazon Music', value: '16.49', color1: '#add8e6'},
];

const chartData = [
  {
    changePercentage: '60.00',
    currentPrice: '$6.00',
    gainLoss: '$195.75M',
    lgColor: '#33B87A',
    name: 'Spotify',
    percent: '50.00',
    y: 45,
    z: 1,
  },
  {
    changePercentage: '40.00',
    currentPrice: '$20.00',
    gainLoss: '$153.89M',
    lgColor: '#F55353',
    name: 'Youtube',
    percent: '30.00',
    y: 30,
    z: 2,
  },
  {
    changePercentage: '$15.00',
    currentPrice: '$10,000.00',
    gainLoss: '$59.42M',
    lgColor: '#FFFF',
    name: 'Apple Music',
    percent: '10.00',
    y: 15,
    z: 4,
  },
  {
    changePercentage: '$10.00',
    currentPrice: '$10,000.00',
    gainLoss: '$16.49M',
    lgColor: '#add8e6',
    name: 'Amazon Music',
    percent: '10.00',
    y: 10,
    z: 4,
  },
];

const colorCode = [
  {
    radialGradient: {
      cx: 0.5,
      cy: 0.3,
      r: 0.5,
    },
    stops: [
      [0, '#2AB87E'],
      [1, '#2AB87E'],
    ],
  },
  {
    radialGradient: {
      cx: 0.5,
      cy: 0.3,
      r: 0.5,
    },
    stops: [
      [0, '#F55353'],
      [1, '#F55353'],
    ],
  },
  {
    radialGradient: {
      cx: 0.5,
      cy: 0.3,
      r: 0.5,
    },
    stops: [
      [0, '#FFFF'],
      [1, '#FFFF'],
    ],
  },
  {
    radialGradient: {
      cx: 0.5,
      cy: 0.3,
      r: 0.5,
    },
    stops: [
      [0, '#add8e6'],
      [1, '#add8e6'],
    ],
  },
];

export const AssetDetails: FC<any> = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statistic, setstatistic] = useState([]);
  const [dividend, setDividend] = useState([]);
  const [isDummyApi, setIsDummyApi] = useState(true);

  const {colors} = useTheme();

  const setStockDetails = useSetRecoilState(SelectedAssetDetailsState);
  const [{symbol, type, id}, setSelectedAsset] = useRecoilState(
    SelectedAssetSheetState,
  );
  const [musicSelectedAsset, setSelectedMusicAssetDetailsState] =
    useRecoilState(SelectedMusicAssetDetailsState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  const resetMusicSelectedAsset = useResetRecoilState(
    SelectedMusicAssetDetailsState,
  );
  const LoggedAccount = useRecoilValue(selectedAuthUserState);

  const {
    get: getSummaries,
    data: summaries,
    loading: summaryLoading,
    isLoaded: isSummaryLoaded,
  } = useNetwork();

  const {
    get: getOverViewDetails,
    data: overviewResponse,
    isLoaded,
  } = useNetwork();
  const {
    get: getOrderBook,
    data: OrderBookData,
    isLoaded: orderBookLoaded,
  } = useNetwork();
  const {get, data} = useNetwork();

  useEffect(() => {
    if (id) {
      getOrderBook(`${APIS.OrderBookBuy}${id}&status=PENDING`).then(res => {});
    }
  }, [id, OrderBookData]);
  const DUMMY_ASSETS_ID = '87283611';

  const {isLoggedIn} = useLoginAuth();
  const flatListRef: any = useRef(null);

  const handleScroll = useCallback((y: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: y + 4});
    }
  }, []);

  useEffect(() => {
    switch (type) {
      case STOCK:
      case STOCKS:
        getSummaries(`${APIS.StockSummaries}/${symbol}`);
        break;
      case CRYPTO:
      case CRYPTOS:
        getSummaries(`${APIS.CryptoSummaries}/${symbol}`);
        break;
      case COMMODITY:
      case COMMODITIES:
        getSummaries(`${APIS.CommoditySummaries}/${symbol}`);
        break;
      case FOREX:
      case FOREXS:
        getSummaries(`${APIS.ForexSummaries}/${symbol}`);
        break;
      case MARKETINDEX:
      case MARKETINDEXS:
        getSummaries(`${APIS.MarketIndexSummaries}/${symbol}`);
        break;
      case PARIVATE:
      case PRIVATES:
        getOverViewDetails(`${APIS.AssetOverView}/${id}`);
        getSummaries(`${APIS.PrivateSummaries}/${id}`);
        break;
      case MUSIC:
        get(`${APIS.Tokens}/${id}`);
    }
  }, [symbol, type]);

  useEffect(() => {
    if (data?.data) {
      setSelectedMusicAssetDetailsState(data.data);
    }
  }, [data]);

  useEffect(() => {
    const {data: response} = overviewResponse ?? {};
    if (Object.keys(response ?? {}).length === 0 && isLoaded && isDummyApi) {
      getOverViewDetails(`${APIS.AssetOverView}/${DUMMY_ASSETS_ID}`);
      setIsDummyApi(false);
    }
  }, [overviewResponse, isLoaded]);

  const {
    overview,
    the_problem,
    the_solution,
    what_we_do,
    reason_to_invest,
    prominent_investor,
    partnership,
    team,
    media_coverage,
    market_overview,
  } = useMemo(() => overviewResponse?.data?.data ?? {}, [overviewResponse]);

  useEffect(() => {
    if (summaries && summaries.message === 'ok') {
      setStockDetails({[symbol]: summaries.data});
    }
  }, [summaries]);

  const goBack = useCallback(() => {
    setSelectedAsset({});
    resetMusicSelectedAsset();
    navigation.goBack();
  }, [setSelectedAsset, navigation]);

  useEffect(() => {
    const obj = musicSelectedAsset?.statistics;
    const arr = Object.keys(obj ?? {});
    let newrr: any = [];
    arr.map(item => {
      if (obj.hasOwnProperty(`${item}`)) {
        let newobj = {[item]: obj[`${item}`]};
        newrr.push(newobj);
      }
    });

    setstatistic(newrr);
  }, [musicSelectedAsset?.statistics]);

  useEffect(() => {
    const data = musicSelectedAsset?.dividend;
    if (data !== null && data !== undefined) {
      const newArray = [];
      const quarters = ['q1', 'q2', 'q3', 'q4'];
      quarters.forEach(quarter => {
        const quarterData = {};
        Object.keys(data).forEach(year => {
          quarterData[`${year} ${quarter}`] = data[year][quarter] || ' ';
        });
        newArray.push(quarterData);
      });
      setDividend([...newArray]);
    }
  }, [musicSelectedAsset?.dividend]);

  //this method will be remove in future as this is unused keep it for now only
  const name = useMemo(
    () => summaries?.data?.detail?.name ?? 'Asset Detail',
    [summaries?.data?.detail?.name],
  );

  const tabs =
    type === STOCK
      ? STOCK_DETAILS_TABS
      : type === PARIVATE || type === COMMODITY
      ? [STOCK_DETAILS_TABS[0]]
      : [STOCK_DETAILS_TABS[0], STOCK_DETAILS_TABS[1]];

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems?.[0]?.index) {
      setCurrentIndex(viewableItems?.[0]?.index);
      updatePreviousIndex = viewableItems?.[0]?.index;
    }
    if (
      (updatePreviousIndex === 4 || updatePreviousIndex === 6) &&
      viewableItems?.length === 0
    ) {
      setCurrentIndex(5);
    }
  }, []);

  const MusicalAsset = [
    {
      component: (
        <AssetsHeader symbol={'musical Details'} isLoggedIn={isLoggedIn} />
      ),
    },

    {
      component: <Chart id={'DDOG'} symbol={'DDOG'} assetType={'stock'} />,
    },
    {component: <ChartStats symbol={symbol} assetType={type} />},
    {
      component: (
        <Text
          style={{
            color: colors.text,
            fontSize: 14,
            lineHeight: 20,
            fontWeight: '600',
            paddingLeft: 16,
          }}>
          OrderBook
        </Text>
      ),
    },
    {
      component: (
        <View style={{}}>
          {!orderBookLoaded ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <OrderBook
              orderBook={{
                ask: OrderBookData?.data?.ask,
                bid: OrderBookData?.data?.bid,
              }}
            />
          )}
        </View>
      ),
    },
    {
      component: (
        <AssetDetailsTabs
          scrollSection={handleScroll}
          currentIndex={0}
          type={'music'}
        />
      ),
    },
    {
      component: (
        <Discription
          discription={musicSelectedAsset?.artist?.description.replace(
            /<[^>]+>/g,
            '',
          )}
          artistName={musicSelectedAsset?.artist?.name}
          symbol={musicSelectedAsset?.symbol}
          alubmName={musicSelectedAsset?.name}
        />
      ),
    },
    {
      component: (
        <View>
          <View style={[style.title, {borderBottomColor: colors.lineBorder}]}>
            <Text style={[style.whiteTitle, {color: colors.text}]}>
              Streams on Popular Platfrom
            </Text>
          </View>
          <View>
            <FlatList
              data={statistic}
              renderItem={({item}) => {
                return <MusicStream item={item} />;
              }}
              numColumns={2}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={[style.title, {borderBottomColor: colors.lineBorder}]}>
              <Text style={[style.whiteTitle, {color: colors.text}]}>
                Stats
              </Text>
            </View>

            <FlatList
              data={[
                {
                  name: 'Total Amount Paid to Artist',
                  value: musicSelectedAsset?.totalArtistPayment,
                },
                {
                  name: 'Number of Investors',
                  value: musicSelectedAsset?.investorCount,
                },
                {
                  name: 'Total Amount Paid to Investore',
                  value: musicSelectedAsset?.totalInvestorPayment,
                },
                {
                  name: '% change in Last Month',
                  value: musicSelectedAsset?.percentageChangeLastMonth + '%',
                },
              ]}
              renderItem={({item}) => {
                return <MusicState item={item} />;
              }}
              numColumns={2}
            />
          </View>

          <View style={{flex: 1}}>
            <View
              style={[
                style.title,
                {flexDirection: 'row', borderBottomColor: colors.lineBorder},
              ]}>
              <Text style={[style.whiteTitle, {color: colors.text}]}>
                Dividend{' '}
              </Text>
              <Text
                style={
                  (style.whiteTitle, {color: colors.text, fontWeight: '400'})
                }>
                (Per share)
              </Text>
            </View>
            {dividend.map((mapItem, mapIndex) => {
              return <MusicDevident mapItem={mapItem} mapIndex={mapIndex} />;
            })}
          </View>
          <View style={{flex: 1}}>
            <View style={[style.title, {flexDirection: 'row'}]}>
              <View style={style.yellowDash} />
              <Text style={[style.fontStyle, {color: 'rgba(245, 196, 98, 1)'}]}>
                Other songs by this artist
              </Text>
            </View>

            <FlatList
              data={musicSelectedAsset?.artist?.topTracks}
              renderItem={({item, index}) => {
                return <MusicInvester artist={item} />;
              }}
            />
          </View>
        </View>
      ),
    },
    {
      component: (
        <>
          <View style={[style.title, {flexDirection: 'row'}]}>
            <View style={style.yellowDash} />
            <Text style={[style.fontStyle, {color: 'rgba(245, 196, 98, 1)'}]}>
              Technical Charts
            </Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingVertical: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flex: 1,
              }}>
              <Text
                style={[style.fontStyle, {color: colors.text}]}
                numberOfLines={1}>
                Dividend
              </Text>
              <Text
                style={[style.titleText, {color: colors.text, marginTop: 5}]}>
                Over each quarter
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 20,
              }}>
              <Image
                source={MenuSection}
                style={{height: 20, width: 20, tintColor: colors.text}}
              />
            </TouchableOpacity>
          </View>
          <TechnicalChartsMusic />
        </>
      ),
    },
    {
      component: (
        <View
          style={{
            paddingVertical: 10,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flex: 1,
              }}>
              <Text
                style={[style.fontStyle, {color: colors.text}]}
                numberOfLines={1}>
                Song Played
              </Text>
              <Text
                style={[style.titleText, {color: colors.text, marginTop: 5}]}>
                On popular platform
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 20,
              }}>
              <Image
                source={MenuSection}
                style={{height: 20, width: 20, tintColor: colors.text}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: -100,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <PolarPieChart
                data={chartData}
                screen="music"
                colors={colorCode}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'flex-start',
                justifyContent: 'center',
                top: -50,
              }}>
              <Text
                style={[
                  style.titleText,
                  {color: colors.text, marginVertical: 5},
                ]}>
                Platform
              </Text>
              <FlatList
                data={polarChart}
                renderItem={({item}) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 5,
                          marginTop: 2,
                          backgroundColor: item.color1,
                          alignSelf: 'flex-start',
                        }}
                      />
                      <View
                        style={{
                          marginHorizontal: 5,
                          alignSelf: 'flex-start',
                          marginTop: -5,
                          width: Dimensions.get('window').width / 4,
                        }}>
                        <Text
                          style={[
                            style.fontStyle,
                            {color: colors.text, fontSize: 14},
                          ]}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            style.titleText,
                            {
                              color: colors.text,
                              marginBottom: 5,
                              fontSize: 12,
                            },
                          ]}>
                          {item.value}M
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
      ),
    },
  ];
  const assetDetailsPrivate = [
    {component: <AssetsHeader symbol={symbol} isLoggedIn={isLoggedIn} />},
    {component: <Chart id={id} symbol={symbol} assetType={type} />},
    {component: <ChartStats symbol={symbol} assetType={type} />},
    {
      component: (
        <AssetDetailsTabs
          scrollSection={handleScroll}
          currentIndex={currentIndex}
        />
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Overview" />
          <OverView data={overview} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Technical Charts" />
          <TechnicalCharts />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="The Problem" />
          <TheProblem data={the_problem} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="The Solution" />
          <TheSolution data={the_solution} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="What We Do" />
          <WhatWeDo data={what_we_do} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="The Reason To Invest" />
          <TheReasonToInvest data={reason_to_invest} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Media Coverage" />
          <MediaCoverage data={media_coverage} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Prominent Investor" />
          <ProminentInvestor data={prominent_investor} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Partnership" />
          <Partnership data={partnership} />
        </View>
      ),
    },
    {
      component: (
        <View style={styles.tabsContain}>
          <AssetDetailsTabLabel title="Team" />
          <Team data={team} />
        </View>
      ),
    },
    {
      component: (
        <View style={[styles.tabsContain, {height: 600}]}>
          <AssetDetailsTabLabel title="Market Overview" />
          <MarketOverview data={market_overview} />
        </View>
      ),
    },
  ];

  return (
    <View
      style={[styles.assetDetailsPage, {backgroundColor: colors.background}]}>
      {type === 'sba7' ? (
        <>
          <Header title={name} goBack={goBack} />
          <NoData
            svg={isDarkMode == true ? Svg_No_Details : Svg_No_Details_light}
            height={120}
            msg="Details missing or not found"
          />
        </>
      ) : !summaryLoading && isSummaryLoaded ? (
        <View style={styles.container}>
          <Header title={name} goBack={goBack} />
          {Object?.keys(summaries?.data?.detail ?? {}).length === 0 ? (
            <NoData
              svg={isDarkMode == true ? Svg_No_Details : Svg_No_Details_light}
              height={120}
              msg="Details missing or not found"
            />
          ) : (
            <>
              {type !== 'private' && type !== 'privates' ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <AssetsHeader symbol={symbol} isLoggedIn={isLoggedIn} />
                  <Chart id={id} symbol={symbol} assetType={type} />
                  <ChartStats symbol={symbol} assetType={type} />
                  <View style={styles.navigationContainer}>
                    <TabNavigation
                      width="100%"
                      backgroundColor={colors.background}>
                      {tabs.map(tab => (
                        <Tab.Screen name={tab.title} key={tab.index}>
                          {() => (
                            <TabBody
                              tab={tab.title}
                              symbol={symbol}
                              assetType={type}
                              navigation={navigation}
                            />
                          )}
                        </Tab.Screen>
                      ))}
                    </TabNavigation>
                  </View>
                </ScrollView>
              ) : (
                <>
                  <FlatList
                    ref={flatListRef}
                    viewabilityConfig={{
                      itemVisiblePercentThreshold: 2,
                    }}
                    data={assetDetailsPrivate}
                    renderItem={({item}) => item.component}
                    stickyHeaderIndices={[3]}
                    onViewableItemsChanged={_onViewableItemsChanged}
                  />
                  {LoggedAccount?.isTradeEnabled !== false && (
                    <AssetsFooter navigation={navigation} />
                  )}
                </>
              )}
            </>
          )}
        </View>
      ) : summaryLoading ? (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      ) : type == 'music' ? (
        <>
          <Header title={'Musical Details'} goBack={goBack} />
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 2,
            }}
            data={MusicalAsset}
            renderItem={({item}) => item.component}
            onViewableItemsChanged={_onViewableItemsChanged}
          />
          {LoggedAccount?.isTradeEnabled !== false && (
            <AssetsFooter navigation={navigation} isMusicalType={true} />
          )}
        </>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    paddingVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    fontWeight: '500',
    fontSize: 16,
  },
  fontStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  titleText: {
    opacity: 0.6,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: 'rgba(245, 196, 98, 1)',
  },
  whiteTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(245, 196, 98, 1)',
  },
  yellowDash: {
    backgroundColor: 'rgba(245, 196, 98, 1)',
    width: 24,
    height: 4,
    borderRadius: 14,
    marginRight: 8,
    alignSelf: 'center',
  },
});
