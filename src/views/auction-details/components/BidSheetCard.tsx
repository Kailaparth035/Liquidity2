// @flow
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import InfoBlock from './InfoBlock';
import FooterButtons from './FooterButtons';

type BidSheetCardType = {};

const BidSheetCard = ({}: BidSheetCardType) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.parent, {borderColor: colors.border}]}>
      <Text style={[styles.headerText, {color: colors.text}]}>
        LION TECHNOLOGIES, LLC
      </Text>
      <View style={styles.inBolckConatiner}>
        <InfoBlock title="Lender loan number" value="4196379100" />
        <InfoBlock title="First payment date" value="9/1/2022" />
      </View>
      <View style={styles.inBolckConatiner}>
        <InfoBlock title="Maturity date" value="8/1/2032" />
        <InfoBlock title="Original loan amount" value="$25,000.00" />
      </View>
      <View style={styles.inBolckConatiner}>
        <InfoBlock title="Current loan balance" value="$24,512.39" />
      </View>
      <View>
        <FooterButtons
          isligjhtBtn={true}
          lable1="Payment History"
          feededLable="View Details"
          style={{paddingVertical: 8}}
          lableStyle={{paddingVertical: 8}}
          customeStyle={{borderRadius: 8}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderWidth: 1,

    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  headerText: {fontSize: 14, lineHeight: 20, fontWeight: '600'},
  inBolckConatiner: {flexDirection: 'row', paddingTop: 8},
});
export default BidSheetCard;
