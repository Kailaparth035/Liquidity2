import React, {FC} from 'react';
import {Button as NativeButton, ButtonProps} from 'react-native';

type Props = {
  onClick: (e: any) => void;
};

export const Button: FC<Props & Omit<ButtonProps, 'title' | 'onPress'>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <NativeButton {...props} onPress={onClick} title={children as string} />
  );
};
