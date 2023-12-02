import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import CustomMapView from '../Home/CustomMapView';
import Header from '../../components/Header';
import { useFocusEffect } from '@react-navigation/native';
import { get_sites_byid, publish_tour } from '../../services/Api';
import MyText from '../../elements/MyText';
const PreviewScreen = ({ route }) => {
  const { tourID, tourName, price } = route?.params
  const navigation = useNavigation();
  const [tourListData, setTourListData] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);



  const TourListDataRender = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 2,
          paddingVertical: 5,
          borderBottomColor: "#E7E7E7",
          borderBottomWidth: 1

        }}>
        <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
          <Image
            source={{ uri: item.sites_image }}
            style={{ width: 72, height: 72, borderRadius: 20 }}
            resizeMode="cover"
          />

          <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'left',
                fontFamily: Theme.FONT_FAMILY_BOLD,
              }}>
              {item?.sites_name}
            </Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/tabIcons/tours_icon.png')}
              />
              <Text
                numberOfLines={2}
                style={{
                  marginLeft: 5,
                  color: '#484C52',
                  fontSize: 12,
                  fontFamily: Theme.FONT_FAMILY_MEDIUM,
                }}>
                {item?.sites_location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };


  const getTourHandler = () => {
    setLoading(true)
    get_sites_byid(tourID).then((res) => {
      setTourListData(res?.sites)
    }).catch((err) => {
      console.log("err", err)
    }).finally(() => {
      setLoading(false)
    })
  }

  const publisTourHandler = () => {
    setLoading1(true)
    publish_tour(tourID).then((res) => {
      if (res?.status == "1") {
        navigation.navigate('BottomTab')
      }
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header navigation={navigation} title={"Preview"} />

      <ScrollView style={styles.subContainer}>
        <View
          style={styles.inputStyl}
        >
          <MyText h6 bold>{tourName}</MyText>

        </View>

        <View
          style={styles.inputStyl}
        >
          <MyText h6 bold>{price}</MyText>

        </View>

        <View
          onPress={() => { }}
          style={{
            width: '100%',
            height: 288,
            marginVertical: 20,
          }}>
          <CustomMapView />
        </View>

        {loading ?
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
              keyExtractor={(item, index) => index.toString()}
              data={tourListData}
              renderItem={TourListDataRender}
            />
        }


      </ScrollView>
      <MyButton
        title={'Publish Tour'}
        loading={loading1}
        onPress={publisTourHandler}
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  inputStyl: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    marginTop: 15,
    color: 'black',
    borderRadius: 12,
    justifyContent: "center"
  }

});

export default PreviewScreen;
