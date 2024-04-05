import {useState, useEffect} from 'react';
import {Platform} from 'react-native';

export const usePlatform = () => {
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    setPlatform(Platform.OS);
    if (Platform.OS === 'android') {
      setIsAndroid(true);
    } else {
      setIsIOS(true);
    }
  }, []);

  return {
    platform,
    isAndroid,
    isIOS,
  };
};
