import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import MyStatusBar from '../../elements/MyStatusBar';
import Theme from '../../theme';
import Header from '../../components/Header';
import MyButton from '../../elements/MyButton';
import { delete_account } from '../../services/Api';
import { ShowToast } from '../../utils/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const DeleteAccount = ({ route }) => {
    const userDetails = useSelector(state => state?.auth);
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const updateHandler = () => {
        if (!password) {
            ShowToast('Please enter password', 'error');
        } else {
            setLoading(true)
            const data = {
                user_id: userDetails?.user?.id,
                password: password
            }
            delete_account(data).then(result => {
                console.log("ress", result)
                if (result?.status == 1) {
                    AsyncStorage.clear()
                    navigation.navigate('Login')
                }
            }).catch((err) => {
                console.log("err", err)
            }).finally(() => {
                setLoading(false)
            })
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <MyStatusBar backgroundColor={'#fff'} />
            <Header navigation={navigation} title="Delete Account" />
            <View style={{ flex: 1, padding: 20 }}>
                <View style={styles.bgStyl}>
                    <Text style={styles.titleTxtStyl}>Password</Text>
                    <TextInput
                        style={styles.subTitleTxtStyl}
                        placeholder="Password"
                        value={password}
                        onChangeText={e => setPassword(e)}
                    />
                </View>
                <MyButton
                    title={'Done'}
                    loading={loading}
                    onPress={updateHandler}
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
                        marginVertical: 40,
                    }}
                />
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
    bgStyl: {
        backgroundColor: '#F8F8F8',
        marginTop: 15,
        borderRadius: 14,
        justifyContent: 'center',
        paddingHorizontal: 15,
        padding: 10,
    },
    titleTxtStyl: {
        color: 'black',
        fontSize: Theme.FONT_SIZE_MEDIUM,
        fontFamily: Theme.FONT_FAMILY_BOLD,
        lineHeight: 24,
    },
    subTitleTxtStyl: {
        color: 'black',
        fontSize: Theme.FONT_SIZE_EXTRA_SMALL,
        fontFamily: Theme.FONT_FAMILY_REGULAR,
        height: 40,
        fontSize: 12,
    },
    editImgStyl: {
        width: 24,
        height: 24,
        position: 'absolute',
        right: 12,
        top: '30%',
    },
});

export default DeleteAccount;
