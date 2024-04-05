import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {formatNumberInShort} from '../../views/utils';

const MusicState = ({item}) => {
  const {colors} = useTheme();

  const [stateValue, setStateValue] = useState(0);

  useEffect(() => {
    const randomeNumber = (Math.random() * 121231231).toFixed(2);
    setStateValue(randomeNumber);
  }, []);

  return (
    <View style={{marginTop: 4, flex: 1}}>
      <View style={styles.container}>
        <Text
          style={[styles.amount_text, {color: colors.text}]}
          numberOfLines={1}>
          {item.name}
        </Text>
        <Text
          style={[styles.amount_number, {color: colors.text}]}
          numberOfLines={1}>
          {formatNumberInShort(item.value)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 4,
  },
  amount_text: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  amount_number: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    paddingVertical: 4,
  },
});

export default MusicState;
