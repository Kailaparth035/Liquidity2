import React, {FC, useMemo, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {NO_DATA} from '../../../../../constants';
import {COLORS} from '../../../../../assets';
import {useCurrency} from '../../../../../hooks/use-currency';
import {useFortressAccountInfo} from '../../../../../hooks/use-fortressAccountInfo';
import {numberDecimalFormat} from '../../../../../libs';
import {formatNumber, formatNumberInShortForDecimal} from '../../../../utils';
import {InfoDataState} from '../../../../../states';

import {dynamicPortfolioStyles as styles} from './dynamic-portfolio.styles';
interface IProps {
  navigation: any;
  portfolio: any[];
  AccountInfo: any;
}

const DynamicPortfolio: FC<IProps> = ({portfolio, AccountInfo, navigation}) => {
  const {formatCurrency} = useCurrency();
  const {colors} = useTheme();
  const info = useRecoilValue(InfoDataState);
  const [changeAmountCount, setChangeAmountCount] = useState(1);
  const balance = parseFloat(AccountInfo?.balance ?? 0);

  const {investedAmount, currentValue, gainLoss, changeAmount} = useMemo(() => {
    return portfolio.reduce(
      (acc, crr) => {
        acc.investedAmount += crr.summary?.investedValue ?? 0;
        acc.gainLoss += crr.summary?.gainLoss ?? 0;
        acc.changeAmount += crr.summary?.gainLossPercentage ?? 0;
        acc.currentValue += crr.summary?.currentValue ?? 0;
        return acc;
      },
      {
        investedAmount: 0,
        gainLoss: 0,
        changeAmount: 0,
        currentValue: 0,
      },
    );
  }, [portfolio]);

  const totalCurrent = useMemo(() => {
    if (!balance) {
      return currentValue;
    } else {
      return currentValue + balance;
    }
  }, [currentValue, balance]);

  const getDynamicValue = (type: string) => {
    const found = portfolio.find(port => port.type === type);
    if (found) {
      return formatNumber(
        ((found.summary.investedValue ?? 0) / (investedAmount + balance || 1)) *
          100,
      );
    }
    return '0';
  };

  useEffect(() => {
    if (portfolio.length !== 0) {
      let count = 0;
      portfolio.map(item => {
        if (item.summary.gainLossPercentage !== 0) {
          count += 1;
        }
      });
      setChangeAmountCount(count);
    } else {
      setChangeAmountCount(1);
    }
  }, []);

  const investedvalue = formatCurrency(investedAmount, 2);
  const investedvalueFormat = investedvalue.slice(1, investedvalue.length);

  const WalletPercent =
    ((balance ?? 0) / (investedAmount + balance || 1)) * 100;
  const WalletPercentFormate = WalletPercent.toFixed(2);

  let color = colors.text;
  if (changeAmount !== 0) {
    color = /-/gi.test(changeAmount)
      ? COLORS['price-down']
      : COLORS['price-up'];
  }

  const portfolioBalance = balance + investedAmount;
  const renderItem = (title: string, dynamic: any, borderColor: string) => {
    return (
      <View style={[styles.line, {borderColor}]}>
        <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.dynamicValue, {color: colors.text}]}>
          {dynamic === 'NaN' ? 0 : dynamic}%
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingVertical: 0}]}>
      <View style={styles.row}>
        <View style={[styles.item, {flex: 1, justifyContent: 'flex-end'}]}>
          <Text style={[styles.label]}>Invested</Text>
          <Text style={[styles.value, {color: colors.text}]}>
            ${formatNumberInShortForDecimal(investedAmount)}
          </Text>
        </View>
        <View style={styles.dot} />
        <View style={[styles.item, {flex: 1, justifyContent: 'flex-start'}]}>
          <Text style={[styles.label]}>
            P&L{' '}
            <Text style={[styles.value, {color: colors.text}]}>
              $ {formatNumberInShortForDecimal(gainLoss)}{' '}
              <Text style={[styles.dynamic, {color}]}>
                (
                {numberDecimalFormat((gainLoss / investedAmount) * 100, 2) ===
                'NaN'
                  ? 0
                  : numberDecimalFormat((gainLoss / investedAmount) * 100, 2)}
                %)
              </Text>
            </Text>
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.viewBalance,
          {backgroundColor: colors.ground, flexDirection: 'column'},
        ]}>
        <View>
          <Text style={[styles.balance, {color: colors.text}]}>
            {totalCurrent
              ? '$' + formatNumberInShortForDecimal(totalCurrent)
              : NO_DATA}
          </Text>
          <Text style={[styles.walletText, {color: colors.lightText}]}>
            Portfolio balance
          </Text>
        </View>
        <View
          style={[styles.verticleLine, {backgroundColor: colors.text}]}></View>
        <View>
          <Text style={[styles.balance, {color: colors.text}]}>
            {balance ? '$' + formatNumberInShortForDecimal(balance) : NO_DATA}
          </Text>
          <Text style={[styles.walletText, {color: colors.lightText}]}>
            Cash balance
          </Text>
        </View>
      </View>

      <View style={[styles.viewContainer, {paddingHorizontal: 10}]}>
        {/* <View style={{flex: 1}}> */}
        {renderItem(
          'Pre-IPO',
          getDynamicValue('privates'),
          COLORS['dark_blue2'],
        )}
        {renderItem('SBA7', getDynamicValue('sba7'), COLORS['yellow'])}
        {renderItem('Cash Balance', WalletPercentFormate, COLORS['green'])}

        {/*  In future require this code for music and another assets */}
        {/* </View> */}
        {/* <View style={{flex: 1}}>
          {renderItem(
            'Music',
            getDynamicValue('music'),
            COLORS['color-radial-purple'],
          )}
          {renderItem(
            'Commodities',
            getDynamicValue('commodities'),
            COLORS['color-radial-orange'],
          )}
        </View>
        <View style={{flex: 1}}>
          {renderItem(
            'Stocks',
            getDynamicValue('stocks'),
            COLORS['color-radial-skyblue'],
          )}
          {renderItem(
            'Cash Balance',
            WalletPercentFormate,
            COLORS['color-radial-green'],
          )} */}
        {/* </View> */}
      </View>
    </View>
  );
};

export default DynamicPortfolio;
