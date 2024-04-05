import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SVG} from '../../../../storybook';
import {COLORS} from '../../../../assets';
import {DELETE_SVG} from '../../../../assets/icon/svg/deleteIcon';
import {KYC_REVIRE_SVG} from '../../../../assets/icon/svg/kyc-review';
import {KYC_REJECT_SVG} from '../../../../assets/icon/svg/kyc-reject';
import {USER_ADD_SVG} from '../../../../assets/icon/svg/userAdd';
import {SATCHEL_SVG} from '../../../../assets/icon/svg/SATCHEL';
import {styles} from './style';

type NotificationCardType = {
  item: any;
  viewPress: any;
};

const NotificationCard = ({item, viewPress}: NotificationCardType) => {
  const {colors} = useTheme();
  const getIcon = (action: any) => {
    switch (action) {
      case 'remove': {
        return DELETE_SVG;
      }
      case 'kycReview': {
        return KYC_REVIRE_SVG;
      }
      case 'kycReject': {
        return KYC_REJECT_SVG;
      }
      case 'user': {
        return USER_ADD_SVG;
      }

      default:
        return SATCHEL_SVG;
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.crossConatiner}>
          <SVG name={getIcon(item.action)} width={20} height={20} />
        </View>
      </View>
      <View>
        <Text style={[styles.text, {color: colors.text}]}>{item.title}</Text>
        <Text style={[styles.subText, {color: colors.lightText}]}>
          {item.subTitle}
        </Text>
        {item.type == 'co-owner' ? (
          <View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={viewPress}>
              <Text style={[styles.subText, {color: COLORS['white']}]}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {item.status ? (
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.dot,
                {backgroundColor: item.status == 'Denied' ? 'red' : 'green'},
              ]}
            />
            <Text style={[styles.subText, {color: colors.text}]}>
              {item.status}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default NotificationCard;
