import React from 'react';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

interface IDraggableList {
  renderItem: any;
  options: any[];
  setOptions: any;
}

export const DraggableList = ({
  renderItem,
  options,
  setOptions,
}: IDraggableList) => {

  const renderItems = (item: RenderItemParams<any>) => {
    return <ScaleDecorator>{renderItem(item)}</ScaleDecorator>;
  };

  return (
    <DraggableFlatList
      data={options}
      keyExtractor={item => `${item.key}__${item._id}`}
      renderItem={renderItems}
      style={{ height: '100%' }}
      onDragEnd={({data}) => setOptions(data)}
    />
  );
};
