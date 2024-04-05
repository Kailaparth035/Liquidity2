import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Screen1 from '../music/Screen1';
import Screen2 from '../music/Screen2';
import Screen3 from '../music/Screen3';
import Screen4 from '../music/Screen4';

const musicassets = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.title}>
        <Text style={styles.fontStyle}>Streams on Popular Platfrom</Text>
      </View>
      <View style={{height: 260}}>
        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({}) => {
            return <Screen1 />;
          }}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.title}>
          <Text style={styles.fontStyle}>State</Text>
        </View>

        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({}) => {
            return <Screen2 />;
          }}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>

      <View style={{flex: 1}}>
        <View style={styles.title}>
          <Text style={styles.fontStyle}>Devidend (Per share)</Text>
        </View>

        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={({}) => {
            return <Screen4 />;
          }}
          numColumns={2}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.title}>
          <Text style={styles.fontStyle}>
            --invest in other songs by this artist
          </Text>
        </View>

        <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({}) => {
            return <Screen3 />;
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingVertical: 10,
    borderBottomColor: 'white',
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    fontWeight: 500,
    fontSize: 16,
    color: 'white',
  },
  fontStyle: {
    fontWeight: 500,
    fontSize: 16,
    color: 'white',
  },
});

export default musicassets;
