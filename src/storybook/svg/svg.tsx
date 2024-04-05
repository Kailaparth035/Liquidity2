import React, {FC} from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface ISvg {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}

export const SVG: FC<ISvg> = props => {
  const {name, width, height, color} = props;

  return (
    <SvgXml
      xml={name}
      width={width ?? '100%'}
      height={height ?? '100%'}
      style={{color} as any}
      {...props}
    />
  );
};
