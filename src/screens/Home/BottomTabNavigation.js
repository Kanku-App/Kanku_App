import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image } from 'react-native';
import HomeScreen from './HomeScreen';
import InboxScreen from './InboxScreen';
import ProfileScreen from './ProfileScreen';
import TourScreen from './TourScreen';
import WishListScreen from './WishListScreen';
import Theme from '../../theme';

const Tab = createBottomTabNavigator();


export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.PRIMARY_COLOR,
        tabBarInactiveTintColor: '#292D32',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: Theme.FONT_FAMILY_MEDIUM
        },
        tabBarStyle: {
          paddingTop: 12,
          paddingBottom: 15,
          height: 65,

        },
        headerShown: false
      }} >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20, tintColor: color }}
              source={require('../../assets/tabIcons/home_icon.png')} />
          ),
        }} />

      <Tab.Screen name="WishList" component={WishListScreen}
        options={{
          tabBarLabel: 'WishList',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20, tintColor: color }} source={require('../../assets/tabIcons/wishlist_icon.png')} />
          ),
        }} />

      <Tab.Screen name="Tour" component={TourScreen}
        options={{
          tabBarLabel: 'Tours',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20, tintColor: color }} source={require('../../assets/tabIcons/tours_icon.png')} />
          ),
        }} />

      <Tab.Screen name="Inbox" component={InboxScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20, tintColor: color }} source={require('../../assets/tabIcons/inbox_icon.png')} />
          ),
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image style={{ width: 20, height: 20, tintColor: color }} source={require('../../assets/tabIcons/profile_icon.png')} />
          ),
        }} />

    </Tab.Navigator>
  );
}