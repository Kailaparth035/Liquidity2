import {Alert} from 'react-native';

export const ErrorAlert = (
  title: string,
  errorMsg: string,
  pressOk?: () => void,
  pressCancel?: () => void,
) => {
  return Alert.alert(
    title, // Title of the alert
    errorMsg, // Message of the alert
    [
      // Buttons in the alert
      {
        text: 'OK', // Button text
        onPress: pressOk,
      },
      {
        text: 'Cancel', // Button text
        onPress: pressCancel,
        style: 'cancel', // Set style to 'cancel' to show a cancel button
      },
    ],
    {cancelable: false}, // Set cancelable to false to prevent dismissal by tapping outside the alert
  );
};
