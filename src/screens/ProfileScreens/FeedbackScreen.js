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

const FeedbackScreen = ({route}) => {
  const navigation = useNavigation();
  const [SiteName, setSiteName] = useState('');
  const [SiteLocation, setSiteLocation] = useState('');
  const [SiteDescription, setSiteDescription] = useState('');

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
          Share your feedback
        </Text>
      </View>

      <ScrollView style={styles.subContainer}>
        <Text style={styles.descriptionTxtStyl}>
          Thanks for sending us your ideas, issues, or appreciation. We can't
          respond individually, but we'll pass it on to the teams who are
          working to help make Airbnb better for everyone If you do have a
          specific question or need help resolving a problem, you can visit our
          Help Centre or contact us to connect with our support team
        </Text>

        <Text style={styles.titleTxtStyl}>What's your feedback about?</Text>
        <TextInput
          style={styles.inputStyl}
          value={SiteName}
          onChangeText={value => setSiteName(value)}
          numberOfLines={1}
          inputMode="text"
          placeholder="Please Select.."
          placeholderTextColor={'#979797'}
        />

        <Text style={styles.titleTxtStyl}>What topic or feature?</Text>
        <TextInput
          style={styles.inputStyl}
          value={SiteLocation}
          onChangeText={value => setSiteLocation(value)}
          numberOfLines={1}
          inputMode="numeric"
          placeholder="Experience quality & Communicator"
          placeholderTextColor={'#979797'}
        />

        <Text style={styles.titleTxtStyl}>Add Details</Text>
        <TextInput
          style={[
            styles.inputStyl,
            {
              minHeight: 130,
              textAlignVertical: 'top',
              paddingTop: 20,
              height: 200,
            },
          ]}
          value={SiteDescription}
          onChangeText={value => setSiteDescription(value)}
          inputMode="text"
          placeholder=""
          placeholderTextColor={'#979797'}
          multiline={true}
        />

        <MyButton
          title={'Submit'}
          loading={false}
          onPress={() => {}}
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
            marginBottom: 30,
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
    height: 70,
    backgroundColor: '#F8F8F8',
    marginTop: 15,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  titleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_MEDIUM,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    marginTop: 30,
  },
  subTitleTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_REGULAR,
  },
  descriptionTxtStyl: {
    color: '#8A8A8A',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_MEDIUM,
    marginTop: 10,
  },
  editImgStyl: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    top: '30%',
  },
  inputStyl: {
    height: 66,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    fontSize: Theme.FONT_SIZE_SMALL,
    backgroundColor: '#F8F8F8',
    marginTop: 15,
    color: 'black',
    paddingHorizontal: 20,
    borderRadius: 40,
  },
});

export default FeedbackScreen;
