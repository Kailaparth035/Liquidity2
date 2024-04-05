import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  InputAccessoryView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {
  Svg_Alert_Warning_Line,
  Svg_Stop_Circle_Line,
  Svg_Store_Fill,
  Svg_Checkbox_Circle_Fill,
  COLORS,
} from '../../../assets';
import {useCurrency} from '../../../hooks/use-currency';
import {SVG} from '../../../storybook/svg';
import {capitalize} from '../../utils';
import {DetailsStyles as styles} from './buy-details.styles';
import {OrderFooter} from './orderFooter';
import {Exclaimnation} from '../../../assets/images';

type BuyType = 'market' | 'limit' | 'stoploss';

const types: {name: BuyType; icon: string; isDisable: boolean}[] = [
  {name: 'limit', icon: Svg_Alert_Warning_Line, isDisable: false},
  {name: 'stoploss', icon: Svg_Stop_Circle_Line, isDisable: true},
  {name: 'market', icon: Svg_Store_Fill, isDisable: true},
];

export const OrderForm = ({
  buySellForm,
  handleForm,
  setTogglevalue,
  goodTillCancelValue,
  isOrderModifying,
  totalPrice,
  handleBuySell,
  tab,
}: any) => {
  const [type, setType] = useState<BuyType>('limit');

  const buy_buttonFieldRef: any = useRef();

  const {currencyCode} = useCurrency();
  const {colors} = useTheme();

  const afterDecimalPrice = (digit: any) => {
    return digit.indexOf('.') > 0
      ? digit.split('.').length >= 2
        ? digit.split('.')[0] + '.' + digit.split('.')[1].substring(-1, 4)
        : digit
      : digit;
  };

  return (
    <View style={styles.form}>
      <View style={styles.formContain}>
        {types.map(({name, icon, isDisable}) => (
          <TouchableOpacity
            style={[
              styles.radioBox,
              type === name && styles.radioBoxActive,
              {borderColor: colors.radiobutton},
              isDisable && styles.radioBoxDisable,
              {backgroundColor: colors.border},
            ]}
            onPress={() => setType(name)}
            key={name}
            disabled={isDisable}>
            {type === name && (
              <View style={styles.checkbox}>
                <SVG name={Svg_Checkbox_Circle_Fill} width={16} />
              </View>
            )}

            <View style={styles.radioView}>
              <SVG
                name={icon}
                width={18}
                color={
                  type === name ? colors.text : COLORS['color-text-dark-40']
                }
              />
              <Text
                style={[styles.typeTxt, type === name && {color: colors.text}]}>
                {capitalize(name)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {!isOrderModifying && (
        <>
          <View style={styles.goodTillcancelView}>
            <View style={styles.goodTillcancelTextView}>
              <Text style={[styles.goodTillCancelText, {color: colors.text}]}>
                Good till cancelled
              </Text>
              <Image source={Exclaimnation} style={styles.exclaimanationIcon} />
            </View>
            <TouchableOpacity
              onPress={() => setTogglevalue()}
              style={[
                styles.toggleView,
                {
                  backgroundColor: goodTillCancelValue
                    ? COLORS['primary-light']
                    : colors.box,

                  alignItems: goodTillCancelValue ? 'flex-end' : 'flex-start',
                },
              ]}>
              <TouchableOpacity
                onPress={() => setTogglevalue()}
                style={styles.toggleButton}
              />
            </TouchableOpacity>
          </View>

          {!goodTillCancelValue && (
            <Text style={[styles.orderCloseTimeText, {color: colors.text}]}>
              This order will expire at 12:00 AM EST
            </Text>
          )}
        </>
      )}

      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <View style={{width: '46%', marginHorizontal: 8}}>
          <View style={styles.label}>
            <Text style={[styles.labelText, {color: colors.text}]}>
              Quantity
            </Text>
          </View>
          <TextInput
            style={[styles.formInput, {color: colors.text}]}
            onChangeText={txt => handleForm('quantity', txt)}
            value={buySellForm.quantity}
            placeholder="Enter Quantity"
            maxLength={10}
            keyboardType="number-pad"
            inputAccessoryViewID="buy_button"
            placeholderTextColor={colors.placeholderText}
          />
          {/* <InputAccessoryView nativeID="buy_button">
            <OrderFooter
              totalPrice={totalPrice}
              handleBuySell={handleBuySell}
              tab={tab}
            />
          </InputAccessoryView> */}
        </View>
        <View style={{width: '46%', marginHorizontal: 8}}>
          <View style={styles.label}>
            <Text style={[styles.labelText, {color: colors.text}]}>Price</Text>
          </View>
          <View style={{position: 'absolute', top: 30, right: 10}}>
            <Text
              style={{color: COLORS['color-text-dark-60'], fontWeight: '500'}}>
              {currencyCode}
            </Text>
          </View>
          <TextInput
            style={[styles.formInput, {color: colors.text}]}
            onChangeText={txt => handleForm('price', afterDecimalPrice(txt))}
            value={buySellForm?.price}
            placeholder="Enter Price"
            maxLength={20}
            keyboardType="numeric"
            editable={type === 'market' ? false : true}
            ref={buy_buttonFieldRef}
            inputAccessoryViewID="buy_button"
            placeholderTextColor={colors.placeholderText}
          />
        </View>
      </View>
      {type === 'stoploss' && (
        <View style={{marginHorizontal: 8, marginTop: 16}}>
          <View style={styles.label}>
            <Text style={styles.labelText}>Trigger Price</Text>
          </View>
          <View style={{position: 'absolute', top: 30, right: 10}}>
            <Text
              style={{color: COLORS['color-text-dark-60'], fontWeight: '500'}}>
              {currencyCode}
            </Text>
          </View>
          <TextInput
            style={styles.formInput}
            onChangeText={txt =>
              handleForm('targetPrice', afterDecimalPrice(txt))
            }
            value={buySellForm.targetPrice}
            placeholder="Enter Price"
            maxLength={10}
            keyboardType="numeric"
            ref={buy_buttonFieldRef}
            inputAccessoryViewID="buy_button"
          />
        </View>
      )}
    </View>
  );
};
