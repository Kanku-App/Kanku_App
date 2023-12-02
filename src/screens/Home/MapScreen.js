import React, {useEffect, useRef} from 'react';
import {Image, View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView from 'react-native-maps';
import CustomMapView from './CustomMapView';

const MapScreen = ({route}) => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const photosData = [
    {
      image: require('../../assets/dummyImages/dummy_image_1.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_2.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_1.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_2.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_2.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_1.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_image_2.png'),
    },
  ];

  const photosRenderItems = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <Image style={{}} source={item.image} resizeMode="contain" />
      </View>
    );
  };

  const videosData = [
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
    {
      image: require('../../assets/dummyImages/dummy_video_image.png'),
    },
  ];

  const videosRenderItems = ({item}) => {
    return (
      <View
        style={{
          marginHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={{}} source={item.image} resizeMode="contain" />

        <Image
          style={{alignSelf: 'center', position: 'absolute'}}
          source={require('../../assets/icons/play_icon.png')}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={2000}
        minClosingHeight={600}
        height={1000}>
        <ScrollView
          nestedScrollEnabled
          style={{marginHorizontal: 15, height: '100%', marginBottom: 20}}>
          <Text style={styles.titleTxtStyl}>Museum of Madrid</Text>
          <Text style={styles.descriptionTxtStyl}>
            The Thyssen-Bornemisza National Museum, or simply the Thyssen, is an
            art museum in Madrid, Spain, located near the Prado Museum on one of
            the city's main boulevards. It is known as part of the "Gold…
          </Text>

          <View style={styles.lineStyle} />

          <Text style={styles.subTxtStyle}>Audio</Text>

          <Image
            style={{width: '100%', marginTop: 20}}
            source={require('../../assets/images/audio_image.png')}
            resizeMode="contain"
          />

          <Text style={styles.subTxtStyle}>Photo</Text>

          <FlatList
            style={{marginTop: 10, width: '100%'}}
            renderItem={photosRenderItems}
            data={photosData}
            horizontal={true}
          />

          <Text style={styles.subTxtStyle}>Video</Text>

          <FlatList
            style={{marginTop: 10, width: '100%'}}
            renderItem={videosRenderItems}
            data={videosData}
            horizontal={true}
          />

          <MyButton
            title={'Next Site'}
            loading={false}
            onPress={() => {}}
            textStyle={{
              fontSize: 18,
              fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
              lineHeight: 30,
            }}
            style={{
              borderRadius: 30,
              width: '100%',
              alignSelf: 'center',
              height: 55,
              marginBottom: 20,
              marginTop: 20,
            }}
          />
        </ScrollView>
      </RBSheet>

      <Pressable
        onPress={() => {
          refRBSheet.current.open();
        }}
        style={{width: '100%', height: '100%', marginTop: 20}}>
        <CustomMapView />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default MapScreen;
