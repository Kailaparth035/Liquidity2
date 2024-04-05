import {useRecoilState} from 'recoil';
import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {Storages} from '../../constants';
import {IsConnectState, useInfo} from '../../states';
import { tokenStyles as styles } from './tokens.styles';

const Disconnect = () => {
  const [isConnection, setIsConnection] = useRecoilState(IsConnectState);

  const {removeItem} = useAsyncStorage(Storages.IsConnection);
  const {updateEvent} = useInfo();

  const disconnect = useCallback(() => {
    removeItem().then(() => {
      setIsConnection(false);
    });

    updateEvent({auth: false});
  }, [updateEvent, removeItem, setIsConnection]);

  return isConnection ? (
    <TouchableOpacity style={styles.disconnectBtn} onPress={disconnect}>
      <Text style={styles.disconnectTxt}>Disconnect</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.disconnectBtn}>
      <Text style={styles.disconnectTxt}>Not Connected</Text>
    </View>
  );
};

export default Disconnect;
