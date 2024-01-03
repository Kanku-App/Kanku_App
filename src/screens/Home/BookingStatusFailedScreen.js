import React from "react";
import {View, Text, Image, Pressable, ScrollView,StyleSheet} from 'react-native'
import MyStatusBar from "../../elements/MyStatusBar";
import Theme from "../../theme";
import MyButton from "../../elements/MyButton";
import { useNavigation } from '@react-navigation/core'



const BookingStatusFailedScreen = ()=> {
   const navigation = useNavigation()
    return(
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <MyStatusBar backgroundColor={"#fff"} />

        <View style={{ flexDirection: 'row', height: 60, justifyContent: 'center', width: '100%', margin: 15 }}>

            <Pressable
                onPress={() => navigation.pop(1)}
                style={{ width: 35, height: 35, position: 'absolute', left: 0 }} >
                <Image
                    style={{ width: 35, height: 35, }}
                    source={require('../../assets/icons/back_icon.png')} />
            </Pressable>

            <Text style={{ color: 'black', fontSize: 22, fontFamily: Theme.FONT_FAMILY_BOLD, textAlign: 'center', }}>Booking</Text>

        </View>

         <View style={{flexDirection:'column', marginHorizontal:15}}>

               <Image style={styles.BookImgStyl} source={require('../../assets/images/booking_failed.png')}/>
             
               <Text style={{color:'#1E1E1E', fontSize:22, fontFamily:Theme.FONT_FAMILY_BOLD, textAlign:'center', marginTop:20}}>Congratulations!</Text>

               <Text style={styles.descriptionTxtStyl}>Lorem ipsum dolor sit amet consectetur. Nam turpis nunc mauris dignissim lorem lacus nunc. Aliquam urna.!</Text>

               <MyButton
                    title={"Try Again"}
                    loading={false}
                    onPress={() => navigation.goBack()}
                    textStyle={{ fontSize: 18, fontFamily: Theme.FONT_FAMILY_SEMIBOLD, lineHeight: 30, }}
                    style={{ borderRadius: 30, width: "100%", alignSelf: "center", height: 55, marginTop: 80, }}
                />

               <MyButton
                    title={"Cancel"}
                    loading={false}
                    onPress={() =>navigation.goBack()}
                    textStyle={{ fontSize: 18, fontFamily: Theme.FONT_FAMILY_SEMIBOLD, lineHeight: 30,}}
                    style={{ borderRadius: 30, width: "100%", alignSelf: "center", height: 55, marginTop: 30, opacity:0.5}}
                    
                />


         </View>



        </ScrollView>
    )
}

const styles = StyleSheet.create({
      BookImgStyl:{
        width:200,
        height:200,
        alignSelf:'center', 
        marginTop:20
      },
      descriptionTxtStyl:{
        color:'#9E9FA5',
        fontSize:Theme.FONT_SIZE_SMALL,
        fontFamily:Theme.FONT_FAMILY_REGULAR,
        marginTop:10
      }
})


export default BookingStatusFailedScreen;