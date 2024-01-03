import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import MyStatusbar from '../../elements/MyStatusBar';
import { get_sites_byid } from '../../services/Api';
import Theme from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { locationPermission, getCurrentLocation } from '../../utils/helperFunction';
import SitesModal from '../../components/SitesModal';
const StartTour = ({ route }) => {
  const { tour_id, latitude, longitude } = route?.params;
  const [driverLat, setDriverLat] = useState({
    lat: 22.5235,
    lon: 75.535,
  });
  const [tourListData, setTourListData] = useState([]);
  const [imageActive, setImageActive] = useState(0);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const [coordinates] = useState([
    {
      latitude: driverLat.lat,
      longitude: driverLat.lon,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0421,
    },
    {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0421,
    },
  ]);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation();
      setDriverLat({ lat: latitude, lon: longitude });
    }
  };


  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imageActive) {
        setImageActive(slide)
      }
    }
  }

  const getTourHandler = () => {
    get_sites_byid(tour_id)
      .then(res => {
        setTourListData(res?.sites);
      })
      .catch(err => {
        console.log('err', err);
      })
  };

  useFocusEffect(
    React.useCallback(() => {
      getLiveLocation()
      getTourHandler();
    }, []),
  );

  const origin = { latitude: driverLat.lat, longitude: driverLat.lon };
  const destination = { latitude: latitude, longitude: longitude };

  const TourListDataRender = ({ item }) => {
    return (
      <Pressable onPress={() => { setData(item), setShow(true) }} style={{ flexDirection: 'row', padding: 20, width: Dimensions.get("screen").width }}>
        <Image
          source={{ uri: item?.sites_image.replace('https://api.kankuapp.com:8080/', 'https://api.kankuapp.com/kanku/api/') }}
          style={{ width: 100, height: 100, borderRadius: 20 }}
          resizeMode="stretch"
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
              lineHeight: 24
            }}>
            {item.sites_name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
              marginVertical: 8
            }}>
            {item.sites_description}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/tabIcons/tours_icon.png')}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginLeft: 5,
                color: '#484C52',
                fontSize: 12,
                fontFamily: Theme.FONT_FAMILY_MEDIUM,
                width: '95%',
              }}>
              {item.sites_location}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusbar backgroundColor={'white'} barStyle={'dark-content'} />
      <MapView
        showsMyLocationButton={false}
        showsUserLocation={false}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "100%" }}
        region={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={'AIzaSyAEKIGD-7QbMF1ZEtd7PVabDq_yKx5eyIc'} // insert your API Key here
          strokeWidth={3}
          strokeColor={'#00C9A7'}
        />
        <Marker draggable coordinate={origin}>
        </Marker>
        <Marker coordinate={destination} />
      </MapView>
      <View
        style={{
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderRadius: 20,
          overflow: "hidden"
        }}>
        <FlatList
          onScroll={({ nativeEvent }) => onChange(nativeEvent)}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={tourListData}
          renderItem={TourListDataRender}
        />
        {tourListData?.length == 0 ? null :
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              flexDirection: "row"
            }}>
            {tourListData?.map((item, index) => {
              return (
                <Text key={index} style={imageActive == index ? styles.dotActive : styles.dot}>
                  ●
                </Text>
              )
            })}
          </View>
        }
      </View>
      <SitesModal isVisible={show} data={data} onBackdropPress={() => setShow(false)} />
    </View>
  );
};

export default StartTour;
const styles = StyleSheet.create({
  dotActive: {
    margin: 3,
    color: "#000"
  },
  dot: {
    margin: 3,
    color: "#888"
  },
  titleTxtStyl: {
    justifyContent: 'center',
    fontSize: 30,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    color: 'black',
  },
  descriptionTxtStyl: {
    justifyContent: 'center',
    fontSize: Theme.FONT_SIZE_EXTRA_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    color: 'black',
    marginTop: 10,
    textAlign: 'justify',
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginTop: 20,
  },

  subTxtStyle: {
    fontSize: Theme.FONT_SIZE_LARGE,
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_BOLD,
    marginTop: 15,
  },
});