import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import Splash from '../screens/auth/Splash';
import GetStarted from '../screens/auth/GetStarted';
import Register from '../screens/auth/Register';
import BottomTabNavigation from '../screens/Home/BottomTabNavigation';
import HomeTourDetailScreen from '../screens/Home/HomeTourDetailScreen';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MapScreen from '../screens/Home/MapScreen';
import TourDetailScreen from '../screens/Home/TourDetailScreen';
import ChatScreen from '../screens/Home/ChatScreen';
import PaymentScreen from '../screens/Home/PaymentScreen';
import BookingStatusScreen from '../screens/Home/BookingStatusScreen';
import BookingStatusFailedScreen from '../screens/Home/BookingStatusFailedScreen';
import ListYourTourScreen from '../screens/ProfileScreens/ListYourTourScreen';
import TourCreationScreen from '../screens/ProfileScreens/TourCreationScreen';
import AddSiteScreen from '../screens/ProfileScreens/AddSiteScreen';
import PreviewScreen from '../screens/ProfileScreens/PreviewScreen';
import PersonalInfoScreen from '../screens/ProfileScreens/PersonalInfoScreen';
import TaxScreen from '../screens/ProfileScreens/TaxScreen';
import TranslationScreen from '../screens/ProfileScreens/TranslationScreen';
import TermsOfServiceScreen from '../screens/ProfileScreens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/ProfileScreens/PrivacyPolicyScreen';
import NotificationScreen from '../screens/ProfileScreens/NotificationScreen';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {theme} from '../utils/theme';
import PrivacyAndSharingScreen from '../screens/ProfileScreens/PrivacyAndSharingScreen';
import FeedbackScreen from '../screens/ProfileScreens/FeedbackScreen';
import EditTourScreen from '../screens/ProfileScreens/EditTourScreen';

const Stack = createStackNavigator();
export default function Navigation() {
  const screenOptions = {
    headerShown: false,
    cardStyle: {backgroundColor: '#f7f7f7'},
    ...TransitionPresets.SlideFromRightIOS,
  };
  const verticalAnimation = {
    headerShown: false,
    cardStyle: {backgroundColor: '#f7f7f7'},
    cardOverlayEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  };
  const verticalAnimationTransparent = {
    headerShown: false,
    cardStyle: {backgroundColor: 'transparent'},
    cardOverlayEnabled: true,
    ...TransitionPresets.SlideFromRightIOS,
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Splash'}
          screenOptions={screenOptions}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTabNavigation}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="HomeTourDetails"
            component={HomeTourDetailScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="TourDetails"
            component={TourDetailScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="BookingStatus"
            component={BookingStatusScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="BookingStatusFailed"
            component={BookingStatusFailedScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="ListYourTour"
            component={ListYourTourScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="TourCreation"
            component={TourCreationScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="EditTour"
            component={EditTourScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="AddSite"
            component={AddSiteScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Preview"
            component={PreviewScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Personalinfo"
            component={PersonalInfoScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Tax"
            component={TaxScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Translation"
            component={TranslationScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="TermsOfService"
            component={TermsOfServiceScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Notification"
            component={NotificationScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="PrivacyAndSharing"
            component={PrivacyAndSharingScreen}
            options={verticalAnimationTransparent}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen}
            options={verticalAnimationTransparent}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast
        visibilityTime={1500}
        autoHide={true}
        config={{
          success: props => (
            <View
              style={[
                styles.toastContainer,
                {backgroundColor: theme.colors.Savedtext},
              ]}>
              <Text style={styles.toastText}>{props.text1}</Text>
            </View>
          ),
          error: props => (
            <View
              style={[
                styles.toastContainer,
                {backgroundColor: theme.colors.error},
              ]}>
              <Text style={styles.toastText}>{props.text1}</Text>
            </View>
          ),
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: Dimensions.get('window').width - 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  toastText: {color: 'white', fontFamily: 'Jost-SemiBold', textAlign: 'left'},
});
