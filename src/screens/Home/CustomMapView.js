import {View, Text, Image, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default function CustomMapView() {
  const [coordinates] = useState([
    {
      latitude: 22.5353,
      longitude: 75.35352,
    },
  ]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [Reports, setReports] = useState([
    {
      id: 45981,
      time: '2020-01-14T04:20:00.000Z',
      size: 125,
      location: '4 ESE GAMALIEL',
      city: 'GAMALIEL',
      county: 'MONROE',
      state: 'KY',
      latitude: 36.62,
      longitude: -85.73,
      comments: 'PUBLIC REPORT RELAYED BY MEDIA. (LMK)',
      filename: null,
      created_at: '2020-03-05T14:54:06.650Z',
      updated_at: '2020-03-05T14:54:06.650Z',
    },
  ]);

  const [location, setLocation] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map_,{borderRadius:20}]}
        region={{
          latitude: 22.564624,
          longitude: 75.8868,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onMapReady={() => {
          setIsMapReady(true);
        }}
        loadingEnabled={true}
        flat={true}>
        {() => {
          isMapReady ? (
            <Marker
              image={require('../../assets/icons/star_icon.png')}
              coordinate={coordinates[0]}
              onDragEnd={e => {
                setPin(e.nativeEvent.coordinate);
              }}
            />
          ) : null;
        }}
      </MapView>
  );
}
const styles = StyleSheet.create({
  map_: {
    ...StyleSheet.absoluteFillObject,
  },
});
