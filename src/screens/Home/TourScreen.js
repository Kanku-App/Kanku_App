import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { get_booking_list } from '../../services/Api';
const TourScreen = ({ route }) => {
  const userDetail = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const [tourListData, setTourListData] = useState([]);
  const [loading, setLoading] = useState([]);

  const getTourHandler = () => {
    setLoading(true);
    get_booking_list(userDetail?.user?.id)
      .then(res => {
        if (res?.status == '1') {
          setTourListData(res?.bookings);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getTourHandler();
    }, []),
  );

  const TourDataRender = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('TourDetails', { item });
        }}
        style={{
          marginBottom: 20,
          borderRadius: 20,
          shadowColor: 'light-grey',
          backgroundColor: '#fff',
          elevation: 3,
          marginHorizontal: 18,
        }}>
        <Image
          source={{ uri: `https://api.kankuapp.com/kanku/api/${item.tours_image}` }}
          style={{
            height: 160,
            width: '100%',
            borderRadius: 20,
            alignSelf: 'center',
          }}
          resizeMode="stretch"
        />

        <Pressable
          onPress={() => {
            navigation.navigate('TourDetails', { item });
          }}
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingBottom: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
              lineHeight:24
            }}>
            {item.tours_name}
          </Text>
          <View
            style={{
              marginHorizontal: 10,
              flexDirection: 'row',
              marginTop: 10,
              paddingRight: 10,
            }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../assets/tabIcons/tours_icon.png')}
            />
            <Text
              style={{
                marginLeft: 5,
                color: '#484C52',
                fontSize: 12,
                fontFamily: Theme.FONT_FAMILY_MEDIUM,
              }}>
              {item.tours_location}
              <Text
                onPress={() => { }}
                style={{
                  fontSize: 12,
                  color: 'black',
                  textAlign: 'left',
                  fontFamily: Theme.FONT_FAMILY_BOLD,
                  color: Theme.PRIMARY_COLOR,
                  marginRight: 10,
                }}>
                View More
              </Text>
            </Text>
          </View>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={{ height: '100%', backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Text
        style={{
          marginTop: 15,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          marginLeft: 20,
        }}>
        Tours
      </Text>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : tourListData?.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          style={{ paddingTop: 18, flex: 1 }}
          data={tourListData}
          renderItem={TourDataRender}
        />
      )}
    </View>
  );
};

export default TourScreen;
