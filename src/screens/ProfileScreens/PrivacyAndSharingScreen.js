import React, {useEffect, useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';

const PrivacyAndSharingScreen = ({route}) => {
  const navigation = useNavigation();
  const [CityName, setCityName] = useState('');
  const [Price, setPrice] = useState('');

  return (
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />

      <View
        style={{
          flexDirection: 'row',
          height: 60,
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
          marginHorizontal: 15,
        }}>
        <Pressable
          onPress={() => navigation.pop(1)}
          style={{width: 35, height: 35, position: 'absolute', left: 0}}>
          <Image
            style={{width: 35, height: 35}}
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
          Privacy and Sharing
        </Text>
      </View>

      <ScrollView style={styles.subContainer}>
        <Text style={styles.titleTxtStyl}>Privacy and sharing</Text>

        <Text style={styles.descriptionTxtStyl}>
          Manage your data, third-party tools and sharing settings
        </Text>
        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Request your personal data</Text>
          <Text style={styles.subTitleTxtStyl}>
            We'll create a file for you to download your personal data.
          </Text>
          <Image
            source={require('../../assets/icons/right_arrow_icon_2.png')}
            style={styles.editImgStyl}
            resizeMode="contain"
          />
        </View>

        <View style={styles.lineStyl} />

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Delete your account</Text>
          <Text style={styles.subTitleTxtStyl}>
            This will permanently delete your account and your data, in
            accordance with applicable law.
          </Text>
          <Image
            source={require('../../assets/icons/right_arrow_icon_2.png')}
            style={styles.editImgStyl}
            resizeMode="contain"
          />
        </View>

        <View style={styles.lineStyl} />

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Sharing</Text>
          <Text style={styles.subTitleTxtStyl}>
            Decide how your profile and activity are shown to others
          </Text>
          <Image
            source={require('../../assets/icons/right_arrow_icon_2.png')}
            style={styles.editImgStyl}
            resizeMode="contain"
          />
        </View>

        <View style={styles.lineStyl} />

        <View style={styles.bgStyl}>
          <Text style={styles.titleTxtStyl}>Services</Text>
          <Text style={styles.subTitleTxtStyl}>
            Check out and manage services that you've connected to your eTornus
            account
          </Text>
          <Image
            source={require('../../assets/icons/right_arrow_icon_2.png')}
            style={styles.editImgStyl}
            resizeMode="contain"
          />
        </View>

        <View style={styles.lineStyl} />
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
    height: 65,
    marginTop: 10,
    borderRadius: 14,
    justifyContent: 'center',
  },
  titleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_MEDIUM,
    fontFamily: Theme.FONT_FAMILY_BOLD,
  },
  descriptionTxtStyl: {
    color: '#8A8A8A',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_MEDIUM,
    marginTop: 10,
  },
  subTitleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    marginTop: 8,
    marginRight: 20,
  },
  editImgStyl: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    top: '30%',
  },
  lineStyl: {height: 1, backgroundColor: '#E3E3E3', marginTop: 15},
});

export default PrivacyAndSharingScreen;
