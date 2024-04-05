import React from 'react';
import {Alert, Modal, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ConnectionStyles as styles} from './connection.styles';
import WalletDeposit from './wallet-deposit-connect';

const Connection = ({isOpen, setIsOpen, data}: any) => {
  const {colors} = useTheme();
  return (
    <View style={styles.backdrop}>
      <Modal
        style={styles.modalSize}
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsOpen((preState: any) => !preState);
        }}>
        <View style={[styles.modalView, {backgroundColor: colors.ground}]}>
          <WalletDeposit data={data}/>
        </View>
      </Modal>
    </View>
  );
};

export default Connection;
