import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Splash = ({route}) => {
  const user = useSelector(state => state?.auth);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      if (!user?.user) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'GetStarted'}],
          }),
        );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTab'}],
          }),
        );
      }
    }, 2500);
    return () => null;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../assets/icons/app_logo_new.png')}
        style={{width: 250, height: 250, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Splash;
