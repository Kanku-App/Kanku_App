import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Theme from '../../theme';
import MyStatusBar from '../../elements/MyStatusBar';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {get_wish_list} from '../../services/Api';

const WishListScreen = ({route}) => {
  const userDetails = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlistHandler = () => {
    setLoading(true);
    get_wish_list(userDetails?.user?.id)
      .then(res => {
        console.log('res', res);
        if (res?.status == '1') {
          setData(res?.wish_lists);
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
      getWishlistHandler();
    }, []),
  );

  const WishListDataRender = ({item}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('HomeTourDetails', {item})}
        style={{
          flexDirection: 'column',
          height: 116,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item?.tour_image}}
            style={{width: 100, height: 95, borderRadius: 20}}
            resizeMode="stretch"
          />
          <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'left',
                fontFamily: Theme.FONT_FAMILY_BOLD,
              }}>
              {item.tours_name}
            </Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/tabIcons/tours_icon.png')}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  marginLeft: 5,
                  color: '#484C52',
                  fontSize: 12,
                  fontFamily: Theme.FONT_FAMILY_MEDIUM,
                }}>
                {item.tours_description}
              </Text>
            </View>
            {/* <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.FONT_FAMILY_BOLD,
                color: Theme.PRIMARY_COLOR,
                marginTop: 5,
              }}>
              $ {item.price}
            </Text> */}
          </View>
        </View>

        <Image
          source={require('../../assets/icons/wishlist_color_icon.png')}
          style={{
            width: 22,
            height: 22,
            position: 'absolute',
            right: 10,
            top: 10,
          }}
          resizeMode="cover"
        />

        <View style={styles.lineStyl} />
      </Pressable>
    );
  };

  return (
    <View style={{height: '100%', backgroundColor: '#fff', padding: 15}}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Text
        style={{
          marginVertical: 10,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
        }}>
        WishList
      </Text>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'small'} />
        </View>
      ) : data?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          style={{paddingTop: 18, flex: 1}}
          data={data}
          renderItem={WishListDataRender}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  lineStyl: {
    height: 1,
    backgroundColor: '#E7E7E7',
    marginTop: 10,
  },
});

export default WishListScreen;
