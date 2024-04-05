import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {useRecoilValue} from 'recoil';

import {KeyChainDataState} from '../../states';
import {copyTokenStyles as styles} from './copyToken.styles';

const CopyToken = () => {
  const keyChainData = useRecoilValue(KeyChainDataState);

  const handlerCopy = useCallback(() => {
    Clipboard.setString(keyChainData?.solana?.username);
  }, []);

  return (
    <View>
      {keyChainData?.solana?.username && (
        <View>
          <View style={styles.line} />
          <Text style={styles.publicKey}>My Wallet Address</Text>
          <View style={styles.copyContain}>
            <Text style={styles.copyTxt}>{keyChainData?.solana?.username}</Text>
          </View>
          <TouchableOpacity style={styles.copyBtn} onPress={handlerCopy}>
            <Text style={styles.copyImgTxt}>Copy</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CopyToken;
