// @flow
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState, useRecoilValue} from 'recoil';
import FontIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {
  COLORS,
  Svg_Icon_Csv,
  Svg_Icon_Doc,
  Svg_Icon_Ppt,
  Svg_Pdf_Doc,
  Svg_Remove_Auth_User,
  Svg_Xsl_Doc,
} from '../../../../../../assets';
import {Header} from '../../../../../../components';
import {Loader, SVG} from '../../../../../../storybook';
import {Routes} from '../../../../../../views/routes/constants';
import {style} from './EditRemovalRequest.style';
import {CoOwnersDetailsState, DocumentDetails} from '../../states';
import {useNetwork} from '../../../../../../hooks';
import {APIS} from '../../../../../../constants';
import {formatBytes} from '../../../../../../libs';
import {useFetchOweners} from '../../../../../../views/profile/hooks';

const ManageCoOwner = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const {colors} = useTheme();
  const OwnersDetails = useRecoilValue(CoOwnersDetailsState);
  const [docs, setDocs] = useRecoilState(DocumentDetails);
  const {patch, get: getOwnerDoc, data: docDetails, loading} = useNetwork();
  const {fetchOwners} = useFetchOweners();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDocTypeIcon = useCallback((type: string) => {
    const getDoc = type.split('.');
    const docType = getDoc[getDoc?.length - 1];
    switch (docType) {
      case 'pdf':
        return Svg_Pdf_Doc;
      case 'doc':
      case 'docx':
        return Svg_Icon_Doc;
      case 'csv':
        return Svg_Icon_Csv;
      case 'xls':
        return Svg_Xsl_Doc;
      case 'ppt':
        return Svg_Icon_Ppt;
      default:
        return Svg_Icon_Doc;
    }
  }, []);

  const cancelRemovalRequest = () => {
    patch(APIS.coOwnersDenyRequest + OwnersDetails?._id)
      .then(res => {
        setLoader(true);
        fetchOwners();
        setTimeout(() => {
          setShow(false);
          navigation.navigate(Routes.CoOwners);
          setLoader(false);
        }, 2000);
      })
      .catch(e => {
        console.log('Error ====');
      });
  };

  useEffect(() => {
    getOwnerDoc(`${APIS.coOwnersDocument + OwnersDetails?._id}`);
  }, []);

  useEffect(() => {
    setDocs(docDetails?.data?.filesData);
  }, [docDetails?.data?.filesData]);
  const renderRemoveConfirmation = useMemo(() => {
    return (
      <>
        <View style={style.removeMainContainer}>
          <View style={style.removeConfirmationContainer}>
            <TouchableOpacity
              style={style.cancelBtn}
              onPress={() => {
                setShow(false);
              }}>
              <FontIcon
                name="close"
                color="gray"
                size={20}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
          <View style={style.confirmationContainer}>
            <View style={{alignItems: 'center', paddingBottom: 0}}>
              <SVG name={Svg_Remove_Auth_User} width={180} height={180} />

              <Text style={[style.moadlheader, {color: colors.text}]}>
                Cancel Co-owner removal request?
              </Text>
            </View>
            <View style={style.textContainer}>
              <Text style={[style.cancelHeadingTxt, {color: colors.text}]}>
                Are you sure you want to cancel co-owner removal request?{' '}
                <Text style={[style.cancelDescTxt, {color: colors.text}]}>
                  Do you want to cancel it?
                </Text>
              </Text>
            </View>

            <View
              style={[
                {
                  flexDirection: 'row',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <TouchableOpacity
                style={[
                  style.cancelContainer,
                  {backgroundColor: colors.box, marginRight: 8, flex: 1},
                ]}
                onPress={goBack}>
                <Text style={[style.cancelBtnText, {color: colors.text}]}>
                  Keep It
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.removeContainer, {flex: 1}]}
                onPress={() => {
                  cancelRemovalRequest();
                }}>
                {loader ? (
                  <Loader top={0} size={'small'} />
                ) : (
                  <Text style={[style.cancelBtnText, {color: colors.text}]}>
                    Cancel Request
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }, [loader]);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <Header title="Manage Removal Request" goBack={goBack} />

      <View style={{flex: 1}}>
        <View style={style.headerSection}>
          <Text style={[style.headerText, {color: colors.text}]}>Details</Text>
          <View style={[style.borderLine, {backgroundColor: colors.border}]} />
          <View style={style.dateContainer}>
            <Text style={[style.subText, {color: colors.lightText, flex: 1}]}>
              Date
            </Text>
            <Text
              style={[
                style.subText,
                {color: colors.text, paddingVertical: 10},
              ]}>
              {moment(docDetails?.data?.updatedAt).format('MMM DD ,YYYY')}
            </Text>
            <Text style={[style.subText, {color: colors.lightText}]}>
              (last edited)
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[style.headerText, {color: colors.text}]}>
              Documents
            </Text>
            <Text style={[style.subText, {color: colors.lightText}]}>
              {docs?.length} Files
            </Text>
          </View>
          <View style={[style.borderLine, {backgroundColor: colors.border}]} />
        </View>

        {docDetails?.message !== 'ok' ? (
          <Text style={{color: colors.text, textAlign: 'center'}}>
            {docDetails?.message}
          </Text>
        ) : (
          <FlatList
            data={docs}
            renderItem={({item}: any) => (
              <View style={style.docContainer}>
                <View
                  style={[style.iconContainer, {backgroundColor: colors.box}]}>
                  <SVG
                    name={handleDocTypeIcon(item?.docName ?? '')}
                    width={20}
                    height={20}
                  />
                </View>
                <Text
                  style={[
                    style.headerText,
                    {color: colors.text, flex: 1, paddingHorizontal: 16},
                  ]}
                  numberOfLines={2}>
                  {item?.docName}
                </Text>
                <Text style={[style.subText, {color: colors.lightText}]}>
                  {formatBytes(item.fileSize) ?? '0Kb'}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Footer */}
      <View style={[style.footerWrapper, {backgroundColor: colors.ground}]}>
        <TouchableOpacity
          style={[style.btnContainer]}
          onPress={() => {
            setShow(true);
          }}>
          <Text style={style.btnText}>Cancel Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.btnContainer, {backgroundColor: COLORS['button_blue']}]}
          onPress={() => {
            navigation.navigate(Routes.EditRemovalRequest);
          }}>
          <Text style={style.btnText}>Edit Request</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={show} transparent>
        <View style={{backgroundColor: 'rgba(0,0,0,.9)', flex: 1}}>
          {renderRemoveConfirmation}
        </View>
      </Modal>
    </View>
  );
};

export default ManageCoOwner;
