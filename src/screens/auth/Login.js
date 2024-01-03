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
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import { ShowToast } from '../../utils/Helper';
import store from '../../redux/Store';
import { LOGIN } from '../../redux/Actions';
import { login } from '../../services/Api';
import { getCurrentLocation, locationPermission } from '../../utils/helperFunction';
import { useFocusEffect } from '@react-navigation/native';
const Login = ({ route }) => {
  const navigation = useNavigation();
  const [EmailMobile, setEmailMobile] = useState('');
  const [Password, setPassword] = useState('');
  const [isPwdVisible, setPwdVisible] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [llat, setllat] = useState({ lat: "", lon: "" });

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude } = await getCurrentLocation();
      setllat({ lat: latitude, lon: longitude });
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      getLiveLocation()
    }, []),
  );

  const LoginAPI = () => {
    if (EmailMobile == '' || null) {
      ShowToast('Please enter mobile number or email', 'error');
    } else if (Password == '' || null) {
      ShowToast('Please enter password', 'error');
    } else {
      setLoading(true);
      const data = {
        username: EmailMobile,
        password: Password,
        country_code: '+91',
        device_id: 'nksfjnkfjnfkgjnbnklfgjnKBkjfbkjbJBKbkjbgkj',
        device_type: 'android',
        latitude: llat?.lat,
        longitude: llat?.lon,
      };
      login(data)
        .then(data => {
          if (data?.token) {
            store.dispatch({
              type: LOGIN,
              payload: data,
            });
            ShowToast('LoggedIn Successfully', 'success');
            setTimeout(() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'BottomTab' }],
                }),
              );
            }, 500);
          } else {
            ShowToast(data?.message, 'error');
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => {
          setLoading(false);
        });
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
          Login
        </Text>
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/email_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          onChangeText={text => {
            setEmailMobile(text);
          }}
          placeholder="Email Address/Mobile Number"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="text"
        />
      </View>

      <View style={styles.inputViewStyle}>
        <Image
          source={require('../../assets/icons/password_icon.png')}
          style={{ width: 20, height: 20, alignSelf: 'center' }}
        />

        <TextInput
          value={Password}
          onChangeText={text => {
            setPassword(text);
          }}
          placeholder="Password"
          style={styles.txtInputStyl}
          placeholderTextColor="#ADA4A5"
          inputMode="default"
          secureTextEntry={isPwdVisible}
        />

        <Pressable
          onPress={() => {
            setPwdVisible(!isPwdVisible);
          }}
          style={{
            position: 'absolute',
            right: 20,
            justifyContent: 'center',
            top: 0,
            bottom: 0,
          }}>
          <Image
            source={
              isPwdVisible
                ? require('../../assets/icons/eye_hide_icon.png')
                : require('../../assets/icons/eye_show_icon.png')
            }
            style={{
              width: 20,
              height: 20,
              alignSelf: 'center',
              alignSelf: 'center',
            }}
          />
        </Pressable>
      </View>

      <Pressable onPress={() => { }}>
        <Text style={styles.forgotTxtStyl}>Forgot Your Password?</Text>
      </Pressable>

      <MyButton
        title={'Login'}
        loading={Loading}
        onPress={LoginAPI}
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
          Don't have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={[styles.forgotTxtStyl, { fontSize: 16 }]}>
          {' '}
          Sign Up
        </Text>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          alignSelf: 'center',
          textAlign: 'center',
          marginVertical: 45,
        }}>
        OR
      </Text>

      <TouchableOpacity
        style={{ justifyContent: 'center', flexDirection: 'row' }}
        onPress={() => { }}>
        <Image
          source={require('../../assets/icons/google_icon.png')}
          style={{ width: 25, height: 25 }}
        />
        <Text
          style={{
            fontSize: 18,
            color: '#696969',
            fontWeight: '700',
            marginLeft: 12,
          }}>
          Sign In with Google
        </Text>
      </TouchableOpacity>
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
  txtInputStyl: {
    height: 66,
    paddingLeft: 10,
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    fontSize: 14,
    width: '80%',
  },
});

export default Login;
