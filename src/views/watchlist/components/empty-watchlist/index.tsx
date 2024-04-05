//import liraries
import {useTheme} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Empty_Watchlist} from '../../../../assets/images';
import {COLORS} from 'assets';
// create a component
const EmptyWatchlist = () => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.ground,
        },
      ]}>
      <Image
        source={Empty_Watchlist}
        style={{height: 120, width: 120, marginTop: -50}}
        resizeMode="contain"
      />
      <Text
        style={{
          textAlign: 'center',
          color: colors.text,
          fontSize: 20,
          marginTop: 20,
          paddingHorizontal: 40,
        }}>
        Your Watchlist is empty
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: colors.text,
          fontSize: 14,
          marginTop: 10,
          paddingHorizontal: 40,
        }}>
        Add assets to your watchlist to keep track of their performance.
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default EmptyWatchlist;
