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
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import Header from '../../components/Header';
import MyText from '../../elements/MyText';

const PrivacyAndSharingScreen = ({ route, navigation }) => {
  const [CityName, setCityName] = useState('');
  const [Price, setPrice] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} barStyle={"content-dark"} />
      <Header title="Privacy and Sharing" navigation={navigation} />
      <View style={{ flex: 1, padding: 20 }}>
        <MyText h5 regular style={{ width: "99%" }} >Manage your data, third-party tools and sharing settings</MyText>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#888", borderBottomWidth: 1, paddingVertical: 20 }}>
          <View style={{ width: "90%" }}>
            <MyText h5 bold  >Request your personal data</MyText>
            <MyText h6 regular style={{ marginTop: 8 }} >We'll create a file for you to download your personal data.</MyText>
          </View>
          <Image
            source={require('../../assets/icons/right_arrow_icon.png')}
            style={{
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </View>
        <Pressable onPress={()=>navigation.navigate("DeleteAccount")} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#888", borderBottomWidth: 1, paddingVertical: 20 }}>
          <View style={{ width: "90%" }}>
            <MyText h5 bold  >Delete your account</MyText>
            <MyText h6 regular style={{ marginTop: 8 }} >This will permanently delete your account and your data, in accordance with applicable law.</MyText>
          </View>
          <Image
            source={require('../../assets/icons/right_arrow_icon.png')}
            style={{
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </Pressable>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#888", borderBottomWidth: 1, paddingVertical: 20 }}>
          <View style={{ width: "90%" }}>
            <MyText h5 bold  >Sharing</MyText>
            <MyText h6 regular style={{ marginTop: 8 }} >Decide how your profile and activity are shown to others</MyText>
          </View>
          <Image
            source={require('../../assets/icons/right_arrow_icon.png')}
            style={{
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#888", borderBottomWidth: 1, paddingVertical: 20 }}>
          <View style={{ width: "90%" }}>
            <MyText h5 bold  >Services</MyText>
            <MyText h6 regular style={{ marginTop: 8 }} >Check out and manage services that you've connected to your eTornus account</MyText>
          </View>
          <Image
            source={require('../../assets/icons/right_arrow_icon.png')}
            style={{
              width: 15,
              height: 15,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </View>



      </View>



    </View>
  );
};

export default PrivacyAndSharingScreen;
