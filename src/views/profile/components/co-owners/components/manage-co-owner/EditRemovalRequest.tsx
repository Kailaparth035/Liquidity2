// @flow
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';

import {Header} from '../../../../../../components';
import {SVG} from '../../../../../../storybook';
import {formatBytes, toast} from '../../../../../../libs';
import {
  COLORS,
  Svg_Close_Circle,
  Svg_Delete,
  Svg_Icon_Csv,
  Svg_Icon_Doc,
  Svg_Icon_Ppt,
  Svg_Pdf_Doc,
  Svg_Upload_Doc,
  Svg_Xsl_Doc,
} from '../../../../../../assets';
import {useNetwork} from '../../../../../../hooks';
import {APIS} from '../../../../../../constants';
import {useRecoilState, useRecoilValue} from 'recoil';
import {CoOwnersDetailsState, DocumentDetails} from '../../states';
import {useFetchOweners} from '../../../../../../views/profile/hooks';
import {style} from './EditRemovalRequest.style';

const EditRemovalRequest = ({navigation}: any) => {
  const {colors} = useTheme();
  const {remove, post, put, get} = useNetwork();
  const ownersDetails = useRecoilValue(CoOwnersDetailsState);
  const [docs, setDocs] = useRecoilState(DocumentDetails);
  const [selectedDocument, setSelectedDocument] = useState(docs);
  const [deleteIds, setDeleteIds] = useState([]);
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

  const deleteCoOwnerDoc = (id: string, index: number) => {
    let arrayDocs = deleteIds;
    arrayDocs.push(id);
    setDeleteIds(arrayDocs);
    let array = [...selectedDocument];
    array.splice(index, 1);
    setSelectedDocument(array);
  };

  const removeFile = (index: number) => {
    let array = [...selectedDocument];
    array.splice(index, 1);
    setSelectedDocument(array);
  };

  const updateUpload = useCallback(
    async docs => {
      if (docs?.length) {
        const docsToUpdate: any = [];
        docs.forEach((doc: any) => {
          docsToUpdate.push({
            id: doc?.id ?? '',
            status: 'SUCCESS',
          });
        });
        const payload = {files: docsToUpdate};

        return await put(
          `${APIS.coOwnersDocument}${ownersDetails?._id}`,
          payload,
        )
          .then(async resp => {
            if (resp?.data?.success) {
              fetchOwners();
              toast(resp?.data?.message);
              setDocs(resp?.data?.filesData);
              goBack();
            } else if (resp?.message) toast(resp.message);
          })
          .catch(err => toast(err))
          .finally(() => {
            setSelectedDocument([]);
          });
      } else {
        goBack();
      }
    },
    [ownersDetails, navigation],
  );
  const uploadDoc = useCallback(
    async documents => {
      const files: any = [];
      // need to improve api
      if (deleteIds.length !== 0) {
        deleteIds.map(id => {
          remove(APIS.coOwnersDocument + id).then(res => {
            toast(res?.data?.message);
            setDocs(res?.data?.filesData);
            let newArray = [...selectedDocument];
            newArray.map((item, index) => {
              if (item?._id === id) {
                newArray.splice(index, 1);
              }
            });
            setSelectedDocument(newArray);
          });
        });
      }
      documents.forEach((doc: any) => {
        if (!doc._id) {
          files.push({
            fileName: doc.name,
            extension: doc.type,
            fileSize: doc.size,
          });
        }
      });

      const payload = {
        id: ownersDetails?._id,
        files,
      };

      return await post(APIS.coOwnersDocument, payload)
        .then((docResp: any) => {
          if (docResp?.message) {
            toast(docResp.message);
          } else {
            updateUpload(docResp);
          }
        })
        .catch((err: any) => toast(err));
    },
    [ownersDetails, selectedDocument],
  );

  const pickDocument = useCallback(async () => {
    try {
      const result: any = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.csv,
          DocumentPicker.types.xls,
          DocumentPicker.types.xls,
        ],
      });

      const documents: any = [...selectedDocument, result?.[0]];
      setSelectedDocument(documents);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        throw err;
      }
    }
  }, [selectedDocument]);

  return (
    <View style={style.container}>
      <Header title="Edit Removal Request" goBack={goBack} />

      <View style={{flex: 1}}>
        <Text style={[style.headerText, {color: colors.text}]}>
          Upload Documents
        </Text>
        <Text
          style={[style.subText, {color: colors.text, paddingVertical: 10}]}>
          Upload necessary document for co-owner removal. Co-owner will be
          removed upon acceptance.
        </Text>

        <TouchableOpacity
          style={[style.uploadContainer, {backgroundColor: colors.ground}]}
          onPress={pickDocument}>
          <View style={style.uploadBox}>
            <SVG name={Svg_Upload_Doc} width={48} height={48} />
            <Text style={style.browseTxt}>
              Browse{' '}
              <Text style={[style.fileTxt, {color: colors.text}]}>
                a file and upload
              </Text>
            </Text>
            <Text style={style.supportTxt}>
              Supported file format: .pdf, .docx, and .doc
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[style.headerText, {color: colors.text}]}>
            Documents
          </Text>
          <Text style={[style.subText, {color: colors.lightText}]}>
            {selectedDocument.length} Files
          </Text>
        </View>

        <FlatList
          data={selectedDocument}
          renderItem={({item, index}: any) => {
            return (
              <View style={style.header}>
                <View
                  style={[style.iconContainer, {backgroundColor: colors.box}]}>
                  <SVG
                    name={handleDocTypeIcon(item?.name ?? item.docName)}
                    width={20}
                    height={20}
                  />
                </View>
                <Text
                  style={[style.headerText, {color: colors.text}]}
                  numberOfLines={2}>
                  {item?.name ?? item.docName}
                </Text>
                <Text style={[style.subText, {color: colors.lightText}]}>
                  {formatBytes(item.size ?? item.fileSize) ?? '0Kb'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (item?._id) {
                      deleteCoOwnerDoc(item?._id, index);
                    } else {
                      removeFile(index);
                    }
                  }}>
                  <SVG
                    name={!item?._id ? Svg_Close_Circle : Svg_Delete}
                    width={24}
                    height={24}
                    color={colors.text}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>

      {/* Footer */}
      <View style={[style.footerWrapper, {backgroundColor: colors.ground}]}>
        <TouchableOpacity
          style={[style.btnContainer, {backgroundColor: colors.box}]}
          onPress={goBack}>
          <Text style={style.btnText}>Cancel </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.btnContainer, {backgroundColor: COLORS['button_blue']}]}
          onPress={() => {
            if (selectedDocument.length !== 0) {
              uploadDoc(selectedDocument);
            } else {
              toast('Please Upload Minimum 1 Document');
            }
          }}>
          <Text style={style.btnText}>Save Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditRemovalRequest;
