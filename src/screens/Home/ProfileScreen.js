import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import MyButton from '../../elements/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const ProfileScreen = ({route}) => {
  const userDetail = useSelector(state => state?.auth);

  const navigation = useNavigation();
  const [Loading, setLoading] = useState(false);

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingBottom: 10,
      }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Text
        style={{
          marginTop: 30,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
        }}>
        Profile
      </Text>

      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Image
          source={require('../../assets/dummyImages/user_dummy_icon.png')}
          style={styles.circleImgStyl}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontFamily: Theme.FONT_FAMILY_BOLD,
              lineHeight: 24,
            }}>
            {userDetail?.user?.full_name}
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: Theme.FONT_FAMILY_REGULAR,
            }}>
            Show Profile
          </Text>
        </View>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
      </View>

      <Text
        style={{
          marginTop: 30,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          lineHeight: 24,
        }}>
        Settings
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Personalinfo', {item: userDetail?.user})
        }
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/personal_information.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Personal Information
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ListYourTour')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/become_guide.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Become Add Guide
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/payment_layout.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Payments and payouts
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Tax')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/taxes.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Taxes
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Translation')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/translation.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Translation
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Notification')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/notifications.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Notifications
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('PrivacyAndSharing')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/privacy_sharing.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Privacy and Sharing
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 30,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          lineHeight: 24,
        }}>
        Tours
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('ListYourTour')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/list_your_tour.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          List Your Tour
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/list_your_tour.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Learn About Become Guide
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 30,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          lineHeight: 24,
        }}>
        Support
      </Text>

      <Pressable
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/help_center.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Visit the Help Center
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </Pressable>

      <Pressable
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/report.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Report a neighbourhood concern
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Feedback')}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/feedback.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Give us feedback
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </Pressable>

      <Text
        style={{
          marginTop: 30,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
          lineHeight: 24,
        }}>
        Legal
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TermsOfService');
        }}
        style={{flexDirection: 'row', alignContent: 'center', marginTop: 15}}>
        <Image
          source={require('../../assets/profileIcons/privacy_policy.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Terms of Service
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PrivacyPolicy');
        }}
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          marginTop: 15,
          marginBottom: 15,
        }}>
        <Image
          source={require('../../assets/profileIcons/privacy_policy.png')}
          style={styles.circleImgNewStyl}
          resizeMode="cover"
        />
        <Text
          style={{
            fontSize: 13,
            color: '#181D27',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            alignSelf: 'center',
            marginLeft: 10,
            textAlign: 'center',
          }}>
          Privacy Policy
        </Text>
        <Image
          source={require('../../assets/icons/right_arrow_icon.png')}
          style={{
            width: 12,
            height: 12,
            position: 'absolute',
            right: 10,
            alignSelf: 'center',
            tintColor: '#ABABAB',
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <MyButton
        title={'Logout'}
        loading={Loading}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            AsyncStorage.clear();
            setLoading(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
          }, 1500);
        }}
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
          marginTop: 25,
          marginBottom: 20,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  circleImgStyl: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 15,
  },
  circleImgNewStyl: {
    width: 40,
    height: 40,
    alignSelf: 'center',

    alignSelf: 'center',
  },
});

export default ProfileScreen;
