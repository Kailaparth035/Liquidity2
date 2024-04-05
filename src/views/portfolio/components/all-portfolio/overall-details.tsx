import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {COLORS} from '../../../../assets';
import {ASSETS_TO_SINGULAR} from '../../../../constants';
import {useCurrency} from '../../../../hooks/use-currency';
import {ImageView} from '../../../../storybook/image';
import {
  capitalize,
  formatNumber,
  formatNumberInShortForDecimal,
} from '../../../utils';

import {allPortfolioStyles as styles} from './all-portfolio.styles';

export const OverallDetails = ({details, navigation}: any) => {
  const {summary, type, assets} = details;
  const {colors} = useTheme();

  let logos = assets.map((asset: any) => asset.logo) ?? [];
  logos = logos.slice(0, 4);
  const {
    investedAmount,
    currentValue,
    gainLoss,
    gainLossPercentage,
    investedValue,
  } = summary;
  const txtColor =
    gainLossPercentage > 0
      ? COLORS['price-up']
      : gainLossPercentage === 0
      ? colors.text
      : COLORS['price-down'];

  const handleNavigate = useCallback(
    (type: string) => {
      navigation.navigate(
        type === 'privates' ? 'Pre-IPO' : ASSETS_TO_SINGULAR[type],
      );
    },
    [navigation],
  );

  const borderColor = useCallback((type: string) => {
    switch (type) {

      // In future require this code for music and another assets
      
      // case 'stocks':
      //   return COLORS['color-radial-skyblue'];
      // case 'crypto':
      //   return COLORS['color-radial-green'];
      // case 'commodities':
      //   return COLORS['color-radial-orange'];
      // case 'forex':
      //   return COLORS['color-radial-blue'];
      // case 'music':
      //   return COLORS['color-radial-purple'];
      case 'privates':
        return COLORS['dark_blue2'];
      case 'sba7':
        return COLORS['yellow'];
      default:
        return COLORS['color-radial-red'];
    }
  }, []);

  return type === 'crypto' ? null : (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.listItem,
          {marginBottom: type === 'commodities' ? 28 : 0},
          {backgroundColor: colors.ground, borderColor: colors.box},
        ]}
        key={`${type}_${investedAmount}`}
        activeOpacity={0.8}
        onPress={() => handleNavigate(type)}>
        <View
          style={[styles.listTitle, , {borderLeftColor: borderColor(type)}]}>
          <Text style={[styles.listTxt, {color: colors.text}]}>
            {capitalize(type === 'privates' ? 'Pre-IPO' : type)}
          </Text>
          <Icon
            name="angle-right"
            size={16}
            style={[styles.iconColor, {color: colors.text}]}
          />
        </View>
        <View style={[styles.currentContainer, {borderTopColor: colors.box}]}>
          <View style={styles.current}>
            <View style={styles.biSection}>
              <Text style={[styles.title]}>Current</Text>
              <Text style={[styles.value, {color: colors.text}]}>
                ${formatNumberInShortForDecimal(currentValue)}
              </Text>
            </View>
            <View style={styles.biSection}>
              <View>
                <Text style={[styles.title]}>
                  Invested
                </Text>
                <Text style={[styles.value, {color: colors.text}]}>
                  ${formatNumberInShortForDecimal(investedValue)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.invested}>
            <View style={styles.biSection}>
              <Text style={[styles.title]}>P&L</Text>
              <Text style={[styles.value, {color: colors.text}]}>
                ${formatNumberInShortForDecimal(gainLoss)}
                <Text style={[styles.value, {color: txtColor}]}>
                  ({formatNumber(gainLossPercentage ?? 0, 2)}%)
                </Text>
              </Text>
            </View>
            <View style={styles.imgContain}>
              {logos.map((logo: string) => (
                <ImageView
                  url={logo}
                  alt=""
                  height={24}
                  width={24}
                  source={{uri: logo}}
                  style={styles.img}
                  key={logo}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
