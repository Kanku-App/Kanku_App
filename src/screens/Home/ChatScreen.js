import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import { useNavigation } from '@react-navigation/core';
import { add_chat, get_chat } from '../../services/Api';
import { ShowToast } from '../../utils/Helper';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHight = Dimensions.get('window').height;
const ChatScreen = ({ route }) => {
  const userDetails = useSelector(state => state?.auth);
  const { chats_receiver_id, reciever_name, tours_id } = route?.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getChat();
    }, []),
  );

  const chatAdd = () => {
    if (message.trim().length <= 0) {
      ShowToast('Please type message', 'error');
      return false;
    }
    setLoading(true);
    const data = {
      chats_sender_id: userDetails?.user?.id,
      chats_receiver_id: chats_receiver_id,
      chats_message: message,
      chats_tours_id: tours_id,
    };
    add_chat(data)
      .then(res => {
        if (res?.status == '1') {
          setMessage('');
          setTimeout(() => {
            getChat();
          }, 100);
        } else {
          console.log('else', res);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getChat = () => {
    setLoading(true);
    get_chat(`${userDetails?.user?.id}/${chats_receiver_id}/${tours_id}`)
      .then(res => {
        if (res?.status == '1') {
          setChatData(res.chats);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <MyStatusBar backgroundColor={'#fff'} />
      <View style={styles.headerContainerStyl}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.backImgStyl}
            source={require('../../assets/icons/left_arrow.png')}
          />
        </Pressable>
        <Image
          style={styles.userImgStyl}
          source={require('../../assets/dummyImages/user_dummy_icon_4.png')}
        />
        <Text style={styles.userNameTxtStyl}>{reciever_name}</Text>
      </View>
      <FlatList
        data={chatData}
        contentContainerStyle={{ flex: 1, backgroundColor: "#fff", justifyContent: "flex-end", paddingHorizontal: 15 }}
        renderItem={({ item, index }) => {
          return (
            <View>
              {item.chats_sender_id == userDetails?.user?.id ? (
                <View style={styles.senderView}>
                  <Text style={[styles.text, { color: '#000' }]}>
                    {item.chats_message}
                  </Text>
                </View>
              ) : (
                <View style={styles.recieverView}>
                  <Text style={styles.text}>{item.chats_message}</Text>
                </View>
              )}
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          padding: 10,
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#F6F6F6", width: "100%", borderRadius: 30, padding: 5, paddingHorizontal: 12 }}>
          <TextInput
            style={{
              fontSize: 16,
              width: '85%',
              color: 'black',
              fontFamily: Theme.FONT_FAMILY_REGULAR,
            }}
            value={message}
            onChangeText={value => setMessage(value)}
            placeholder="Typing..."
            placeholderTextColor={'#A8A8A8'}
          />
          {loading ?
            <Pressable
              onPress={() => chatAdd()}
              style={{ position: 'absolute', right: 5 }}>
              <Image
                style={styles.sendImgStyl}
                source={require('../../assets/icons/send_icon.png')}
              />
            </Pressable>
            :
            <Pressable
              style={{ position: 'absolute', right: 5 }}>
              <Image
                style={styles.sendImgStyl}
                source={require('../../assets/icons/send_icon.png')}
              />
            </Pressable>
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyl: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 20
  },
  backImgStyl: {
    width: 20,
    height: 20,
  },
  userImgStyl: {
    width: 50,
    height: 50,
  },
  userNameTxtStyl: {
    color: Theme.PRIMARY_COLOR,
    fontSize: Theme.FONT_SIZE_MEDIUM,
    fontFamily: Theme.FONT_FAMILY_BOLD,
  },
  callImgStyl: {
    width: 20,
    height: 20,
    position: 'absolute',
    right: 20,
    top: '80%',
  },
  sendImgStyl: {
    width: 50,
    height: 50,
  },
  recieverView: {
    paddingVertical: (windowHight * 2) / 100,
    marginLeft: (windowWidth * 5) / 100,
    borderRadius: (windowWidth * 2) / 100,
    backgroundColor: Theme.PRIMARY_COLOR,
    marginBottom: (windowHight * 2) / 100,
    paddingHorizontal: (windowWidth * 4) / 100,
  },
  senderView: {
    paddingVertical: (windowHight * 2) / 100,
    borderRadius: (windowWidth * 2) / 100,
    backgroundColor: Theme.BACKGROUND_COLOR_LIGHT,
    marginBottom: (windowHight * 1.2) / 100,
    paddingHorizontal: (windowWidth * 4) / 100,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontFamily: Theme.FONT_FAMILY_BOLD,
  },
});
export default ChatScreen;
