import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';

interface IExtendedActivityIndicatorProps extends ActivityIndicatorProps {
  top?: number;
}
export const Loader = (props: IExtendedActivityIndicatorProps) => {
  return <ActivityIndicator size={props.size ?? 'large'} style={{marginTop: props.top ?? 20}} {...props} />;
};
