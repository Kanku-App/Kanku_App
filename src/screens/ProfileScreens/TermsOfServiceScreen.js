import React, { useEffect, useRef, useState } from 'react'
import {
    Image, View, Text, Pressable, TextInput, StyleSheet, FlatList, ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import MyStatusBar from '../../elements/MyStatusBar'
import Theme from '../../theme'
import MyButton from '../../elements/MyButton'

const TermsOfServiceScreen = ({ route }) => {
    const navigation = useNavigation();

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
                <Text style={{ color: 'black', fontSize: 22, fontFamily: Theme.FONT_FAMILY_BOLD, textAlign: 'center', }}>Terms Of Service</Text>

            </View>

            <ScrollView style={{ flex: 1, marginTop: 20 }}>

                <Text style={styles.txtStyl}>{`Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
                    Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
                    Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.
                    Lorem ipsum dolor sit amet consectetur. Proin urna lorem odio consectetur pharetra nisi sit et. Ut venenatis in id tortor arcu viverra tempor orci felis. Metus urna venenatis accumsan mi id. Molestie ipsum egestas varius mollis tellus neque nec ultrices vel. Integer cursus fermentum nisl pharetra massa id nibh aliquam. Nulla pellentesque diam tellus erat ac consequat a amet scelerisque. Ornare magna consequat ut egestas ridiculus consequat. Dictumst habitasse nunc arcu elit. Massa adipiscing penatibus ut mauris. Nibh porttitor ornare interdum scelerisque eros duis gravida amet sodales. Pellentesque at vehicula mus suspendisse aliquam.
                    Amet dui diam integer purus vitae. Lobortis mauris enim at vestibulum ultrices tortor. Nulla a sed neque quam sed in diam proin. Congue sit arcu volutpat nisi maecenas cursus fusce quam donec. Velit orci pharetra nisl pharetra ligula imperdiet. Donec sit dignissim bibendum tortor semper. Sem odio neque viverra in purus fames. Lacus in nec porttitor mi. Proin metus risus adipiscing in nibh fames. Imperdiet nulla ornare hac turpis vestibulum mauris id. Maecenas sed fames sed nulla rutrum odio. Tristique augue placerat mattis tincidunt et. Amet in sit magna convallis odio in vestibulum dignissim semper. Risus netus lacus vitae posuere a sed magna egestas.
                    Urna pellentesque neque convallis rhoncus quisque viverra placerat duis eros. In viverra eget in velit lacus viverra. Platea mattis at cum blandit curabitur pretium lacus. Mattis egestas mi eget aliquet. Vestibulum tortor augue nibh posuere. Mattis at lacus neque massa neque purus gravida bibendum. Duis ac eu.`}
                </Text>
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    txtStyl: {
        color: '#9796A1',
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'justify',
        marginHorizontal: 15,
        marginTop: 20
    
      }

})

export default TermsOfServiceScreen;