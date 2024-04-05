import React, {useCallback} from 'react';
import {COLORS} from '../../../assets';
import {AssetsRow} from '../../../storybook/assets-row';
import {Routes} from '../../routes/constants';

interface IExploreRow {
  navigation: any;
  row: any;
  type: any;
  index: number;
}
const ExploreRow = ({row, type, navigation, index}: IExploreRow) => {
  const onNavigate = useCallback(() => {
    navigation.navigate(Routes.AssetDetail);
  }, [navigation, row]);

  const {
    change,
    marketPrice,
    changesPercentage,
    priceChange,
    priceChangesPercentage,
  } = row;

  const color =
    type === 'music'
      ? Number(priceChange) > 0
        ? COLORS['price-up']
        : COLORS['price-down']
      : Number(change) > 0
      ? COLORS['price-up']
      : COLORS['price-down'];
  const dynamicRate = changesPercentage?.toString()?.replace('-', '') ?? 0;

  return (
    <AssetsRow
      {...row}
      watchlistType={row.type}
      type={type}
      color={color}
      price={marketPrice ?? row?.price ?? 0}
      dynamic={type === 'music' ? priceChange : change}
      dynamicRate={type === 'music' ? priceChangesPercentage : dynamicRate}
      onNavigate={onNavigate}
      index={index}
    />
  );
};

export default ExploreRow;
