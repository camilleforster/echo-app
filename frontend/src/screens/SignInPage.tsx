import { useState } from "react";
import { Text } from "react-native";
import {
  SigninContanier,
  StyledPressable,
  ButtonBackground,
  ContentRow,
  ButtonText,
  TitleText,
  TextInputContainer,
  SignUpTextInput,
} from "./styles/SignInPage.styled";

function SignUp() {
  const [myEmail, setMyEmail] = useState("");
  const [myUsername, setMyUsername] = useState("");
  //const [repeatPassword, setRepeatPassword] = useState("")

  return (
    <SigninContanier>
      <TitleText>Sign In</TitleText>
      <TextInputContainer>
        <Text>Email</Text>
        <SignUpTextInput
          autoCapitalize="none"
          onChangeText={(text) => {
            setMyEmail(text);
            console.log(myEmail);
          }}
          value={myEmail}
        />
        <Text>Username</Text>
        <SignUpTextInput
          autoCapitalize="none"
          onChangeText={(text) => setMyUsername(text)}
          value={myUsername}
        />
        {/* <Text>Confirm Password</Text>
        <SignUpTextInput autoCapitalize="none" onChangeText={text => setRepeatPassword(text)}
        secureTextEntry= {true} value={repeatPassword}/> */}
      </TextInputContainer>
      <StyledPressable
        onPress={() => {
          console.log("pressed");
        }}
      >
        <ButtonBackground
          resizeMode="cover"
          source={require("../assets/Splash0.png")}
          imageStyle={{ borderRadius: 20 }}
        >
          <ContentRow>
            <ButtonText>Continue</ButtonText>
          </ContentRow>
        </ButtonBackground>
      </StyledPressable>
    </SigninContanier>
  );
}



export default SignUp;
