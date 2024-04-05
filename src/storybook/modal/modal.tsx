import React, {FC} from 'react';
import {View} from 'react-native';
import ReactModal from 'react-native-modal';

import {styles} from './modal.styles';

export const Modal: FC<any> = ({
  isModal,
  setIsModal,
  animationInTiming = 500,
  animationOutTiming = 500,
  children,
}: any) => {
  return (
    <ReactModal
      isVisible={isModal}
      onBackdropPress={() => setIsModal(false)}
      backdropColor="#212121"
      backdropOpacity={0.7}
      //animationIn="zoomInUp"
      //animationOut="zoomOutDown"
      animationInTiming={animationInTiming}
      animationOutTiming={animationOutTiming}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View style={styles.container}>{children}</View>
    </ReactModal>
  );
};
