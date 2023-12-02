import React, { useEffect, useRef, useState } from 'react'
import {
    Image, View, Text, Pressable, TextInput, StyleSheet, ScrollView, FlatList, Switch
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import MyStatusBar from '../../elements/MyStatusBar'
import Theme from '../../theme'
import MyButton from '../../elements/MyButton'


const TranslationScreen = ({ route }) => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.mainContainer}>
            <MyStatusBar backgroundColor={"#fff"} />

            <View style={{ flexDirection: 'row', height: 60, justifyContent: 'center', width: '100%', marginTop: 20, marginHorizontal: 15 }}>
                <Pressable
                    onPress={() => navigation.pop(1)}
                    style={{ width: 35, height: 35, position: 'absolute', left: 0 }} >
                    <Image
                        style={{ width: 35, height: 35, }}
                        source={require('../../assets/icons/back_icon.png')} />

                </Pressable>

                <Text style={{ color: 'black', fontSize: 22, fontFamily: Theme.FONT_FAMILY_BOLD, textAlign: 'center', }}>Translation</Text>

            </View>

            <View style={styles.subContainer}>

                <Text style={styles.titleTxtStyl}>Translation</Text>
                <Text style={styles.descriptionTxtStyl}>{"Automatically translate the reviews, descriptions and messages written by guests and Hosts to English. Turn this feature off if you'd like to show the original language."}</Text>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>

                    <Text style={[styles.titleTxtStyl, { color: '#2F4858', fontSize: Theme.FONT_SIZE_SMALL }]}>Translation</Text>

                    <Switch
                        trackColor={{ false: '#767577', true: '#59BFAC' }}
                        thumbColor={isEnabled ? '#ffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    subContainer: {
        flex: 1,
        marginHorizontal: 15
    },
    titleTxtStyl: {
        color: 'black',
        fontFamily: Theme.FONT_FAMILY_BOLD,
        fontSize: Theme.FONT_SIZE_LARGE
    },
    descriptionTxtStyl: {
        color: '#8A8A8A',
        fontFamily: Theme.FONT_FAMILY_MEDIUM,
        fontSize: Theme.FONT_SIZE_MEDIUM,
        marginTop: 10
    }

})

export default TranslationScreen;