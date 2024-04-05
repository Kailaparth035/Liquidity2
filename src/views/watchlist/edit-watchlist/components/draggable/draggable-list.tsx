import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {RenderItemParams} from 'react-native-draggable-flatlist';

import {DraggableList} from '../../../../../storybook/draggableList';
import {NoData} from '../../../../../components';
import DraggableRow from './draggable-row';
import {usePlatform} from '../../../../../hooks';

const Draggable = ({dragWatchlist, setData, deleteWatchlist}: any) => {
  const {isIOS} = usePlatform();
  const onDelete = useCallback(
    (id: string) => {
      const clone = [...dragWatchlist];
      const foundIdx = clone.findIndex(watchlist => watchlist._id === id);
      if (foundIdx >= 0) {
        deleteWatchlist(clone[foundIdx]._id);
        clone.splice(foundIdx, 1);
        setData(clone);
      }
    },
    [dragWatchlist],
  );

  const renderItem = ({item, drag, isActive}: RenderItemParams<any>) => {
    return (
      <DraggableRow
        item={item}
        drag={drag}
        isActive={isActive}
        onDelete={() => onDelete(item._id)}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {dragWatchlist.length > 0 ? (
        isIOS ? (
          <DraggableList
            options={dragWatchlist}
            setOptions={setData}
            renderItem={renderItem}
          />
        ) : (
          <FlatList
            data={dragWatchlist}
            keyExtractor={item => `${item.key}__${item._id}`}
            renderItem={renderItem}
            style={{height: '100%'}}
          />
        )
      ) : (
        <NoData msg="Add watchlist items" />
      )}
    </View>
  );
};

export default Draggable;
