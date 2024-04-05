import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const AssetDetailsTabLabel = ({title}: any) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.line} />
      <View>
        <Text style={styles.heading}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    width: 24,
    height: 4,
    backgroundColor: '#F5C462',
    borderRadius: 16,
  },
  heading: {
    color: '#F5C462',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
});
