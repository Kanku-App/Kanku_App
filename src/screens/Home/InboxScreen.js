import React, { useEffect, useRef, useState } from 'react'
import {
    Image, View, Text, Pressable, TextInput, StyleSheet, ScrollView, FlatList, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import MyStatusBar from '../../elements/MyStatusBar'
import Theme from '../../theme'

const InboxScreen = ({ route }) => {
    const navigation = useNavigation();
    const [searchTxt, setSearchTxt] = useState('');

    const ChatListData = [
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '5'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '3'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '8'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '89'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '29'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '16'
        },
        {
            userImage: require('../../assets/dummyImages/user_dummy_icon.png'),
            userName: 'Cooper Septimus',
            lastMessage: "Lorem ipsum dolor sit amet",
            lastTime: "8.00 am",
            messageCount: '17'
        },
    ]

    const ChatListDataRender = ({ item }) => {

        return (
            <TouchableOpacity onPress={()=>navigation.navigate('Chat')}  style={{ flexDirection: 'column', marginHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#E7E7E7', paddingBottom: 10, alignContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={item.userImage} style={styles.circleImgStyl} resizeMode='cover' />
                    <View style={{ flexDirection: 'column', marginLeft: 12, alignSelf: 'center' }}>
                        <Text style={{ color: 'black', fontFamily: Theme.FONT_FAMILY_BOLD, fontSize: 17, }}>{item.userName}</Text>
                        <Text style={{ marginLeft: 2, color: '#373737', fontFamily: Theme.FONT_FAMILY_REGULAR, fontSize: 14, }}>{item.lastMessage}</Text>
                    </View>
                </View>
                <Text style={{ color: '#B6B6B6', fontFamily: Theme.FONT_FAMILY_MEDIUM, fontSize: 12, position: 'absolute', right: 5, top: 10 }}>{item.lastTime}</Text>

                <View style={{ backgroundColor: Theme.PRIMARY_COLOR, position: 'absolute', right: 10, top: 30, width: 20, height: 20, borderRadius: 40, justifyContent: 'center', }}>
                    <Text style={{ color: 'white', fontFamily: Theme.FONT_FAMILY_MEDIUM, fontSize: 12, alignSelf: 'center' }}>{item.messageCount}</Text>

                </View>

            </TouchableOpacity>
        )
    }


    return (
        <View style={{ height: '100%', backgroundColor: '#fff', }}>
            <MyStatusBar backgroundColor={"#fff"} />
            <Text style={{ marginTop: 15, justifyContent: 'center', fontSize: 22, fontFamily: Theme.FONT_FAMILY_BOLD, color: 'black', marginLeft: 20 }}>Inbox</Text>
            <View style={{ height: 50, flexDirection: 'row', backgroundColor: 'white', marginVertical: 10, marginHorizontal: 15, paddingHorizontal: 10, borderRadius: 15, elevation: 2 }}>
                <Image source={require('../../assets/icons/search_icon.png')}
                    style={{ width: 16, height: 16, alignSelf: 'center' }} />

                <TextInput
                    value={searchTxt}
                    onChangeText={(text) => {
                        setSearchTxt(text)
                    }}
                    placeholder='Search...'
                    style={styles.searchStyl}
                    placeholderTextColor='#302D2D'
                    inputMode='text'
                />

            </View>

            <FlatList
                style={{ marginTop: 10, marginBottom: 0, }}
                data={ChatListData}
                renderItem={ChatListDataRender}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchStyl: {
        paddingLeft: 10,
        color: 'black',
        fontFamily: Theme.FONT_FAMILY_REGULAR,
        fontSize: 14,
        width: '85%'
    },
    circleImgStyl: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
        alignSelf: 'center',
        marginTop: 15

    }


});

export default InboxScreen;