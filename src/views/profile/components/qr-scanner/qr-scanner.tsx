import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, FlatList,RefreshControl} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue,useRecoilState} from 'recoil';
import {useNetwork} from '../../../../hooks';
import {Header} from '../../../../components';
import {APIS} from '../../../../constants';
import {Loader, SVG} from '../../../../storybook';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ProfileDataState, loginNumberState} from '../../../../states';
import {qrstyles as styles} from './qr-scanner.styles';
import {SVG_MOBILE} from '../../../../assets/icon/svg/mobile';
import {SVG_DESKTOP} from '../../../../assets/icon/svg/desktop';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { Routes } from '../../../../views/routes/constants';

export const QrScanner = ({navigation}: any) => {
  const [isLoading, setISLoading] = useState(true);
  const [dataKeys, setDataKeys]: any = useState([]);
  const profileData = useRecoilValue(ProfileDataState);
  const [isRefreshing,setIsRefreshing] = useState(false)
   const [loginNumber, setLoginNumber] = useRecoilState(loginNumberState);

  const {get} = useNetwork();
  const {patch} = useNetwork();
  const {colors} = useTheme();


  const getDevicesInfoApi = useCallback(() => {
    get(APIS.usersDeviceLogin).then(res => {
      if (res.data) {
        setDataKeys(res.data);
        setISLoading(false);
      }
    });
  }, []);

  const onRefresh = ()=>{
    setIsRefreshing(true)
    getDevicesInfoApi()
    setTimeout(() => {
      setIsRefreshing(false) 
    }, 1000);
  
  }

  useEffect(() => {
    getDevicesInfoApi();
  }, []);
  
  const logoutDevice = item => {
    const itemId = item.item._id;
    patch(`${APIS.usersDeviceLogin}/${profileData?.id}`, {ids: [itemId],origin: 'mobile'}).then(
      res => {
        getDevicesInfoApi();
        navigation.navigate(Routes.Login)
        setLoginNumber('')
      },
    );
  };

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const dropdown = item => {
    let temp: any = dataKeys;
    temp.map((Item: any, Index: any) => {
      if (Item._id === item.item._id) {
        if (Item.isOpen !== undefined) {
          if (Item.isOpen) {
            temp[Index].isOpen = false;
          } else {
            temp[Index].isOpen = true;
          }
        } else {
          temp[Index] = {...Item, isOpen: true};
        }
      }
    });
    setDataKeys([...temp]);
  };

  const logout = item => {
    logoutDevice(item);
    getDevicesInfoApi();
  };

  const RenderItems = item => {
    return (
      <View
        style={[
          styles.devices,
          {
            backgroundColor: colors.background,
            height: item.item.isOpen ? 120 : 80,
            borderBottomColor:colors.border
          },
        ]}>
        <View
          style={[
            styles.imageView,
            {backgroundColor: item.item.deviceType == 'desktop' ? 'rgba(69, 139, 245, 0.12)' : 'rgba(245, 175, 69, 0.12)'},
          ]}>
          {item.item.deviceType == 'desktop' ? (
            <SVG name={SVG_DESKTOP} width={32} height={32} />
          ) : (
            <SVG name={SVG_MOBILE} width={32} height={32} />
          )}
        </View>
        <View>
          <Text style={[styles.brand, {color: colors.text}]}>
            {item.item.deviceType == 'desktop' ? item.item.deviceOS : item.item.device}
          </Text>
          <Text style={styles.lastActive}>
            Last active {moment(item.item.updatedAt).calendar()}
          </Text>
        </View>
        <View style={{flex: 1, position: 'absolute', right: 16, top: 28}}>
          <AntDesign
            name={item.item.isOpen ? 'up' : 'down'}
            style={[styles.arrow, {color: colors.text,height:24,width:24}]}
            onPress={() => dropdown(item)}
            
          />
        </View>
        {item.item.isOpen ? (
          <TouchableOpacity
            style={styles.logoutCon}
            onPress={() => logout(item)}>
            <Text style={styles.logOutBtn}>Logout</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <View style={[{backgroundColor: colors.background, flex: 1}]}>
      <Header title="Linked Devices" goBack={goBack} />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
        onRefresh={onRefresh}
        refreshing={isRefreshing}
          data={dataKeys}
          renderItem={({item}) => <RenderItems item={item} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              title="Pull to refresh"
              tintColor={colors.text}
              titleColor={colors.text}
            />
          }
        />
      )}
    </View>
  );
};
