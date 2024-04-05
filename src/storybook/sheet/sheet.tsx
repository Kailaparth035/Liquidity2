import React, {FC, useState, useRef} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import ReactModal from 'react-native-modal';

import {styles} from './sheet.styles';
import {useKeyboard} from '../../hooks/use-keyboard';

export const Sheet: FC<any> = ({
  isModal,
  setIsModal,
  height,
  children,
  backgroundColor,
}: any) => {
  const scrollViewRef: any = useRef(null);
  const {isKeyboardVisible} = useKeyboard();

  const [scrollOffset, setScrollOffset] = useState(0);
  const {colors} = useTheme();

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <ReactModal
      isVisible={isModal}
      onSwipeComplete={() => setIsModal(false)}
      onBackdropPress={() => setIsModal(false)}
      swipeDirection={['down']}
      scrollOffset={scrollOffset}
      scrollOffsetMax={100} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.modal}>
      <View
        style={[
          styles.container,
          {
            maxHeight: height ?? 660,
            backgroundColor: backgroundColor ?? colors.ground,
          },
        ]}>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: isKeyboardVisible ? 330 : 0}}
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ReactModal>
  );
};
