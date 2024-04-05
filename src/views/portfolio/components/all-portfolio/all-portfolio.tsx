import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {RefreshControl, View, Text, ScrollView} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {allPortfolioStyles as styles} from './all-portfolio.styles';
import {FlatListScroll} from '../../../../storybook/flatlist';
import {OverallDetails} from './overall-details';
import DynamicPortfolio from './chart/dynamic-portfolio';
import {PolarPieChart} from '../../../../storybook/charts-kit';
import {formatNumber, formatNumberInShortForDecimal} from '../../../utils';
import {ProfileDataState} from '../../../../states';
import {CHART_COLORS, NO_DATA} from '../../../../constants/common';
import {useWatchList} from '../../../../views/watchlist/hooks/get-watchlist';
import {COLORS} from '../../../../assets';
import {APIS} from '../../../../constants';
import {useNetwork} from '../../../../hooks';
import {AllWalletTransactionState} from '../../../../states/wallet-transaction';
import {ErrorAlert} from '../../../../helpers/Alter';
import TransactionRow from '../../../../views/wallet-transaction/components/transaction-row';
import {ActivityIndicator} from 'react-native';
import {Routes} from '../../../../views/routes/constants';
import {
  SELECT_ACCOUNT,
  TRANSACTION_TYPE,
} from '../../../../views/deposit/constant';
import CustomButton from '../../../../views/wallet-details/components/CustomButton';
import AddBalanceButton from '../../../../views/wallet-details/components/AddBalanceButton';
import {BankLine} from '../../../../assets/images';
import {BankAccountMetadataType} from '../../../../views/profile/components/bank-accounts/types';
import {Loader} from '../../../../storybook';

