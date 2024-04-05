import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Screen1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.heder}>
        <Image
          source={require('./image/spotify_logo.png')}
          style={{height: 30, width: 30, resizeMode: 'contain', left: 10}}
        />
        <Text style={styles.spotify_name}>Spotify</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'white'}}>Streams</Text>
          <Text style={{marginTop: 10, color: 'white'}}>Popularity</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: 'white'}}>1.3B</Text>
          <Text style={{marginTop: 10, color: 'white'}}>91/100</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  heder: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
  },
  spotify_name: {
    fontSize: 18,
    left: 17,
    paddingVertical: 3,
    marginBottom: 10,
    color: 'white',
    // paddingHorizontal: 15,
  },
});
export default Screen1;
