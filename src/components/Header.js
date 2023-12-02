import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    View,
    Text,
    Pressable,
} from 'react-native';
import Theme from '../theme';

const Header = ({ navigation, title }) => {

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                padding: 15,
            }}>
            <Pressable
                onPress={() => navigation.goBack()}
                style={{ width: 35, height: 35, position: 'absolute', left: 15, top: 10 }}>
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('../assets/icons/back_icon.png')}
                />
            </Pressable>
            <Text
                style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: Theme.FONT_FAMILY_BOLD,
                    textAlign: 'center',
                    lineHeight: 24
                }}>
                {title}
            </Text>
        </View>
    );
};

export default Header;

