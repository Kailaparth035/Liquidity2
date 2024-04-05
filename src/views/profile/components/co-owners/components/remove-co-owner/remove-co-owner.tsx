import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import DocumentPicker from 'react-native-document-picker';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../../../../../components';
import {Loader, SVG} from '../../../../../../storybook';
import {
  COLORS,
  Svg_Delete,
  Svg_Pdf_Doc,
  Svg_Upload_Doc,
  Svg_Xsl_Doc,
} from '../../../../../../assets';
import {formatBytes, toast} from '../../../../../../libs';
import {useNetwork} from '../../../../../../hooks';
import {APIS} from '../../../../../../constants';
import {CoOwnersDetailsState} from '../../states';
import {Routes} from '../../../../../../views/routes/constants';
import {RemoveOwnerFooterStyles as styles} from './remove-co-owner.styles';
import {useFetchOweners} from '../../../../../../views/profile/hooks';

export const RemoveCoOwner = ({navigation}: any) => {
  const [selectedDocument, setSelectedDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ownersDetails = useRecoilValue(CoOwnersDetailsState);
  const {post} = useNetwork();
  const {put} = useNetwork();
  const {colors} = useTheme();
  const {fetchOwners} = useFetchOweners();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
              setTimeout(() => {
                navigation.navigate(Routes.CoOwners);
              }, 1000);
            } else if (resp?.message) toast(resp.message);
          })
          .catch(err => toast(err))
          .finally(() => setIsLoading(false));
      }
    },
    [ownersDetails, navigation],
  );

  const uploadDoc = useCallback(async () => {
    const files: any = [];
    selectedDocument.forEach((doc: any) => {
      files.push({
        fileName: doc.name,
        extension: doc.type,
        fileSize: doc.size,
      });
    });

    const payload = {
      id: ownersDetails?._id,
      files,
    };
    return await post(APIS.coOwnersDocument, payload)
      .then(docResp => {
        if (docResp?.message) {
          toast(docResp.message);
          setIsLoading(false);
        } else updateUpload(docResp);
      })
      .catch((err: any) => toast(err));
  }, [ownersDetails, selectedDocument]);

  const onRemove = useCallback(() => {
    if (!selectedDocument.length) {
      return toast('Please upload document');
    }
    setIsLoading(true);
    uploadDoc();
  }, [selectedDocument]);

  const isDisabled = false;

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
        // User canceled the document picker
      } else {
        throw err;
      }
    }
  }, [selectedDocument]);

  const handleDelete = useCallback(
    item => {
      const tempDocs: any = selectedDocument.filter(
        (doc: any) => doc.name !== item.name,
      );
      setSelectedDocument(tempDocs);
    },
    [selectedDocument],
  );

  const handleDocTypeIcon = useCallback((type: string) => {
    switch (type) {
      case 'application/pdf':
        return Svg_Pdf_Doc;
      default:
        return Svg_Xsl_Doc;
    }
  }, []);

  const renderDocumentList = useMemo(() => {
    return (
      <>
        <View style={styles.mainContainer}>
          <View style={styles.documentList}>
            <Text style={[styles.documentTxt, {color: colors.text}]}>
              Documents
            </Text>
            <Text style={styles.documentLengthTxt}>
              {selectedDocument.length}
            </Text>
          </View>
          <View>
            <FlatList
              data={selectedDocument}
              renderItem={({item}: any) => {
                return (
                  <>
                    <View style={styles.listContainer}>
                      <View
                        style={[
                          styles.imageContainer,
                          {backgroundColor: colors.ground},
                        ]}>
                        <SVG
                          name={handleDocTypeIcon(item?.type)}
                          width={30}
                          height={30}
                        />
                      </View>
                      <View style={styles.nameContainer}>
                        <Text
                          style={[styles.nameTxt, {color: colors.text}]}
                          numberOfLines={2}>
                          {item?.name ?? ''}
                        </Text>
                      </View>
                      <View style={{flex: 2}}>
                        <Text style={styles.sizeTxt}>
                          {formatBytes(item?.size) ?? '0Kb'}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteIcon}
                        onPress={() => handleDelete(item)}>
                        <SVG
                          name={Svg_Delete}
                          width={20}
                          height={20}
                          color={COLORS['color-text-light-50']}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </View>
      </>
    );
  }, [selectedDocument]);

  return (
    <>
      <Header title="Remove Co-owner" goBack={goBack} />
      <View style={styles.container}>
        <View>
          <View style={[styles.headingContainer, {marginBottom: 10}]}>
            <Text style={[styles.headingTxt, {color: colors.text}]}>
              Upload documents
            </Text>
            <Text style={styles.descriptionTxt}>
              Upload necessary documents for co-owner removal. Co-owner will be
              removed upon acceptance.
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.uploadContainer, {backgroundColor: colors.ground}]}
            onPress={pickDocument}>
            <View style={styles.uploadBox}>
              <SVG name={Svg_Upload_Doc} width={48} height={48} />
              <Text style={styles.browseTxt}>
                Browse{' '}
                <Text style={[styles.fileTxt, {color: colors.text}]}>
                  a file and upload
                </Text>
              </Text>
              <Text style={styles.supportTxt}>
                Supported file format: .pdf, .docx, and .doc
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{height: '55%'}}>{renderDocumentList}</View>
        </View>

        {/* Footer */}
        <View style={styles.footerWrapper}>
          <TouchableOpacity
            style={[styles.btnContainer, {backgroundColor: 'gray'}]}
            onPress={goBack}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              isDisabled ? styles.btnContainerDisabled : styles.btnContainer
            }
            onPress={onRemove}
            disabled={isLoading}>
            {isLoading ? (
              <Loader top={0} size={'small'} />
            ) : (
              <Text style={styles.btnText}>Request removal</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
