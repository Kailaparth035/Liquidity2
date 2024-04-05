// @flow
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../assets';
import {useTheme} from '@react-navigation/native';

type StatusBlockType = {
  title: string;
  value: string;
  isYourHighestBid?: boolean;
};

const StatusBlock = ({
  title,
  value,
  isYourHighestBid = false,
}: StatusBlockType) => {
  const {colors} = useTheme();
  return (
    <View style={styles.parent}>
      <View>
        <Text style={[styles.titleText, {color: colors.lightText}]}>
          {title}
        </Text>
        <View style={styles.statusConatiner}>
          <Text
            style={{
              color:
                title == 'Time left to next step'
                  ? COLORS['primary-dark']
                  : colors.text,
              fontSize: 14,
              lineHeight: 20,
              fontWeight: '500',
            }}>
            {value === 'Live' ? (
              <>
                <Text style={styles.dot}>• </Text> {value}
              </>
            ) : (
              value
            )}
          </Text>
          {isYourHighestBid ? (
            <View style={styles.higestBidContainer}>
              <Text style={[styles.titleText, {color: colors.text}]}>
                Highest
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {marginBottom: 8},
  titleText: {fontSize: 12, lineHeight: 16, fontWeight: '500'},
  higestBidContainer: {
    backgroundColor: 'rgba(51, 184, 122, 0.24)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
  },
  dot: {fontSize: 22, color: 'green'},
  statusConatiner: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
});
export default StatusBlock;
