import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Screen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.amount_text} numberOfLines={1}>
        Total Amount Paid to Artist
      </Text>
      <Text style={styles.amount_number} numberOfLines={1}>
        33.28M
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  amount_text: {
    fontSize: 15,
    color: 'white',
  },
  amount_number: {
    marginTop: 5,
    fontSize: 17,
    color: 'white',
  },
});

export default Screen2;
