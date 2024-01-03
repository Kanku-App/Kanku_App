import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import { useNavigation } from '@react-navigation/core';
import Header from '../../components/Header';

const BookingStatusScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header navigation={navigation} title={"Booking"} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={styles.BookImgStyl}
          source={require('../../assets/images/booking_success.png')}
        />

        <Text
          style={{
            color: '#1E1E1E',
            fontSize: 22,
            fontFamily: Theme.FONT_FAMILY_BOLD,
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 24
          }}>
          Congratulations!
        </Text>

        <Text style={styles.descriptionTxtStyl}>
          Lorem ipsum dolor sit amet consectetur. Nam turpis nunc mauris
          dignissim lorem lacus nunc. Aliquam urna.!
        </Text>

        <MyButton
          title={'View Booking'}
          loading={false}
          onPress={() => navigation.navigate('BottomTab')}
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
            marginTop: 80,
          }}
        />

        <MyButton
          title={'Cancel'}
          loading={false}
          onPress={() => navigation.navigate("BottomTab")}
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
            marginTop: 30,
            opacity: 0.5,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BookImgStyl: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  descriptionTxtStyl: {
    color: '#9E9FA5',
    fontSize: Theme.FONT_SIZE_SMALL,
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    marginTop: 10,
    alignItems: "center",
    textAlign: "center"
  },
});

export default BookingStatusScreen;
