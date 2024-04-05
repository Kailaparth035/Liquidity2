import React, {FC} from 'react';
import { View, ViewProps} from 'react-native';

import { Container as styles } from './container.styles';

export const Container: FC<ViewProps> = ({children, ...props}) => {
  return (
    <View style={styles.containerView} {...props}>
      {children}
    </View>
  );
};
