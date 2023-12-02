import React, {useEffect, useRef} from 'react';
import {Image, ImageBackground, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import Theme from '../../theme';
import MyText from '../../elements/MyText';
import MyStatusBar from '../../elements/MyStatusBar';
import MyButton from '../../elements/MyButton';

const GetStarted = ({route}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#59BFAC'} barStyle={'light-content'} />

      <ImageBackground
        source={require('../../assets/images/bg_image.png')}
        resizeMode="cover"
        style={styles.image}>
        <Image
          source={require('../../assets/icons/app_logo_new.png')}
          style={{
            width: 250,
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: -60,
          }}
        />
      </ImageBackground>

      <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 20}}>
        <View style={{justifyContent: 'center', flexDirection: 'column'}}>
          <MyText style={styles.getStartedTxtStyl}>Let's Get Started</MyText>

          <MyText style={styles.loginToEnjoyTxtStyl}>
            Login to enjoy the features we've provided, and Social Media
          </MyText>

          <MyButton
            title={'Sign In'}
            loading={false}
            onPress={() => navigation.navigate('Login')}
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
              marginTop: 100,
            }}
          />

          <MyButton
            title={'Sign Up'}
            loading={false}
            onPress={() => navigation.navigate('Register')}
            textStyle={{
              fontSize: 18,
              fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
              color: Theme.BUTTON_PRIMARY_COLOR,
              lineHeight: 30,
            }}
            style={{
              borderRadius: 30,
              width: '100%',
              alignSelf: 'center',
              height: 55,
              marginTop: 30,
              backgroundColor: 'white',
              borderWidth: 1,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    height: 350,
    alignItems: 'center',
  },
  getStartedTxtStyl: {
    textAlign: 'center',
    width: '100%',
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_BOLD,
    fontSize: 24,
  },
  loginToEnjoyTxtStyl: {
    textAlign: 'center',
    color: '#909090',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: 16,
    marginTop: 4,
  },
});

export default GetStarted;
