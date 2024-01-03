import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import { get_inbox } from '../../services/Api';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const InboxScreen = ({ route }) => {
  const userDetails = useSelector(state => state?.auth);
  const navigation = useNavigation();
  const [searchTxt, setSearchTxt] = useState('');
  const [loading, setLoading] = useState(false);
  const [inboxData, setinboxData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getinbox();
    }, []),
  );

  const getinbox = () => {
    setLoading(true);
    get_inbox(userDetails?.user?.id)
      .then(res => {
        if (res?.status == '1') {
          setinboxData(res.recentMessages);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ChatListDataRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Chat', {
            chats_receiver_id: item.id,
            reciever_name: item?.full_name,
            tours_id: item?.chats_tours_id,
          })
        }
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#E7E7E7',
          alignContent: 'center',
          justifyContent: "center",
          paddingVertical: 20

        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require("../../assets/images/booking_success.png")}
            style={styles.circleImgStyl}
            resizeMode="cover"
          />
          <View
            style={{
              marginLeft: 12,
              justifyContent: "center"
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: Theme.FONT_FAMILY_BOLD,
                fontSize: 17,
              }}>
              {item.full_name}
            </Text>
            <Text
              style={{
                marginLeft: 2,
                color: '#373737',
                fontFamily: Theme.FONT_FAMILY_REGULAR,
                fontSize: 14,
                marginTop: 5
              }}>
              {item.chats_message}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: '#B6B6B6',
            fontFamily: Theme.FONT_FAMILY_MEDIUM,
            fontSize: 12,
            position: 'absolute',
            right: 0,
            top: 20,
          }}>
          {moment(item.lastTime).format("DD MMM")}
        </Text>

        {/* <View
          style={{
            backgroundColor: Theme.PRIMARY_COLOR,
            position: 'absolute',
            right: 10,
            top: 30,
            width: 20,
            height: 20,
            borderRadius: 40,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: Theme.FONT_FAMILY_MEDIUM,
              fontSize: 12,
              alignSelf: 'center',
            }}>
            {item.messageCount}
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <Text
        style={{
          margin: 20,
          justifyContent: 'center',
          fontSize: 22,
          fontFamily: Theme.FONT_FAMILY_BOLD,
          color: 'black',
        }}>
        Inbox
      </Text>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          borderRadius: 12,
          elevation: 5,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15
        }}>
        <Image
          source={require('../../assets/icons/search_icon.png')}
          style={{ width: 20, height: 20 }}
        />
        <TextInput
          value={searchTxt}
          onChangeText={text => {
            setSearchTxt(text);
          }}
          placeholder="Search..."
          style={styles.searchStyl}
          placeholderTextColor="#302D2D"
          inputMode="text"
        />
      </View>
      <FlatList
        style={{ padding: 20, flex: 1, paddingTop: 10 }}
        keyExtractor={(item, index) => index?.toString()}
        data={inboxData}
        renderItem={ChatListDataRender}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchStyl: {
    color: 'black',
    fontFamily: Theme.FONT_FAMILY_REGULAR,
    fontSize: 16,
    width: '90%',
  },
  circleImgStyl: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: "gray"
  },
});

export default InboxScreen;
