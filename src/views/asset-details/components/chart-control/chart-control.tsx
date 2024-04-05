import React, {useMemo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {useRecoilState} from 'recoil';

import {SVG} from '../../../../storybook/svg';
import {ChartToggleState} from '../../../../states';
import {chartControlStyle as styles} from './chart-control.style';
import {Svg_Candle_Chart, Svg_Line_Chart} from '../../../../assets';

export const ChartControl = () => {
  const isHidden = useMemo(() => false, []);
  const [toggle, setToggle] = useRecoilState(ChartToggleState);

  const updateToggle = (type: 'line' | 'candle') => {
    setToggle(type);
  };

  return (
    <View>
      {isHidden && (
        <TouchableOpacity>
          <Text style={styles.ipoBtn}>IPO Detail</Text>
        </TouchableOpacity>
      )}
      <View style={styles.toggle}>
        <TouchableOpacity
          onPress={() => updateToggle('line')}
          style={[
            styles.toggleItem1,
            toggle === 'line' && styles.toggleActive,
          ]}>
          <SVG
            name={Svg_Line_Chart}
            width={20}
            height={20}
            color={toggle === 'candle' ? '#ffffff' : '#B8B8B8'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateToggle('candle')}
          style={[
            styles.toggleItem2,
            toggle === 'candle' && styles.toggleActive,
          ]}>
          <SVG
            name={Svg_Candle_Chart}
            width={24}
            height={24}
            color={toggle === 'line' ? '#ffffff' : '#B8B8B8'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
