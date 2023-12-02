import Theme from "../theme";

export const customStyles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 30, width: "100%", alignSelf: "center", height: 55, marginTop: 30, backgroundColor: 'white', borderWidth: 1,
    },
    buttonTxtStyle:{
        fontSize: 18, fontFamily: Theme.FONT_FAMILY_SEMIBOLD, color: Theme.BUTTON_PRIMARY_COLOR, lineHeight: 30,
    }
})
