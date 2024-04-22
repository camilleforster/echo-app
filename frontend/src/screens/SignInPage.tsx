import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { SigninContanier,StyledPressable, ButtonBackground, ContentRow, ButtonText, TitleText, TextInputContainer, SignUpTextInput } from "./styles/SignInPage.styled";

function SignUp() {

    const [myUsername, setMyUsername] = useState("")
    const [myPassword, setMyPassword] = useState("")
    //const [repeatPassword, setRepeatPassword] = useState("")

    return <SigninContanier>
        <TitleText>Sign Up</TitleText>
        <TextInputContainer>
        <Text>Email</Text>
        <SignUpTextInput autoCapitalize="none" onChangeText={text => {
            setMyUsername(text)
            console.log(myUsername)}}  
        value={myUsername}/>
        <Text>Password</Text>
        <TextInput autoCapitalize="none" onChangeText={text => setMyPassword(text)} style = {styles.textinput}
        secureTextEntry= {true} value={myPassword}/>
        <SignUpTextInput autoCapitalize="none" onChangeText={text => setMyPassword(text)}  
        secureTextEntry= {true} value={myPassword}/>
        {/* <Text>Confirm Password</Text>
        <SignUpTextInput autoCapitalize="none" onChangeText={text => setRepeatPassword(text)}
        secureTextEntry= {true} value={repeatPassword}/> */}
        </TextInputContainer>
         <StyledPressable onPress={() => {console.log("pressed")}}>
        <ButtonBackground
          resizeMode="cover"
          source={require("../assets/Splash0.png")}
          imageStyle = {{borderRadius: 20}}
        >
          <ContentRow>
            <ButtonText>Continue</ButtonText>
          </ContentRow>
        </ButtonBackground>
      </StyledPressable>
    </SigninContanier>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textinput : {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
        width: '100%', 
    }
});

export default SignUp;