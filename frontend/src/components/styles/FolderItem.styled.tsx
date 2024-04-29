import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    textFlexBox: {
        alignItems: "center",
        alignSelf: "stretch"
    },
    selectButtonIcon: {
        width: 19,
        height: 19,
        display: "none"
    },
    icon: {
        marginLeft: -10,
        width: 23,
        height: 22,
        resizeMode: 'contain'
        
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: "WorkSans_500Medium",
        textAlign: "left",
        display: "flex",
        color: "#2d2f34",
        marginLeft: 10,
        flex: 1
    },
    text1: {
        fontSize: 15,
        fontFamily: "WorkSans_400Regular",
        textAlign: "center",
        color: "#2d2f34"
    },
    icons: {
        width: 5,
        height: 9,
        marginLeft: 10
    },
    itemNumber: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    icons1: {
        width: 15,
        height: 15,
        marginLeft: 10,
        display: "none"
    },
    right: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        flex: 1
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    roundedfullEditingno: {
        borderRadius: 10,
        backgroundColor: "#f0f5f9",
        width: "100%",
        overflow: "hidden",
        flex: 1,
        alignSelf: "stretch"
    }
});
