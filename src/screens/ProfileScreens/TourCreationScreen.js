import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import ImagePicker from 'react-native-image-crop-picker';
import UploadImageModal from '../../components/UpdateProfileModal';
import {ShowToast} from '../../utils/Helper';
import {create_tour} from '../../services/Api';
import {useSelector} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {
  locationPermission,
  getCurrentLocation,
} from '../../utils/helperFunction';
const TourCreationScreen = ({navigation}) => {
  const userDetail = useSelector(state => state?.auth);
  const [TourName, setTourName] = useState();
  const [Price, setPrice] = useState();
  const [Description, setDescription] = useState();
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: '',
    lng: '',
    address: '',
  });

  const onPressAddress = (data, details) => {
    let resLength = details.address_components;
    let zipCode = '';
    let filtersResCity = details.address_components.filter(val => {
      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }
      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }
      return false;
    });
    let dataTextCityObj =
      filtersResCity.length > 0
        ? filtersResCity[0]
        : details.address_components[
            resLength > 1 ? resLength - 2 : resLength - 1
          ];
    let cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    getLiveLocation(lat, lng);
    setLocation({lat: lat, lng: lng, address: cityText});
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
        setTourName(json.results[0]?.formatted_address);
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

  const add_tour = () => {
    if (!Description || !Price) {
      ShowToast('All Field Required', 'error');
    } else if (image?.length === 0) {
      ShowToast('Upload Image', 'error');
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('tours_name', location?.address);
      formdata.append('tours_description', Description);
      formdata.append('tours_users_id', userDetail?.user?.id);
      formdata.append('tours_latitude', location?.lat);
      formdata.append('tours_longitude', location?.lng);
      formdata.append('tours_location', TourName);
      formdata.append('tours_price', Price);
      formdata.append('tours_image', {
        uri:
          Platform.OS == 'android'
            ? image?.path
            : image.path.replace('file:', ''),
        type: image?.mime,
        name: image?.filename == undefined ? 'image.jpg' : image?.filename,
      });
      create_tour(formdata)
        .then(result => {
          if (result?.status == '1') {
            navigation.navigate('AddSite', {
              data: result,
              tourName: location?.address,
              price: Price,
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
          Tour Creation
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={{backgroundColor: '#fff'}}>
        <View style={{padding: 15}}>
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
              placeholder="Tour Name"
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
            value={Description}
            onChangeText={value => setDescription(value)}
            inputMode="text"
            placeholder="General Description"
            placeholderTextColor={'#979797'}
            multiline={true}
          />

          <TextInput
            style={styles.inputStyl}
            value={Price}
            onChangeText={value => setPrice(value)}
            numberOfLines={1}
            inputMode="numeric"
            placeholder="Price"
            placeholderTextColor={'#979797'}
          />

          <Pressable
            onPress={() => setShow(true)}
            style={{
              height: 150,
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
              <Text style={styles.txtStyl}>Main Photos</Text>
            ) : null}
          </Pressable>
        </View>
      </ScrollView>
      <HideWithKeyboard>
        <MyButton
          title={'Add Site'}
          loading={loading}
          onPress={add_tour}
          textStyle={{
            fontSize: 18,
            fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
            lineHeight: 30,
          }}
          style={{
            borderRadius: 30,
            width: '100%',
            alignSelf: 'center',
            width: '90%',
            position: 'absolute',
            bottom: 50,
          }}
        />
      </HideWithKeyboard>
      <UploadImageModal
        isVisible={show}
        onPressGallery={_launchGallery}
        onPressCamera={_launchCamera}
        onBackdropPress={() => setShow(false)}
      />
    </View>
  );
};

export default TourCreationScreen;

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
