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
  Switch,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import RBSheet from 'react-native-raw-bottom-sheet';

const NotificationScreen = ({route}) => {
  const navigation = useNavigation();
  const [isTextOfferSelected, setIsTextOfferSelected] = useState(true);
  const refRBSheet = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <MyStatusBar backgroundColor={'#fff'} />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={500}
        closeDuration={500}>
        <ScrollView
          nestedScrollEnabled
          style={{
            marginHorizontal: 15,
            height: '100%',
            marginBottom: 20,
            marginTop: 20,
          }}>
          <Text
            style={[
              styles.titleTxtStyl,
              {
                fontSize: Theme.FONT_SIZE_MEDIUM,
                lineHeight: Theme.FONT_SIZE_MEDIUM,
              },
            ]}>
            Inspiration and Offers
          </Text>
          <Text style={styles.subTitleTxtStyl}>On:Email, Push, and SMS</Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.titleTxtStyl,
                {color: '#2F4858', fontSize: Theme.FONT_SIZE_SEMI_MEDIUM},
              ]}>
              Email
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#59BFAC'}}
              thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.titleTxtStyl,
                {color: '#2F4858', fontSize: Theme.FONT_SIZE_SEMI_MEDIUM},
              ]}>
              Push Notifications
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#59BFAC'}}
              thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.titleTxtStyl,
                {color: '#2F4858', fontSize: Theme.FONT_SIZE_SEMI_MEDIUM},
              ]}>
              SMS
            </Text>

            <Switch
              trackColor={{false: '#767577', true: '#59BFAC'}}
              thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </ScrollView>
      </RBSheet>

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
          Notification
        </Text>
      </View>

      <View style={styles.subContainer}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            onPress={() => setIsTextOfferSelected(true)}
            style={[
              styles.tabFirstTxtStyl,
              {borderBottomWidth: isTextOfferSelected ? 4 : 0},
            ]}>
            Offers and updates
          </Text>
          <Text
            onPress={() => setIsTextOfferSelected(false)}
            style={[
              styles.tabFirstTxtStyl,
              {borderBottomWidth: !isTextOfferSelected ? 4 : 0},
            ]}>
            Account
          </Text>
        </View>

        {isTextOfferSelected ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20, marginBottom: 15}}>
            <Text style={styles.titleTxtStyl}>Travel tips and offers</Text>

            <Text style={styles.descriptionTxtStyl}>
              Inspire your next trip with personalised recommendations and
              special offers.
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                onPress={() => refRBSheet.current.open()}
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Inspiration and Offers
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Trip Plannig
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <Text style={[styles.titleTxtStyl, {marginTop: 20}]}>
              eTornus updates
            </Text>

            <Text style={styles.subTitleTxtStyl}>
              Inspire your next trip with personalised recommendations and
              special offers.
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                News and programms
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Feedback
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Travel Regulations
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <Text style={[styles.titleTxtStyl, {marginTop: 20}]}>
              Unsubscribe from all offers and updates
            </Text>

            <Text style={styles.subTitleTxtStyl}>
              Unsubscribe from all offers and updates
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                All Offers and updates
              </Text>
              <Text style={styles.subTitleTxtStyl}>Custom</Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 20, marginBottom: 15}}>
            <Text style={styles.titleTxtStyl}>
              Account activities and policies
            </Text>

            <Text style={styles.descriptionTxtStyl}>
              Confirm your booking and account activity, and learn about
              important Airbnb policies{' '}
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Account Activity
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Guest Policies
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <Text style={[styles.titleTxtStyl, {marginTop: 20}]}>
              Reminders
            </Text>

            <Text style={styles.subTitleTxtStyl}>
              important reminders about your reservations, listings, and account
              activity.
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Reminders
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On:Email, Push, and SMS
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />

            <Text style={[styles.titleTxtStyl, {marginTop: 20}]}>
              Guest and host message
            </Text>

            <Text style={styles.subTitleTxtStyl}>
              Keep in touch with your Host or guests before and during your trip
            </Text>

            <View style={{marginTop: 25}}>
              <Text
                style={[
                  styles.titleTxtStyl,
                  {
                    fontSize: Theme.FONT_SIZE_MEDIUM,
                    lineHeight: Theme.FONT_SIZE_MEDIUM,
                  },
                ]}>
                Message
              </Text>
              <Text style={styles.subTitleTxtStyl}>
                On: Email, Push and Message
              </Text>
              <Image
                source={require('../../assets/icons/edit_tour_dark_icon.png')}
                style={styles.editImgStyl}
                resizeMode="cover"
              />
            </View>

            <View style={styles.lineStyl} />
          </ScrollView>
        )}
      </View>
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
  tabFirstTxtStyl: {
    color: 'black',
    fontSize: Theme.FONT_SIZE_BOLD,
    fontFamily: Theme.FONT_FAMILY_BOLD,
    marginLeft: 10,
    borderBottomWidth: 4,
    borderColor: Theme.PRIMARY_COLOR,
    paddingBottom: 5,
  },
  titleTxtStyl: {
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_BOLD,
    fontSize: Theme.FONT_SIZE_LARGE,
  },
  descriptionTxtStyl: {
    color: '#8A8A8A',
    fontFamily: Theme.FONT_FAMILY_MEDIUM,
    fontSize: Theme.FONT_SIZE_MEDIUM,
    marginTop: 10,
  },
  subTitleTxtStyl: {
    color: '#8E8E8E',
    fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
    fontFamily: Theme.FONT_FAMILY_SEMIBOLD,
    marginTop: 8,
  },

  editImgStyl: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    top: '30%',
  },
  lineStyl: {height: 1, backgroundColor: '#E3E3E3', marginTop: 25},
});

export default NotificationScreen;
