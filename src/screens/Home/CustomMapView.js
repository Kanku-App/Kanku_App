import { View, Text, Image, StyleSheet, PermissionsAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function CustomMapView({ lat = 22.5353, lng = 75.35352 }) {
  const [coordinates] = useState([
    {
      latitude: lat,
      longitude: lng,
    },
  ])
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={[styles.map_, { borderRadius: 20 }]}
      region={{
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      loadingEnabled={true}
      flat={true}>
      <Marker
        coordinate={coordinates[0]}
      />
    </MapView>
  );
}
const styles = StyleSheet.create({
  map_: {
    ...StyleSheet.absoluteFillObject,
  },
});
