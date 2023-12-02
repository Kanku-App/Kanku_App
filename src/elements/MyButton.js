/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import Theme from '../theme/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MyButton = props => {
  return (
    <Pressable
      {...props}
      style={{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        minHeight: 55,
        borderRadius: 3,
        backgroundColor: Theme.BUTTON_PRIMARY_COLOR,
        paddingHorizontal: 20,
        opacity: props.loading ? 0.5 : 1,
        ...props.style,
      }}
      disabled={props.loading}>
      {props.loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={25} color={'#FFF'} />
        </View>
      ) : (
        <Text
          style={{
            color: '#FFF',
            fontSize: Theme.FONT_SIZE_MEDIUM,
            fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
            ...props.textStyle,
          }}>
          {props.title}
        </Text>
      )}
    </Pressable>
  );
};

export default memo(MyButton);
