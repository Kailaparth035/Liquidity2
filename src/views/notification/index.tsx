import React, {useCallback, useState} from 'react';
import {View, Modal, SafeAreaView, FlatList} from 'react-native';
import {Header} from '../../components';
import {notification_data} from './data';
import NotificationCard from './components/NotificationCard';
import {styles} from './styles';
import DetailModal from './components/DetailModal';
type NotificationType = {
  navigation: any;
};

const Notification = ({navigation}: NotificationType) => {
  const [showModal, setShowModal] = useState(false);
  const [isAsset, setIsAsset] = useState(false);
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.parent}>
      <Header title="Notification" goBack={goBack} />
      <View style={{flex: 1}}>
        <FlatList
          data={notification_data}
          renderItem={({item}) => {
            return (
              <NotificationCard
                item={item}
                viewPress={() => {
                  setShowModal(true);
                  item.title == 'Asset Mint'
                    ? setIsAsset(true)
                    : setIsAsset(false);
                }}
              />
            );
          }}
        />
      </View>
      <Modal visible={showModal} transparent>
        <DetailModal setShowModal={setShowModal} isAsset={isAsset} />
      </Modal>
    </SafeAreaView>
  );
};

export default Notification;
