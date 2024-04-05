import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {COLORS} from '../../../../assets';
import {styles} from './logout.styles';

import {useLogout} from '../../../../hooks';

const Logout = () => {
  const {logout} = useLogout();

  return (
    <TouchableOpacity style={styles.container} onPress={logout}>
      <Icon name="logout" size={18} color={COLORS['white']} />
      <Text style={styles.txt}>Logout</Text>
    </TouchableOpacity>
  );
};

export default Logout;
