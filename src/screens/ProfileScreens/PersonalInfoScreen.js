import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import Header from '../../components/Header';
import MyButton from '../../elements/MyButton';
import {UPDATEPROFILE} from '../../redux/Actions';
import store from '../../redux/Store';
import {update_user} from '../../services/Api';
import {ShowToast} from '../../utils/Helper';
const PersonalInfoScreen = ({route}) => {
  const {item} = route?.params;
  const navigation = useNavigation();
  const [name, setName] = useState(item?.full_name);
  const [number, setNumber] = useState(item?.mobile);
  const [email, setEmail] = useState(item?.email);
  const [address, setAddress] = useState(item?.address);
  const [econtact, setEcontact] = useState(item?.emergency_contact);
  const [govtId, setGovtId] = useState(item?.government_id);
  const [username, setUserName] = useState(item?.username);
  const [id, setId] = useState(item?.id);
  const [loading, setLoading] = useState(false);

  const updateHandler = () => {
    let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!name.trim()) {
      ShowToast('Please enter legal name ', 'error');
    } else if (!number.trim() || number.trim().length != 10) {
      ShowToast('Please enter valid number ', 'error');
    } else if (!email.trim() && email_reg.test(email) === false) {
      ShowToast('Please enter valid email ', 'error');
    } else if (!address.trim()) {
      ShowToast('Please enter address', 'error');
    } else if (!econtact.trim() || econtact.trim().length != 10) {
      ShowToast('Please enter emergency contact', 'error');
    } else if (!govtId.trim()) {
      ShowToast('Please enter goverment id', 'error');
    } else {
      setLoading(true);
      const body = {
        username: username,
        full_name: name,
        country_code: '+91',
        mobile: number,
        email: email,
        address: address,
        emergency_contact: econtact,
        government_id: govtId,
        user_id: id,
      };
      update_user(body).then(data => {
        console.log('dataaaa', data);
        if (data?.status == 1) {
          setLoading(false);
          store.dispatch({
            type: UPDATEPROFILE,
            payload: {user: data.user},
          });

          setTimeout(() => {
            ShowToast('Information Updated Successfully', 'success');
            navigation.goBack();
          }, 500);
        } else {
          ShowToast(data?.message, 'error');
          setLoading(false);
        }
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Header navigation={navigation} title="Personal Information" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}>
        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Legal Name</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Name"
            value={name}
            onChangeText={e => setName(e)}
          />
          {/* <Text style={styles.subTitleTxtStyl}>John Smith</Text> */}
          <Image
            source={require('../../assets/icons/edit_tour_dark_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Phone Number</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Number"
            keyboardType="number-pad"
            value={number}
            onChangeText={e => setNumber(e)}
          />

          <Image
            source={require('../../assets/icons/edit_tour_dark_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Email</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Email"
            value={email}
            onChangeText={e => setEmail(e)}
          />

          <Image
            source={require('../../assets/icons/edit_tour_dark_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Address</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Address"
            value={address}
            onChangeText={e => setAddress(e)}
          />

          <Image
            source={require('../../assets/icons/edit_tour_dark_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Emergency Contact</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Emergency contact"
            keyboardType="number-pad"
            value={econtact}
            onChangeText={e => setEcontact(e)}
          />

          <Image
            source={require('../../assets/icons/plus_circle_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Government ID</Text>
          <TextInput
            style={styles.subTitleTxtStyl}
            placeholder="Government ID"
            value={govtId}
            onChangeText={e => setGovtId(e)}
          />

          <Image
            source={require('../../assets/icons/plus_circle_icon.png')}
            style={styles.editImgStyl}
            resizeMode="cover"
          />
        </View>
        <MyButton
          title={'Update'}
          loading={loading}
          onPress={updateHandler}
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
            marginVertical: 40,
          }}
        />
      </ScrollView>
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
  bgStyl: {
    backgroundColor: '#F8F8F8',
    marginTop: 15,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 15,
    padding: 10,
  },
  titleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_MEDIUM,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    lineHeight: 24,
  },
  subTitleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    height: 40,
    fontSize: 12,
  },
  editImgStyl: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    top: '30%',
  },
});

export default PersonalInfoScreen;
