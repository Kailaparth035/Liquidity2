import Toast from 'react-native-root-toast';

export const toast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: false,
    animation: true,
    hideOnPress: false,
    delay: 0,
  });
};
