// @flow
import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../assets';
import {CheckCircle, DropDownArrow, DropUpArrow} from '../../../assets/images';
import RadioButton from './RadioButton';
import {BankDetailsCardStyles} from './BankDetailsCard.style';
import {getBankLogo} from '../../../helpers/getBankLogo';
import {SVG} from '../../../storybook/svg';
import {BankAccountMetadataType} from '../../../views/profile/components/bank-accounts/types';

type BankDetailsCardType = {
  Button?: boolean;
  bank?: BankAccountMetadataType;
  showOption?: boolean;
  onChangePress?: () => void;
  onDropDownPress?: () => void;
  onRadioPress?: any;
  selectedAccount?: string;
};

const BankDetailsCard = ({
  showOption = false,
  bank,
  onChangePress,
  onDropDownPress,
  onRadioPress,
  Button = false,
  selectedAccount,
}: BankDetailsCardType) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        BankDetailsCardStyles.parent,
        {backgroundColor: colors.headerCard},
        showOption
          ? {borderColor: COLORS['blue_border']}
          : {borderColor: colors.headerCard},
      ]}>
      <View
        style={[
          BankDetailsCardStyles.directionRow,
          {
            borderBottomColor: colors.border,
            borderBottomWidth: showOption ? 1 : 0,
          },
        ]}>
        <View style={BankDetailsCardStyles.image}>
          <SVG
            name={getBankLogo[`${bank?.bankName}`] ?? getBankLogo['default']}
          />
        </View>
        <View style={BankDetailsCardStyles.textcontainer}>
          <Text style={[BankDetailsCardStyles.title, {color: colors.text}]}>
            {bank?.bankName}
          </Text>
          <View style={BankDetailsCardStyles.subTitleContaoiiner}>
            <Text
              style={[
                BankDetailsCardStyles.subTitleText,
                {color: colors.lightText},
              ]}>
              {bank?.accounts[0].subtype}
            </Text>
            <Text
              style={[
                BankDetailsCardStyles.subTitleText,
                {color: colors.lightText},
              ]}>
              {'       '} {bank?.accounts[0].mask}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          {Button ? (
            <TouchableOpacity
              onPress={onChangePress}
              style={[
                BankDetailsCardStyles.changeButton,
                {backgroundColor: colors.box},
              ]}>
              <Text
                style={[
                  BankDetailsCardStyles.changeButtonLable,
                  {color: colors.text},
                ]}>
                Change
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              {showOption ? (
                <Image
                  source={CheckCircle}
                  style={BankDetailsCardStyles.CheckCircle}
                />
              ) : null}
              <TouchableOpacity
                onPress={onDropDownPress}
                style={BankDetailsCardStyles.dropDownButton}>
                <Image source={showOption ? DropUpArrow : DropDownArrow} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <View
        style={[
          BankDetailsCardStyles.RadioButtonContainer,
          {backgroundColor: colors.headerCard, padding: showOption ? 12 : 0},
        ]}>
        {showOption
          ? bank?.accounts.map(item => (
              <RadioButton
                onPress={() => {
                  const obj = {
                    accounts: [item],
                    bankName: bank.bankName,
                    id: bank._id,
                  };
                  onRadioPress(bank, item, obj);
                }}
                subType={item.subtype}
                mask={item.mask}
                isSelected={item.accountId === selectedAccount}
              />
            ))
          : null}
      </View>
    </View>
  );
};

export default BankDetailsCard;
