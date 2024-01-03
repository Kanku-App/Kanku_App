/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';

import CheckBox from 'react-native-check-box';
import { ShowToast } from '../../utils/Helper';
import { signup } from '../../services/Api';
import { locationPermission, getCurrentLocation } from '../../utils/helperFunction';
const Register = ({ route }) => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [FullName, setFullName] = useState('');
  const [Email, setEmail] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [Password, setPassword] = useState('');
  const [isPasswordHide, setIsPasswordHide] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [llat, setllat] = useState({ lat: "", lon: "" });

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation();
      setllat({ lat: latitude, lon: longitude });
    }
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  const SignupAPI = () => {
    let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!FullName) {
      ShowToast('Please enter full name ', 'error');
    } else if (!Email && email_reg.test(Email) === false) {
      ShowToast('Please enter valid email ', 'error');
    } else if (!MobileNumber && MobileNumber.length != 10) {
      ShowToast('Please enter valid number ', 'error');
    } else if (!Password) {
      ShowToast('Please enter password', 'error');
    } else if (!isChecked) {
      ShowToast('Please agree terms & condition', 'error');
    } else {
      setLoading(true);
      const body = {
        username: FullName,
        email: Email,
        password: '123456',
        full_name: FullName,
        country_code: '+91',
        device_id: 'nksfjnkfjnfkgjnbnklfgjnKBkjfbkjbJBKbkjbgkj',
        device_type: 'android',
        mobile: MobileNumber,
        latitude: llat?.lat,
        longitude: llat?.lon,
      };
      signup(body).then(data => {
        console.log("data", data)
        if (data?.user) {
          setLoading(false);
          ShowToast('Signup Successfully', 'success');
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              }),
            );
          }, 500);
        } else {
          ShowToast("Please Enter Unique User Name , Email and Number", 'error');
          setLoading(false);
        }
      }).catch((err) => {
        ShowToast("Please Enter Unique User Name , Email and Number", 'error');
      }).finally(() => {
        setLoading(false);

      })
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: 20,
      }}>
      {/* {for toolbar}  */}
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          flexDirection: 'row',
          height: 60,
          justifyContent: 'center',
          width: '100%',
        }}>
        <Pressable
          onPress={() => navigation.pop(1)}
          style={{ width: 35, height: 35, position: 'absolute', left: 0 }}>
          <Image
            style={{ width: 35, height: 35 }}
            source={require('../../assets/icons/back_icon.png')}
          />
        </Pressable>

        <Text
          style={{
            color: 'black',
            fontSize: 22,
            fontFamily: Theme.FONT_FAMILY_BOLD,
            textAlign: 'center',
          }}>
          Sign Up
        </Text>
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/profile_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          numberOfLines={1}
          value={FullName}
          onChangeText={text => {
            setFullName(text);
          }}
          placeholder="Full Name"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="text"
        />
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/email_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          numberOfLines={1}
          value={Email}
          onChangeText={text => {
            setEmail(text);
          }}
          placeholder="Email Address"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="email"
        />
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/mobile_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          numberOfLines={1}
          value={MobileNumber}
          onChangeText={text => {
            setMobileNumber(text);
          }}
          placeholder="Mobile Number"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="numeric"
          maxLength={10}
        />
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/password_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          numberOfLines={1}
          value={Password}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder="Password"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="default"
          secureTextEntry={isPasswordHide}
        />
        <Pressable
          style={{
            position: 'absolute',
            right: 20,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={() => setIsPasswordHide(!isPasswordHide)}>
          <Image
            source={
              isPasswordHide
                ? require('../../assets/icons/eye_hide_icon.png')
                : require('../../assets/icons/eye_show_icon.png')
            }
            style={{ width: 20, height: 20, alignSelf: 'center' }}
          />
        </Pressable>
      </View>

      <Pressable
        style={{ flexDirection: 'row', marginTop: 20 }}
        onPress={() => { }}>
        <CheckBox
          style={{}}
          onClick={() => {
            setChecked(!isChecked);
          }}
          isChecked={isChecked}
        />

        <Text style={{ color: '#909090', marginLeft: 10, marginHorizontal: 10 }}>
          I agree to the medidoc
          <Text style={{ color: Theme.PRIMARY_COLOR }}>
            {' '}
            Terms of Service{' '}
            <Text style={{ color: '#909090' }}>
              and
              <Text style={{ color: Theme.PRIMARY_COLOR }}> Privacy Policy </Text>
            </Text>
          </Text>
        </Text>
      </Pressable>

      <MyButton
        title={'SignUp'}
        loading={Loading}
        onPress={() => SignupAPI()}
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

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={[styles.forgotTxtStyl, { fontSize: 16, color: '#909090' }]}>
          Already have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={[styles.forgotTxtStyl, { fontSize: 16 }]}>
          {' '}
          Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotTxtStyl: {
    color: Theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '700',
  },
  inputViewStyle: {
    backgroundColor: '#F7F8F8',
    height: 66,
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  txtInputStyl: {
    height: 66,
    paddingLeft: 10,
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    fontSize: 14,
    width: '80%',
  },
  forgotTxtStyl: {
    color: Theme.PRIMARY_COLOR,
    textAlign: 'center',
    marginTop: 25,
    fontWeight: '900',
    fontSize: 12,
  },
});

export default Register;
