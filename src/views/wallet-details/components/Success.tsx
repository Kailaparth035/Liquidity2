// @flow
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Image, Text} from 'react-native';
import {ArrowDown, ArrowUp} from '../../../assets/images';
import {styles} from './SuccessCard.style';
import {COLORS} from '../../../assets';

type SuccessCardType = {
  amount?: string;
  days?: string;
  status?: string;
  type?: string;
};

const SuccessCard = ({amount, days, status, type}: SuccessCardType) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={[styles.image, {backgroundColor: colors.headerCard}]}>
          <Image
            source={type == 'Deposit' ? ArrowDown : ArrowUp}
            style={styles.arrowIcon}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.titleText, {color: colors.text}]}>{type}</Text>
          <Text style={[styles.subTitle, {color: colors.lightText}]}>
            Transaction Id
          </Text>
        </View>
        <View style={[styles.textContainer, {alignItems: 'flex-end'}]}>
          <Text style={[styles.titleText, {color: colors.text}]}>
            {'$' + amount ?? '----'}
          </Text>
          <View style={[styles.successContainer, {marginTop: 0}]}>
            <View
              style={[
                styles.processStatusView,
                {
                  backgroundColor:
                    status === 'Completed'
                      ? COLORS.green_dot
                      : status === 'Processing'
                      ? COLORS['color-yellow']
                      : COLORS.red,
                },
              ]}
            />
            <Text style={[styles.successText, {color: colors.lightText}]}>
              {status ?? '----'}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bankDetailsView}>
        <Text style={[styles.subTitle, {color: colors.lightText}]}>
          Bank of America (****-1234)
        </Text>
        <Text style={[styles.subTitle, {color: colors.lightText}]}>
          {days ?? '----'}
        </Text>
      </View>
    </>
  );
};

export default SuccessCard;
