import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MyButton from '../../elements/MyButton';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import CustomMapView from './CustomMapView';
import { useFocusEffect } from '@react-navigation/native';
import {
  add_tour_wish,
  get_tour_details,
  remove_tour_wish,
} from '../../services/Api';
import { useSelector } from 'react-redux';
const HomeTourDetailScreen = ({ route }) => {
  const userDetails = useSelector(state => state?.auth);
  const { item } = route?.params;
  const navigation = useNavigation();
  const [isDetailsSelected, setIsDetailsSelected] = useState(true);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageActive, setImageActive] = useState(0);

  const onChange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imageActive) {
        setImageActive(slide)
      }
    }
  }

  const getTourHandler = () => {
    get_tour_details(
      item.tours_id || item?.wish_lists_tours_id,
      userDetails?.user?.id,
    )
      .then(res => {
        if (res?.status == '1') {
          setDetails(res?.tour);
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      getTourHandler();
    }, []),
  );

  const tour_wishAdd = () => {
    setLoading(true);
    const data = {
      wish_lists_tours_id: item?.tours_id || item?.wish_lists_tours_id,
      wish_lists_users_id: userDetails?.user?.id,
    };
    add_tour_wish(data)
      .then(res => {
        if (res?.status == '1') {
          getTourHandler();
        } else {
          console.log('else', res);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const tour_wishRemove = () => {
    setLoading(true);
    const data = {
      wish_tours_id: item?.tours_id || item?.wish_lists_tours_id,
      wish_users_id: userDetails?.user?.id,
    };
    remove_tour_wish(data)
      .then(res => {
        if (res?.status == '1') {
          getTourHandler();
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            height: 424,
            overflow: 'hidden',
            elevation: 2,
          }}>
          <View style={styles.topIconsContainer}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icons/back_icon.png')}
                resizeMode="contain"
                style={styles.backImgStyle}
              />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
              <Image
                source={require('../../assets/icons/share_icon.png')}
                resizeMode="contain"
                style={styles.shareImgStyle}
              />
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <Pressable
                  onPress={
                    details?.tours_in_wishlist == 'NO'
                      ? tour_wishAdd
                      : tour_wishRemove
                  }>
                  {details?.tours_in_wishlist == 'NO' ? (
                    <Ionicons name="heart-outline" size={25} color="#000" />
                  ) : (
                    <Ionicons name="heart" size={25} color="red" />
                  )}
                </Pressable>
              )}
            </View>
          </View>
          {/* <Image
            source={{ uri: details?.tours_image?.replace('https://api.kankuapp.com:8080', 'https://api.kankuapp.com/kanku/api') }}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          /> */}
          <ScrollView
            onScroll={({ nativeEvent }) => onChange(nativeEvent)}
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            horizontal
            style={{ width: Dimensions.get("window").width, height:Dimensions.get("window").height, backgroundColor: "#888" }}
          >
            {item?.tours_image_galleries?.map(((item, index) => {
              console.log("item?.tig_tours_image_name", item?.tig_tours_image_name)
              return (
                <Image key={index} source={{ uri: item?.tig_tours_image_name }} style={{ width: Dimensions.get("window").width, height:Dimensions.get("window").height}} resizeMode="cover" />
              )
            }))}
          </ScrollView>
          {item?.tours_image_galleries?.length == 1 ? null :
            <View
              style={{
                position: "absolute",
                top:Dimensions.get("screen").height * 0.490,
                flexDirection: "row",
                alignSelf: "center"
              }}>
              {item?.tours_image_galleries?.map(((item, index) => {
                return (
                  <Text key={index} style={imageActive == index ? styles.dotActive : styles.dot}>
                    ●
                  </Text>
                )
              }))}
            </View>
          }
          <MyStatusBar backgroundColor={'transparent'} />
        </View>
        <View style={{ padding: 20, paddingHorizontal: 25 }}>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
            }}>
            {item?.tours_name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/tabIcons/tours_icon.png')}
            />
            <Text style={styles.addressTxtStyle}>
              {details?.tours_location}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              marginVertical: 15,
              paddingVertical: 12,
              borderColor: '#E7E7E7',
            }}>
            <Image
              source={require('../../assets/dummyImages/user_dummy_icon_3.png')}
              style={styles.circleImgStyl}
              resizeMode="cover"
            />
            <View
              style={{
                alignSelf: 'center',
                marginLeft: 15,
                marginTop: 15,
                width: '65%',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  fontFamily: Theme.FONT_FAMILY_BOLD,
                  lineHeight: 24
                }}>
                {details?.full_name}
              </Text>
              {/* <Text
                style={{
                  color: 'black',
                  fontSize: 13,
                  fontFamily: Theme.FONT_FAMILY_REGULAR,
                  marginTop: 4,
                }}>
                Johan Smiths
              </Text> */}
            </View>
            <Pressable
              style={{
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                navigation.navigate('Chat', {
                  chats_receiver_id: details?.tours_users_id,
                  reciever_name: details?.full_name,
                  tours_id: details?.tours_id,
                });
              }}>
              <Image
                style={styles.callImgStyl}
                source={require('../../assets/icons/messenger.png')}
              />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              onPress={() => setIsDetailsSelected(true)}
              style={[
                styles.tabFirstTxtStyl,
                { borderBottomWidth: isDetailsSelected ? 4 : 0 },
              ]}>
              Details
            </Text>
            <Text
              onPress={() => setIsDetailsSelected(false)}
              style={[
                styles.tabFirstTxtStyl,
                { borderBottomWidth: !isDetailsSelected ? 4 : 0 },
              ]}>
              Review
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginVertical: 10,
              height: isDetailsSelected ? null : 0,
            }}>
            <Text
              style={{ color: '#4A4A4A', fontSize: 14, textAlign: 'justify' }}>
              {item?.tours_description}
            </Text>
            <View
              onPress={() => { }}
              style={{
                width: '100%',
                height: 288,
                marginTop: 20,
                marginBottom: 100,
                borderRadius: 20,
              }}>
              <CustomMapView />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.priceContainer}>
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <Text
            style={{
              color: '#2F4858',
              fontSize: 18,
              fontFamily: Theme.FONT_FAMILY_REGULAR,
            }}>
            Price
          </Text>
          <Text
            style={{
              color: Theme.PRIMARY_COLOR,
              fontSize: 24,
              fontFamily: Theme.FONT_FAMILY_MEDIUM,
            }}>
            $ {details?.tours_price}
          </Text>
        </View>

        <MyButton
          title={'Book'}
          loading={false}
          onPress={() => navigation.navigate('Payment', { item: details })}
          textStyle={{
            fontSize: 18,
            fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
            lineHeight: 30,
          }}
          style={{
            borderRadius: 30,
            width: 160,
            alignSelf: 'center',
            height: 55,
            position: 'absolute',
            right: 15,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#fff',
    width: '90%',
    height: 100,
    elevation: 2,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    padding: 20,
  },
  topIconsContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 50,
    width: '90%',
    alignSelf: 'center',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backImgStyle: {
    width: 32,
    height: 32,
  },
  shareImgStyle: {
    width: 24,
    height: 24,
  },
  wishListImgStyle: {
    width: 24,
    height: 24,
  },
  addressTxtStyle: {
    marginLeft: 5,
    color: '#000',
    fontSize: 12,
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontWeight: '800',
  },
  circleImgStyl: {
    width: 75,
    height: 75,
    borderRadius: 80 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 15,
  },
  lineStyle: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginTop: 20,
  },
  txtUserNameStyl: {
    fontSize: Theme.FONT_SIZE_MEDIUM,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    color: 'black',
    alignSelf: 'center',
    marginLeft: 10,
  },
  ratingContainerStyl: {
    borderWidth: 1,
    borderColor: Theme.PRIMARY_COLOR,
    width: 60,
    height: 35,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  starImgStyle: {
    width: 12,
    height: 12,
    alignSelf: 'center',
    marginLeft: 4,
    tintColor: Theme.PRIMARY_COLOR,
  },
  tabFirstTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_BOLD,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    borderBottomWidth: 4,
    borderColor: Theme.PRIMARY_COLOR,
    paddingBottom: 5,
    marginRight: 25,
  },
  tabSecondTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_BOLD,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    marginLeft: 15,
    borderBottomWidth: 4,
    borderColor: Theme.PRIMARY_COLOR,
    paddingBottom: 5,
  },
  callImgStyl: {
    width: 20,
    height: 20,
    tintColor: Theme.PRIMARY_COLOR,
  },
  dotActive: {
    margin: 3,
    color: "#000"
  },
  dot: {
    margin: 3,
    color: "#888"
  }
});

export default HomeTourDetailScreen;
