import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    View,
    Text,
    Pressable,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import AntDesign from "react-native-vector-icons/AntDesign"
import MyButton from '../../elements/MyButton';
import { useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UploadImageModal from '../../components/UpdateProfileModal';
import ImagePicker from 'react-native-image-crop-picker';
import { create_sites, publish_tour } from '../../services/Api';
import { ShowToast } from '../../utils/Helper';
import DocumentPicker from 'react-native-document-picker'
import Video from 'react-native-video-controls';
import {
    locationPermission,
    getCurrentLocation,
} from '../../utils/helperFunction';
import Header from '../../components/Header';

const EditSiteScreen = ({ route }) => {
    const { item } = route?.params;
    const userDetail = useSelector(state => state?.auth);
    const navigation = useNavigation();
    const [SiteName, setSiteName] = useState(item?.sites_name);
    const [SiteLocation, setSiteLocation] = useState(item?.sites_location);
    const [SiteDescription, setSiteDescription] = useState(item?.sites_description);
    const [image, setImage] = useState('');
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageArray, setImageArray] = useState([]);
    const [videoData, setVideoData] = useState({});
    const [loading1, setLoading1] = useState(false);
    const videoPlayerRef = useRef();


    const [location, setLocation] = useState({
        lat: item?.sites_latitude,
        lng: item?.sites_longitude,
        address: item?.sites_location,
    });

    const onPressAddress = (data, details) => {
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        getLiveLocation(lat, lng);
        setLocation({ lat: lat, lng: lng });
    };
    const getLiveLocation = async (lat, lng) => {
        const locPermissionDenied = await locationPermission();
        if (locPermissionDenied) {
            const url =
                'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
                lat +
                ',' +
                lng +
                '&key=AIzaSyAEKIGD-7QbMF1ZEtd7PVabDq_yKx5eyIc';
            try {
                const res = await fetch(url);
                const json = await res.json();
                setSiteLocation(json.results[0]?.formatted_address);
            } catch (e) {
                console.log('eee', e);
            }
        }
    };

    const _launchGallery = async () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            cropperCircleOverlay: true,
            includeExif: true,
        })
            .then(image => {
                setShow(false);
                setImageArray([...imageArray, image]);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const _launchCamera = async () => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            cropperCircleOverlay: true,
            includeExif: true,
        })
            .then(image => {
                setShow(false);
                setImageArray([...imageArray, image]);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const _launchVideo = async () => {
        if (Object.values(videoData).length === 1) {
            ShowToast('You Have Upload Only One Video', 'error');
        } else {
            ImagePicker.openPicker({
                mediaType: "video",
                includeExif: true,
            })
                .then(video => {
                    setVideoData(video);
                    setShow(false);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    const add_another_site = () => {
        setLoading(true);
        var formdata = new FormData();
        formdata.append('sites_name', SiteName);
        formdata.append('sites_description', SiteDescription);
        formdata.append('sites_users_id', userDetail?.user?.id);
        formdata.append('sites_latitude', location?.lat);
        formdata.append('sites_longitude', location?.lng);
        formdata.append('sites_tours_id', tours_id);
        formdata.append('sites_location', SiteLocation);
        // formdata.append('sites_video', {
        //   uri:
        //     Platform.OS == 'android'
        //       ? videoData?.path
        //       : videoData.path.replace('file:', ''),
        //   type: videoData?.mime,
        //   name: videoData?.filename == undefined ? 'image.jpg' : videoData?.filename,
        // });
        formdata.append('sites_image', {
            uri:
                Platform.OS == 'android'
                    ? imageArray[0]?.path
                    : imageArray[0].path.replace('file:', ''),
            type: imageArray[0]?.mime,
            name: imageArray[0]?.filename == undefined ? 'image.jpg' : imageArray[0]?.filename,
        });
        formdata.append('sites_image_gallery', imageArray.map((item, index) => {
            return (
                {
                    uri:
                        Platform.OS == 'android'
                            ? item?.path
                            : item.path.replace('file:', ''),
                    type: item?.mime,
                    name: item?.filename == undefined ? 'image.jpg' : item?.filename,
                }
            )
        })
        );
        create_sites(formdata)
            .then(result => {
                console.log("resss", result)

                if (result?.status == '1') {
                    ShowToast('Site Added SuccessFully', 'success');
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => {
                setLoading(false);
            });
    };


    const _removeVideo = () => {
        setVideoData({})
    }

    const _removeImage = (value) => {
        setLoading1(true)
        const index = imageArray.indexOf(value);
        if (index > -1) { // only splice array when item is found
            imageArray.splice(index, 1); // 2nd parameter means remove one item only
            setTimeout(() => {
                setImageArray([...imageArray])
            }, 500)
        }
        setLoading1(false)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <MyStatusBar backgroundColor={'#fff'} />
            <Header title={"Edit Site"} navigation={navigation} />
            <ScrollView
                showsVerticalSc rollIndicator={false}
                keyboardShouldPersistTaps="always"
                style={{ backgroundColor: '#fff' }}>
                <View style={{ padding: 15 }}>
                    <TextInput
                        style={styles.inputStyl}
                        value={SiteName}
                        onChangeText={value => setSiteName(value)}
                        numberOfLines={1}
                        inputMode="text"
                        placeholder="Site Name"
                        placeholderTextColor={'#979797'}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            borderRadius: 10,
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.15,
                            shadowRadius: 2.84,
                        }}>
                        <GooglePlacesAutocomplete
                            scrollEnabled={false}
                            fetchDetails={true}
                            placeholder={SiteLocation}
                            placheholderText={'red'}
                            textInputProps={{
                                placeholderTextColor: '#000',
                            }}
                            onPress={onPressAddress}
                            styles={{
                                textInputContainer: styles.containerStyle,
                                textInput: styles.textInputStyle,
                                description: {
                                    fontWeight: 'bold',
                                    color: 'black',
                                },
                            }}
                            query={{
                                key: 'AIzaSyAEKIGD-7QbMF1ZEtd7PVabDq_yKx5eyIc',
                                language: 'en',
                            }}
                        />
                    </View>

                    <TextInput
                        style={{
                            fontFamily: Theme.FONT_FAMILY_BOLD,
                            fontSize: Theme.FONT_SIZE_SMALL,
                            backgroundColor: '#F8F8F8',
                            marginTop: 15,
                            color: 'black',
                            padding: 16,
                            borderRadius: 14,
                        }}
                        value={SiteDescription}
                        onChangeText={value => setSiteDescription(value)}
                        inputMode="text"
                        placeholder="Site Description"
                        placeholderTextColor={'#979797'}
                        multiline={true}
                    />

                    <Pressable
                        onPress={() => setShow(true)}
                        style={{
                            height: 130,
                            marginTop: 15,
                            borderRadius: 10,
                            overflow: 'hidden',
                            backgroundColor: '#F8F8F8',
                            justifyContent: 'center',
                            marginBottom: 100,
                        }}>
                        {image?.length === 0 ? (
                            <Image
                                style={styles.uploadImgStyl}
                                source={require('../../assets/icons/upload_icon.png')}
                            />
                        ) : (
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: image?.path }}
                            />
                        )}
                        {image?.length === 0 ? (
                            <Text style={styles.txtStyl}>
                                Audios, Photos, Videos of the Sites
                            </Text>
                        ) : null}
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 10, marginBottom: 20, gap: 15 }}>
                    {imageArray?.map((item, index) => {
                        return (
                            <View key={index} style={{ width: "30%", height: 100, borderRadius: 12, backgroundColor: "#fff", overflow: "hidden", elevation: 5 }}>
                                <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 25 / 2, backgroundColor: "#fff", position: "absolute", zIndex: 1, justifyContent: "center", alignItems: "center", top: 8, right: 8 }} onPress={() => loading1 ? null : _removeImage(item)}>
                                    <AntDesign name="close" size={15} />
                                </TouchableOpacity>
                                <Image source={{ uri: item.path }} style={{ width: "100%", height: "100%", }} />
                            </View>
                        )
                    })}
                </View>
                {Object.values(videoData)?.length === 0 ? null :
                    <View style={{ padding: 10, marginBottom: 20, paddingTop: 0 }}>
                        <View style={{ width: "100%", height: 300, borderRadius: 12, backgroundColor: "#fff", overflow: "hidden", elevation: 5 }}>
                            <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 25 / 2, backgroundColor: "#fff", position: "absolute", zIndex: 1, justifyContent: "center", alignItems: "center", top: 8, right: 8 }} onPress={() => loading1 ? null : _removeVideo()}>
                                <AntDesign name="close" size={15} />
                            </TouchableOpacity>
                            <Video source={{ uri: videoData?.path }}
                                ref={(ref) => {
                                    videoPlayerRef.current = ref?.player?.ref;
                                }}
                                onBuffer={() => { }}
                                onError={() => { }}
                                style={styles.backgroundVideo} />
                        </View>
                    </View>
                }
            </ScrollView>
            <MyButton
                title={'Update Site'}
                loading={loading}
                onPress={() => add_another_site()}
                textStyle={{
                    fontSize: 18,
                    fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
                    lineHeight: 30,
                }}
                style={{
                    borderRadius: 30,
                    width: '90%',
                    alignSelf: 'center',
                    height: 55,
                    marginTop: 15,
                    marginBottom: 5,
                }}
            />
            <UploadImageModal
                isVisible={show}
                onPressGallery={_launchGallery}
                onPressCamera={_launchCamera}
                onBackdropPress={() => setShow(false)}
                onPressVideo={_launchVideo}
                addvideo={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
        marginHorizontal: 15,
    },
    inputStyl: {
        height: 56,
        fontFamily: Theme.FONT_FAMILY_BOLD,
        fontSize: Theme.FONT_SIZE_SMALL,
        backgroundColor: '#F8F8F8',
        marginTop: 15,
        color: 'black',
        paddingHorizontal: 16,
        borderRadius: 14,
    },
    uploadImgStyl: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    txtStyl: {
        fontFamily: Theme.FONT_FAMILY_BOLD,
        fontSize: Theme.FONT_SIZE_SMALL,
        color: '#ADA4A5',
        alignSelf: 'center',
        marginTop: 10,
    },
    containerStyle: {
        padding: 8,
        justifyContent: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 10,
    },
    textInputStyle: {
        color: '#000',
        fontSize: 14,
        backgroundColor: '#F7F8F8',
        height: '100%',
        fontWeight: 'bold',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default EditSiteScreen;
