import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Text from '../elements/Text';
import { hp, wp } from '../utils/Constant';
import Theme from '../theme';

const UploadImageModal = ({
    file,
    isVisible = false,
    onBackdropPress = () => { },
    onPressCamera = () => { },
    onPressGallery = () => { },
    onPressVideo = () => { },
    addvideo,
    title1
}) => {
    const insets = useSafeAreaInsets();
    const Button = ({
        buttonTitle = 'Button',
        titleColor = '#FFF',
        style,
        onPress = () => { },
        iconCompoennet,
        disabled = false,
    }) => {
        return (
            <TouchableOpacity
                disabled={disabled}
                activeOpacity={0.5}
                onPress={onPress}
                style={[styles.buttonStyle, style, disabled && styles.disableStyle]}>
                {iconCompoennet && iconCompoennet}
                <Text size={16} fontWeight="700" color={titleColor}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationInTiming={500}
            animationOutTiming={400}
            useNativeDriver
            useNativeDriverForBackdrop
            animationOut={'slideOutDown'}
            animationIn={'slideInUp'}
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            backdropOpacity={0.2}
            style={{ padding: 0, margin: 0, zIndex: 2 }}>
            <View
                pointerEvents="box-none"
                style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View
                    style={[
                        styles.modalChildContainer,
                        {
                            paddingBottom: insets.bottom,
                            height: addvideo ? hp(40) : hp(30)
                        },
                    ]}>
                    <View style={styles.modalHeader}>
                        <Text color="#FFF" fontWeight="700" size={20}>
                            {`Select ${file ? "File" : "Image"}`}
                        </Text>
                        <TouchableOpacity onPress={onBackdropPress} activeOpacity={0.7}>
                            <Ionicons name="close" color={'#FFF'} size={25} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: wp(4),
                            flex: 1,
                            justifyContent: 'center',
                        }}>

                        <Button
                            buttonTitle={file ? "Edit" : "Select photo from camera"}
                            iconCompoennet={
                                file ?
                                    <FontAwesome5
                                        style={{ marginRight: wp(4) }}
                                        name="edit"
                                        size={23}
                                        color={'#FFF'}
                                    />
                                    :
                                    <AntDesign
                                        style={{ marginRight: wp(4) }}
                                        name="camera"
                                        size={23}
                                        color={'#FFF'}
                                    />
                            }
                            onPress={onPressCamera}
                        />

                        <Button
                            buttonTitle={file ? "Delete" : "Select photo from gallery"}
                            iconCompoennet={
                                file ?
                                    <MaterialIcons
                                        style={{ marginRight: wp(4) }}
                                        name="delete"
                                        size={23}
                                        color={'#FFF'}
                                    />
                                    :
                                    <Ionicons
                                        style={{ marginRight: wp(4) }}
                                        name="image"
                                        size={23}
                                        color={'#FFF'}
                                    />
                            }
                            onPress={onPressGallery}
                        />
                        {addvideo &&
                            <Button
                                buttonTitle={"Select Video from gallery"}
                                iconCompoennet={
                                    <Ionicons
                                        style={{ marginRight: wp(4) }}
                                        name="image"
                                        size={23}
                                        color={'#FFF'}
                                    />
                                }
                                onPress={onPressVideo}
                            />

                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default UploadImageModal;

const styles = StyleSheet.create({
    modalChildContainer: {
        backgroundColor: '#FFF',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(7),
        justifyContent: 'space-between',
        backgroundColor: Theme.BUTTON_PRIMARY_COLOR,
        height: hp(7),
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    listContainer: {
        paddingBottom: hp(3),
    },
    buttonStyle: {
        borderRadius: 10,
        height: hp(6),
        backgroundColor: Theme.BUTTON_PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        marginBottom: hp(1.5),
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginVertical: hp(1),
    },
    disableStyle: {
        backgroundColor: 'lightgray',
    },
});