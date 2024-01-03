import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import ImagePicker from 'react-native-image-crop-picker';
import UploadImageModal from '../../components/UpdateProfileModal';
import { delete_sites, delete_tourImage, get_sites_byid, update_tour } from '../../services/Api';
import { useSelector } from 'react-redux';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/core';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { locationPermission } from '../../utils/helperFunction';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
const EditTourScreen = ({ route }) => {
  const { item } = route?.params;
  const navigation = useNavigation();
  const userDetail = useSelector(state => state?.auth);
  const [TourName, setTourName] = useState(item?.tours_name);
  const [Price, setPrice] = useState(item?.tours_price);
  const [Description, setDescription] = useState(item?.tours_description);
  const [image, setImage] = useState(item?.tours_image);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: item?.tours_latitude,
    lng: item?.tours_longitude,
    address: item?.tours_location,
  });
  const [tourListData, setTourListData] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [editData, setEditData] = useState({});


  const getTourHandler = () => {
    setLoading1(true)
    get_sites_byid(item?.tours_id).then((res) => {
      setTourListData(res?.sites)
    }).catch((err) => {
      console.log("err", err)
    }).finally(() => {
      setLoading1(false)
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      getTourHandler();
    }, []),
  );


  const _edit = () => {
    setShow(false);
    setTimeout(() => {
      navigation.navigate('EditSiteScreen', { item: editData });
    }, 300);
  };

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
    setLocation({ lat: lat, lng: lng, address: cityText });
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
        setImage(image.path);
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
        setImage(image.path);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatetour = () => {
    setLoading(true);
    var formdata = new FormData();
    formdata.append('tours_id', item?.tours_id);
    formdata.append('tours_name', location?.address);
    formdata.append('tours_description', Description);
    formdata.append('tours_users_id', userDetail?.user?.id);
    formdata.append('tours_latitude', location?.lat);
    formdata.append('tours_longitude', location?.lng);
    formdata.append('tours_location', TourName);
    formdata.append('tours_price', Price);
    formdata.append('tours_image', "");
    update_tour(formdata)
      .then(result => {
        if (result?.status == '1') {
          navigation.goBack()
        }
      }).catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });
  };

  const _removeImage = (value) => {
    setLoading(true)
    delete_tourImage(value?.tig_id)
      .then(result => {
        if (result?.status == '1') {
          navigation.goBack()
        }
      }).catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });

  }

  const deleteTour = () => {
    setLoading(true);
    const data = {
      sites_id: editData?.sites_id
    }
    delete_sites(data)
      .then(result => {
        if (result?.status == '1') {
          getTourHandler();
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false);
      });
  };
  const confirmDelete = () => {
    setShow(false);
    Alert.alert('Delete Tour', 'Are you sure, you want to delete this tour', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteTour() },
    ]);
  };


  const TourListDataRender = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderBottomColor: "#E7E7E7",
          borderBottomWidth: 1,
          borderTopColor: "#E7E7E7",
          borderTopWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 100
        }}>
        <Image
          source={{ uri: item?.sites_image.replace('https://api.kankuapp.com:8080', 'https://api.kankuapp.com/kanku/api') }}
          style={{ width: 72, height: 68, borderRadius: 10 }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 12, zIndex: 1 }}
          onPress={() => { setEditData(item), setShow(true) }}>
          <Image
            source={require('../../assets/icons/edit_tour_icon.png')}
            style={{
              width: 26,
              height: 26,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
              lineHeight: 20,
            }}>
            {item?.sites_name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 5, alignItems: "center" }}>
            <Image
              style={{ width: 15, height: 15 }}
              source={require('../../assets/tabIcons/tours_icon.png')}
            />
            <Text
              numberOfLines={2}
              style={{
                marginLeft: 8,
                color: '#484C52',
                fontSize: 12,
                fontFamily: Theme.FONT_FAMILY_MEDIUM,
              }}>
              {item?.sites_location}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header title="Edit Tour" navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: '#fff' }}>
        <View style={{ padding: 15 }}>
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
              placeholder={item?.tours_name}
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
          <View style={{ marginVertical: 15, flexDirection: "row", flexWrap: "wrap", gap: 20 }}>
            {/* <Pressable
              onPress={() => setShow(true)}
              style={{
                height: 100,
                borderRadius: 10,
                overflow: 'hidden',
                width: 100,
                backgroundColor: '#F8F8F8',
                justifyContent: 'center',
                alignItems: "center",
                marginBottom: 15,
              }}>
              <MyText h1 style={{}}>+</MyText>
              <MyText h3 style={{ marginTop: 5 }}>{image.length}</MyText>
            </Pressable> */}
            {item?.tours_image_galleries.map((value, index) => {
              return (
                <View key={index} style={{ width: "30%", height: 100, borderRadius: 12, backgroundColor: "#fff", overflow: "hidden", elevation: 5 }}>
                  <TouchableOpacity style={{ width: 25, height: 25, borderRadius: 25 / 2, backgroundColor: "#fff", position: "absolute", zIndex: 1, justifyContent: "center", alignItems: "center", top: 8, right: 8 }} onPress={() => _removeImage(value)}>
                    <AntDesign name="close" size={15} />
                  </TouchableOpacity>
                  <Image source={{ uri: value.tig_tours_image_name }} style={{ width: "100%", height: "100%", }} />
                </View>
              )
            })}
          </View>

          {loading1 ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginVertical: 50 }}>
              <ActivityIndicator size={"small"} />
            </View>
            :
            tourListData?.length === 0 ?
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    justifyContent: 'center',
                    fontSize: 16,
                    fontFamily: Theme.FONT_FAMILY_MEDIUM,
                    color: 'black',
                    marginLeft: 20,
                  }}>
                  No Data here
                </Text>
              </View>
              :
              <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => {
                  return (
                    <View style={{ marginBottom: 10 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Theme.FONT_FAMILY_MEDIUM,
                          color: '#000',
                          fontWeight: "800"

                        }}>
                        Sites
                      </Text>
                    </View>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                data={tourListData}
                renderItem={TourListDataRender}
              />
          }

        </View>
      </ScrollView>
      <HideWithKeyboard>
        <MyButton
          title={'Update Tour'}
          loading={loading}
          onPress={updatetour}
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
            bottom: 10,
          }}
        />
      </HideWithKeyboard>
      {/* <UploadImageModal
        isVisible={show}
        onPressGallery={_launchGallery}
        onPressCamera={_launchCamera}
        onBackdropPress={() => setShow(false)}
      /> */}
      <UploadImageModal
        isVisible={show}
        onPressGallery={confirmDelete}
        onPressCamera={_edit}
        onBackdropPress={() => setShow(false)}
        file={true}
      />
    </View>
  );
};

export default EditTourScreen;

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
