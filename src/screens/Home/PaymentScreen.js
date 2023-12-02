import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import { useNavigation } from '@react-navigation/core';
import MyButton from '../../elements/MyButton';
import Header from '../../components/Header';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useSelector } from 'react-redux';
import { add_tour_booking } from '../../services/Api';

const PaymentScreen = ({ route }) => {
  const userDetails = useSelector((state) => state?.auth)
  const { item } = route?.params
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);

  const bookingHandler = () => {
    setLoading(true)
    const data = {
      tours_bookings_tours_id: item?.tours_id,
      tours_bookings_users_id: userDetails?.user?.id
    }
    add_tour_booking(data).then((res) => {
      if (res?.status == "1") {
        navigation.navigate('BookingStatus')
      } else {
        console.log("else", res)
      }
    }).catch((err) => {
      console.log("err", err)
    }).finally(() => {
      setLoading(false)
    })

  }


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header title="Payment" navigation={navigation} />
      <View style={{ padding: 10, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            elevation: 5,
            borderRadius: 15,
            backgroundColor: '#fff',
            padding: 5
          }}>
          <Image
            source={{ uri: item?.tours_image }}
            style={{ width: 105, height: 105, borderRadius: 15 }}
            resizeMode="cover"
          />
          <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'left',
                fontFamily: Theme.FONT_FAMILY_BOLD,
              }}>
              {item?.tours_name}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Image
                style={{ width: 20, height: 20 }}
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
                {item?.tours_location}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: Theme.FONT_FAMILY_BOLD,
                color: Theme.PRIMARY_COLOR,
                marginTop: 5,
              }}>
              $ {item?.tours_price}
            </Text>
          </View>

          <View style={{
            width: 22,
            height: 22,
            position: 'absolute',
            right: 12,
            top: 10,
          }}>
            {item?.tours_in_wishlist == "NO" ? <Ionicons name="heart-outline" size={20} color="#fff" /> : <Ionicons name="heart" size={20} color="red" />}


          </View>


        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.titleTxtStyl}>Payment Details</Text>
          <View style={styles.rowDataStyl}>
            <Text style={styles.subTotelTxtStyl}>Subtotal</Text>
            <Text
              style={[styles.subTotelTxtStyl]}>
              $ {item?.tours_price}
            </Text>
          </View>
          <View style={styles.rowDataStyl}>
            <Text style={styles.subTotelTxtStyl}>Taxes</Text>
            <Text
              style={styles.subTotelTxtStyl}>
              $ 0.0
            </Text>
          </View>

          <View style={styles.rowDataStyl}>
            <Text
              style={[
                styles.subTotelTxtStyl,
                { color: 'black', fontFamily: Theme.FONT_FAMILY_BOLD },
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.subTotelTxtStyl,
                { fontWeight: "800", color: "#000" }
              ]}>
              $ {item?.tours_price}
            </Text>
          </View>

          <Text style={[styles.titleTxtStyl, { marginTop: 30, marginBottom: 10 }]}>Methods</Text>
          <View style={{ height: Dimensions.get("window").height * 0.3, width: "100%" }}>
            <Image
              style={{
                height: "100%",
                width: '100%',
              }}
              source={require('../../assets/dummyImages/bank_cards_dummy_image.png')}
            />
          </View>

          <Text style={styles.subTitleTxtStyl}>Card Number</Text>
          <TextInput
            style={styles.inputStyl}
            value={cardNumber}
            onChangeText={value => setCardNumber(value)}
            numberOfLines={1}
            inputMode="numeric"
            maxLength={12}
            placeholder="Enter 12 digit card number"
            placeholderTextColor={'#979797'}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.subTitleTxtStyl, { marginTop: 20, lineHeight: 24 }]}>
              Valid through
            </Text>
            <Text style={[styles.subTitleTxtStyl, { marginTop: 20, lineHeight: 24, marginLeft: "33%" }]}>CVV</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, gap: 10 }}>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: '#F8F8F8',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                width: "28%",
                padding: 15,

              }}>
              <Text style={styles.monthTxtStyl}>Month</Text>
              <Image
                style={styles.downImgStyl}
                source={require('../../assets/icons/down_arrow.png')}
              />
            </View>
            <View
              style={{
                borderRadius: 12,
                backgroundColor: '#F8F8F8',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                width: "28%",
                padding: 15,

              }}>
              <Text style={styles.monthTxtStyl}>Year</Text>
              <Image
                style={styles.downImgStyl}
                source={require('../../assets/icons/down_arrow.png')}
              />
            </View>

            <View
              style={{
                borderRadius: 12,
                backgroundColor: '#F8F8F8',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
                width: "28%",
                padding: 15,

              }}>
              <Text style={styles.monthTxtStyl}>CVV</Text>
              <Image
                style={styles.downImgStyl}
                source={require('../../assets/icons/eye_hide_icon.png')}
              />
            </View>


          </View>

          <Text style={[styles.subTitleTxtStyl, { marginTop: 15 }]}>
            Card Holder's Name
          </Text>

          <TextInput
            style={styles.inputStyl}
            value={cardName}
            onChangeText={value => setCardName(value)}
            numberOfLines={1}
            inputMode="text"
            maxLength={12}
            placeholder="Name on Card"
            placeholderTextColor={'#979797'}
          />

          <MyButton
            title={'Submit'}
            loading={loading}
            onPress={bookingHandler}
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
              marginTop: 30,
            }}
          />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleTxtStyl: {
    fontSize: Theme.FONT_SIZE_MEDIUM,
    color: '#101623',
    fontFamily: Theme.FONT_FAMILY_BOLD,
  },
  subTitleTxtStyl: {
    fontSize: Theme.FONT_SIZE_SMALL,
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_BOLD,
  },
  rowDataStyl: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: "space-between",
    alignItems: "center"
  },
  subTotelTxtStyl: {
    color: '#555555',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_SMALL,
    paddingVertical: 2,
  },
  inputStyl: {
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    marginTop: 10,
    color: 'black',
    paddingHorizontal: 16,
  },
  monthTxtStyl: {
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
    color: '#979797',
    textAlignVertical: 'center',
  },
  downImgStyl: {
    width: 12,
    height: 10,
  },
});
export default PaymentScreen;
