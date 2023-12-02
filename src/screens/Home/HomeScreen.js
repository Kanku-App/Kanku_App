import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import { useSelector } from 'react-redux';
import { get_tour_published } from '../../services/Api';
import { useFocusEffect } from '@react-navigation/native';
const HomeScreen = ({ route }) => {
  const userDetail = useSelector((state) => state?.auth)
  const navigation = useNavigation();
  const [searchTxt, setSearchTxt] = useState('');
  const [TourCategoryData, setTourCategoryData] = useState([]);
  const [loading, setLoading] = useState([]);


  const getPublisTour = () => {
    setLoading(true)
    get_tour_published(userDetail?.user?.id).then(response => {
      if (response.status == "1") {
        setTourCategoryData(response?.tours);
      }
    }).catch((err) => {
      console.log("err", err)
    }).finally(() => {
      setLoading(false)

    })
  };

  useFocusEffect(
    React.useCallback(() => {
      getPublisTour();
    }, []),
  );

  const SecondListData = [];

  const CityDataRender = ({ item }) => {
    return (
      <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
        <Image
          source={{ uri: item.city_image }}
          style={{ width: 55, height: 55, borderRadius: 110 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            textAlign: 'center',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            marginTop: 4,
          }}>
          {item.city_name}
        </Text>
      </View>
    );
  };

  const HomeTourDataRender = ({ item }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('HomeTourDetails', { item })}
        style={{
          flexDirection: 'column',
          marginHorizontal: 10,
          marginTop: 15,
          marginBottom: 10,
          borderRadius: 25,
          shadowColor: 'light-grey',
          backgroundColor: 'white',
          width: "90%",
          alignSelf: 'center',
          paddingBottom: 10,
          elevation: 2
        }}>
        <View style={{ width: "100%", height: 260, borderRadius: 25, elevation: 3, backgroundColor: "#fff" }}>
          <Image
            source={{ uri: item.tours_image }}
            style={{
              height: "100%",
              borderRadius: 25,
            }}
            resizeMode="cover"
          />
        </View>


        <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 15 }}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 20,
              color: 'black',
              textAlign: 'left',
              fontFamily: Theme.FONT_FAMILY_BOLD,
            }}>
            {item.tours_name}
          </Text>

          <View
            style={{ marginHorizontal: 10, flexDirection: 'row', marginTop: 15 }}>
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
                }}>
                {" "}View More
              </Text>
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Image
              style={{ width: 30, height: 30, alignSelf: 'center' }}
              source={require('../../assets/dummyImages/dummy_circle_image_1.png')}
            />

            <Image
              style={{
                width: 12,
                height: 12,
                alignSelf: 'center',
                marginLeft: 4,
              }}
              source={require('../../assets/icons/star_icon.png')}
            />

            <Text
              style={{
                fontSize: 10,
                fontFamily: Theme.FONT_FAMILY_MEDIUM,
                color: 'black',
                marginLeft: 4,
                alignSelf: 'center',
              }}>
              {item.rating}
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.FONT_FAMILY_BOLD,
                color: Theme.PRIMARY_COLOR,
                marginLeft: 4,
                alignSelf: 'center',
                position: 'absolute',
                right: 10,
              }}>
              $ {item.tours_price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: '100%',
      }}>
      <MyStatusBar backgroundColor={'#fff'} />

      <View
        style={{
          height: 50,
          flexDirection: 'row',
          backgroundColor: 'white',
          marginVertical: 10,
          marginHorizontal: 15,
          paddingHorizontal: 10,
          borderRadius: 15,
          elevation: 2,
        }}>
        <Image
          source={require('../../assets/icons/search_icon.png')}
          style={{ width: 16, height: 16, alignSelf: 'center' }}
        />

        <TextInput
          value={searchTxt}
          onChangeText={text => {
            setSearchTxt(text);
          }}
          placeholder="Search..."
          style={styles.searchStyl}
          placeholderTextColor="#302D2D"
          inputMode="text"
        />

        <Image
          source={require('../../assets/icons/filter_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 5 }}
            data={TourCategoryData}
            horizontal
            renderItem={CityDataRender}
          />
        </View> */}

        {loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: Dimensions.get("screen").height / 1.5 }}>
            <ActivityIndicator size={"small"} />
          </View>
          :
          TourCategoryData?.length === 0 ?
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
              keyExtractor={(item, index) => index.toString()}
              style={{ flex: 1 }}
              data={TourCategoryData}
              renderItem={HomeTourDataRender}
            />
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotTxtStyl: {
    color: Theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '900',
    fontSize: 12,
  },
  inputViewStyle: {
    backgroundColor: '#F7F8F8',
    height: 66,
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchStyl: {
    paddingLeft: 10,
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    fontSize: 14,
    width: '85%',
  },
});

export default HomeScreen;
