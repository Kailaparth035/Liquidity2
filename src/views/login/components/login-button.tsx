import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {COLORS} from '../../../assets';
import {Routes} from '../../routes/constants';
import {styles} from './login-button-styles';

const LoginButton = ({navigation}: any) => {
  return (
    <View style={styles.containter}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(Routes.Login)}>
        <Text style={{color: '#ffffff'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginButton;