export const AllPortfolio = ({portfolio, navigation}: any) => {
  const {colors} = useTheme();
  const {getWatchList} = useWatchList();
  const profileData = useRecoilValue(ProfileDataState);
  const [AccountInfo, setAccountInfo] = useState('0');
  const balance = parseFloat(AccountInfo?.balance ?? 0);
  const {get, loading, setLoading} = useNetwork();
  const isFocuse = useIsFocused();
  const [load, setLoad] = useState<boolean>(false);
  const [walletTransaction, setalletTransaction] = useRecoilState(
    AllWalletTransactionState,
  );
  const [bankAccouts, setBankAccouts] = useState<BankAccountMetadataType[]>([]);
  const [fortressLoader, setFortressLoader] = useState(false);

  useEffect(() => {
    getWatchList(true);
  }, []);
  const singlePortfolio = useMemo(() => {
    const sba7Obj = {
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
        investedValue: 0,
      },
      assets: [],
    };
    const newPortfolio = {
      ...portfolio,
      sba7: sba7Obj,
    };

    let portfolioArray = Object.keys(newPortfolio ?? {});
    let noCryptoData = [];

    const index = portfolioArray.indexOf('forex');

    for (let i = 0; i < portfolioArray.length; i++) {
      let type = portfolioArray[i];

      // In future require this code for music and another assets
      // if (type !== 'crypto') {
      //   noCryptoData.push({
      //     type,
      //     ...portfolio[type],
      //     index: `${type}__${index}`,
      //   });
      // }
      if (type === 'privates') {
        noCryptoData.push({
          type,
          ...portfolio[type],
          index: `${type}__${index}`,
        });
      } else if (type === 'sba7') {
        noCryptoData.push({
          type,
          ...sba7Obj,
          index: `${type}__${index}`,
        });
      }
    }
    return noCryptoData;
  }, [portfolio, isFocuse]);

  const {investedAmount: allInvestedPrice} = useMemo(() => {
    return Object.keys(portfolio ?? {}).reduce(
      (acc, crr) => {
        const data = portfolio[crr];
        acc.investedAmount += data.summary?.investedAmount ?? 0;
        acc.changeAmount += data.summary?.changeAmount ?? 0;
        acc.change += data.summary?.change ?? 0;
        return acc;
      },
      {
        investedAmount: 0,
        changeAmount: 0,
        change: 0,
      },
    );
  }, []);

  function createGradient(color1: any, color2: any) {
    return {
      radialGradient: {
        cx: 0.5,
        cy: 0.3,
        r: 0.5,
      },
      stops: [
        [0, color1],
        [1, color2], // darken
      ],
    };
  }

  const handleInfinity = useCallback((arg: number) => {
    if (arg === Infinity || Number.isNaN(arg)) return 100;
    return arg;
  }, []);

  const {categories: chartData, chartColor} = useMemo(() => {
    const categories: any[] = [];

    const chartColor: any = [];
    let color = COLORS['white'];
    const sba7Obj = {
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
        investedValue: 0,
      },
      assets: [],
    };
    const newPortfolio = {
      ...portfolio,
      sba7: sba7Obj,
    };

    Object.keys(newPortfolio ?? {})?.map((name, index) => {
      const portfolioData = newPortfolio[name]?.summary;
      const {investedValue, gainLoss, gainLossPercentage, currentValue} =
        portfolioData ?? {};

      const z = !!currentValue ? index + 1 : 0;

      {
        gainLoss == 0
          ? (color = COLORS['white'])
          : gainLoss > 0
          ? (color = COLORS['green'])
          : (color = COLORS['red']);
      }
      const catName = name[0].toUpperCase() + name.slice(1, name.length);

      // In future require this code for music and another assets
      // if (catName !== 'Crypto') {
      //   if (Math.abs(z) > 0) {
      //     categories.push({
      //       name: catName,
      //       y: handleInfinity(
      //         (investedValue / (allInvestedPrice + balance)) * 100,
      //       ),
      //       z: Math.abs(z),
      //       lgColor: color,
      //       percent: formatNumber(gainLoss, 2),
      //       gainLoss: '$' + formatNumberInShortForDecimal(gainLoss),
      //       changePercentage: formatNumber(gainLossPercentage, 2),
      //       currentPrice: '$' + formatNumber(currentValue, 2),
      //     });
      //     chartColor.push(
      //       createGradient(
      //         CHART_COLORS?.[name]?.[0],
      //         CHART_COLORS?.[name]?.[1],
      //       ),
      //     );
      //   }
      // }
      if (catName === 'Privates' || catName === 'Sba7') {
        if (Math.abs(z) > 0) {
          categories.push({
            name: catName,
            y: handleInfinity(
              (investedValue / (allInvestedPrice + balance)) * 100,
            ),
            z: Math.abs(z),
            lgColor: color,
            percent: formatNumber(gainLoss, 2),
            gainLoss: '$' + formatNumberInShortForDecimal(gainLoss),
            changePercentage: formatNumber(gainLossPercentage, 2),
            currentPrice: '$' + formatNumber(currentValue, 2),
          });
          chartColor.push(
            createGradient(
              CHART_COLORS?.[name]?.[0],
              CHART_COLORS?.[name]?.[1],
            ),
          );
        }
      }
    });

    const Wallet = {
      changePercentage: '$0.00',
      currentPrice: '$' + formatNumber(balance, 2),
      gainLoss: '$0.00',
      lgColor: color,
      name: 'Cash Balance',
      percent: '$0.00',
      y: (balance / (allInvestedPrice + balance)) * 100,
      z: 4,
    };
    categories.push(Wallet);
    chartColor.push(
      createGradient(CHART_COLORS?.['cash']?.[0], CHART_COLORS?.['cash']?.[1]),
    );

    return {categories, chartColor};
  }, [portfolio, balance, isFocuse]);

  const accountFortress = useCallback(() => {
    get(APIS.fortressAccountInfo)
      .then(res => {
        if (res.data) {
          setAccountInfo(res.data);
          setFortressLoader(false);
        }
      })
      .catch(() => {
        setFortressLoader(false);
      });
  }, []);

  useEffect(() => {
    setFortressLoader(true);
    setTimeout(() => {
      accountFortress();
    }, 10000);
  }, [isFocuse]);

  const onRefresh = useCallback(() => {
    accountFortress();
  }, []);

  // Transaction Function

  const statusCardList = useMemo(() => {
    return walletTransaction
      .slice(0, 4)
      .map((item, index) => (
        <TransactionRow item={item} key={index} navigation={navigation} />
      ));
  }, [walletTransaction]);

  useEffect(() => {
    setLoad(true);
    get(APIS.walletTransaction)
      .then(res => {
        if (res?.data) {
          setalletTransaction(res.data);
        }
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        ErrorAlert('Error', error);
      });
  }, [isFocuse]);

  // Bank Details

  useEffect(() => {
    setLoading(true);
    get(APIS.GetBankAccounts)
      .then(res => {
        if (res?.data) {
          setBankAccouts(res.data);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        ErrorAlert('Error', error);
      });
  }, [isFocuse]);

  if (loading || fortressLoader) return <Loader />;
  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <View
        style={[
          styles.details,
          {
            marginBottom:
              profileData?.email && profileData?.isVerifiedEmail ? 80 : 170,
          },
        ]}>
        <FlatListScroll
          style={styles.listContainer}
          contentContainerStyle={{paddingBottom: 20}}
          data={singlePortfolio}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
          renderItem={({item, index}) => {
            // TODO: fix this
            const renders: any = [];
            if (index === 0) {
              renders.push(
                <View style={{marginTop: 20}}>
                  <View style={{marginHorizontal: 10}}>
                    <Text style={styles.cashtxt}>Cash balance</Text>
                    <Text style={[styles.balancetxt, {color: colors.text}]}>
                      {AccountInfo?.balance
                        ? '$' +
                          formatNumberInShortForDecimal(AccountInfo?.balance)
                        : NO_DATA}
                    </Text>
                  </View>
                  <View style={styles.customeButtonView}>
                    <View style={{flex: 1}}>
                      <CustomButton
                        label={TRANSACTION_TYPE.Withdraw}
                        onPress={() =>
                          navigation.navigate(Routes.DepositScreen, {
                            transactionType: TRANSACTION_TYPE.Withdraw,
                          })
                        }
                        disabled={!balance || balance == 0}
                        isDarkButton={true}
                        customButtonStyle={[
                          styles.button,
                          {
                            marginRight: 7,
                            borderWidth: 1,
                            borderColor: COLORS['dark_blue2'],
                          },
                        ]}
                        labelStyle={[
                          styles.buttonText,
                          {color: COLORS['dark_blue2']},
                        ]}
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <CustomButton
                        label={TRANSACTION_TYPE.Deposite}
                        onPress={() => {
                          navigation.navigate(Routes.DepositScreen, {
                            transactionType: TRANSACTION_TYPE.Deposite,
                          });
                        }}
                        isDarkButton={true}
                        customButtonStyle={[
                          styles.button,
                          {
                            marginLeft: 7,
                            backgroundColor: COLORS['dark_blue2'],
                          },
                        ]}
                        labelStyle={styles.buttonText}
                      />
                    </View>
                  </View>
                  <AddBalanceButton
                    icon={BankLine}
                    label={SELECT_ACCOUNT.BankAccount}
                    textColor={COLORS['dark_blue2']}
                    number={bankAccouts?.length + ' Accounts'}
                    buttonStyle={{
                      margin: 10,
                      backgroundColor: colors.ground,
                      borderColor: colors.box,
                      borderWidth: 1,
                    }}
                    onPress={() => navigation.navigate(Routes.BankAccounts)}
                    // Routes.BankAccounts
                  />
                  <PolarPieChart data={chartData} colors={chartColor} />
                </View>,
              );
              renders.push(
                <DynamicPortfolio
                  portfolio={singlePortfolio}
                  AccountInfo={AccountInfo}
                  navigation={navigation}
                />,
              );
            }
            renders.push(
              <OverallDetails navigation={navigation} details={item} />,
            );
            if (index === singlePortfolio.length - 1) {
              renders.push(
                <>
                  <View style={styles.recentView}>
                    <Text style={[styles.headerText, {color: colors.text}]}>
                      Recent Transactions
                    </Text>
                    <Text
                      style={[
                        styles.headerText,
                        {color: COLORS['color-yellow']},
                      ]}
                      onPress={() =>
                        navigation.navigate(Routes.WalletTransactions)
                      }>
                      View All
                    </Text>
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled>
                    <View style={{paddingHorizontal: 15}}>
                      {load ? (
                        <ActivityIndicator
                          size={'small'}
                          style={{paddingTop: 10}}
                        />
                      ) : walletTransaction.length != 0 ? (
                        statusCardList
                      ) : (
                        <Text style={[styles.noDataText, {color: colors.text}]}>
                          NO TRANSACTION FOUND
                        </Text>
                      )}
                    </View>
                  </ScrollView>
                </>,
              );
            }

            return renders;
          }}
          keyExtractor={item => item.index}
        />
      </View>
    </View>
  );
};
