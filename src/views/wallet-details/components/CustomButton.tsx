// @flow
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {customButtonStyles} from './CustomButton.style';
import {Loader} from '../../../storybook';

type CustomButtonType = {
  label: string;
  onPress: () => void;
  customButtonStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  isDarkButton?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
};

const CustomButton = ({
  label,
  onPress,
  customButtonStyle,
  labelStyle,
  isDarkButton = false,
  isLoading,
  disabled,
}: CustomButtonType) => {
  return (
    <View style={customButtonStyles.parent}>
      <TouchableOpacity
        style={
          isDarkButton
            ? [customButtonStyle, customButtonStyles.DarkButton]
            : [customButtonStyle, customButtonStyles.blueButton]
        }
        onPress={onPress}
        disabled={disabled}>
        {isLoading ? (
          <Loader top={0} size={'small'} />
        ) : (
          <Text
            style={[
              !disabled
                ? customButtonStyles.buttonText
                : customButtonStyles.diabledDarkButton,
              labelStyle,
            ]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
