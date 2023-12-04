import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import UploadImageModal from '../../components/UpdateProfileModal';
import ImagePicker from 'react-native-image-crop-picker';
import {create_sites} from '../../services/Api';
import {ShowToast} from '../../utils/Helper';
import {
  locationPermission,
  getCurrentLocation,
} from '../../utils/helperFunction';

const AddSiteScreen = ({route}) => {
  const {data, tourName, price} = route?.params;
  const userDetail = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const [SiteName, setSiteName] = useState('');
  const [SiteLocation, setSiteLocation] = useState('');
  const [SiteDescription, setSiteDescription] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: '',
    lng: '',
    address: '',
  });

  const onPressAddress = (data, details) => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    getLiveLocation(lat, lng);
    setLocation({lat: lat, lng: lng});
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
        setImage(image);
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
        setImage(image);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const add_site = () => {
    if (!SiteDescription || !SiteName) {
      ShowToast('All Field Required', 'error');
    } else if (image?.length === 0) {
      ShowToast('Upload Image', 'error');
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('sites_name', SiteName);
      formdata.append('sites_description', SiteDescription);
      formdata.append('sites_users_id', userDetail?.user?.id);
      formdata.append('sites_latitude', location?.lat);
      formdata.append('sites_longitude', location?.lng);
      formdata.append('sites_tours_id', data?.tours_id);
      formdata.append('sites_location', SiteLocation);

      formdata.append('sites_image', {
        uri:
          Platform.OS == 'android'
            ? image?.path
            : image.path.replace('file:', ''),
        type: image?.mime,
        name: image?.filename == undefined ? 'image.jpg' : image?.filename,
      });
      create_sites(formdata)
        .then(result => {
          if (result?.status == '1') {
            navigation.navigate('Preview', {
              tourID: data?.tours_id,
              tourName,
              price,
            });
          }
        })
        .catch(error => console.log('error', error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          padding: 15,
        }}>
        <Pressable
          onPress={() => navigation.pop(1)}
          style={{
            width: 35,
            height: 35,
            position: 'absolute',
            left: 15,
            top: 15,
          }}>
          <Image
            style={{width: 35, height: 35}}
            source={require('../../assets/icons/back_icon.png')}
          />
        </Pressable>

        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: Theme.FONT_FAMILY_BOLD,
            textAlign: 'center',
          }}>
          Add Site
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: '#fff'}}>
        <View style={{padding: 15}}>
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
              placeholder="Site Location"
              placheholderText={'red'}
              textInputProps={{
                placeholderTextColor: '#ADA4A5',
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
            style={[
              styles.inputStyl,
              {minHeight: 130, textAlignVertical: 'top', paddingTop: 20},
            ]}
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
                style={{width: '100%', height: '100%'}}
                source={{uri: image?.path}}
              />
            )}
            {image?.length === 0 ? (
              <Text style={styles.txtStyl}>
                Audios, Photos, Videos of the Sites
              </Text>
            ) : null}
          </Pressable>
        </View>
      </ScrollView>
      <MyButton
        title={'Add Another Site'}
        loading={false}
        // onPress={() => navigation.navigate('AddSite')}
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
          marginTop: 35,
          marginBottom: 10,
        }}
      />
      <MyButton
        title={'Finish Tour'}
        loading={loading}
        onPress={add_site}
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
          marginTop: 10,
          marginBottom: 20,
        }}
      />
      <UploadImageModal
        isVisible={show}
        onPressGallery={_launchGallery}
        onPressCamera={_launchCamera}
        onBackdropPress={() => setShow(false)}
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
});

export default AddSiteScreen;
