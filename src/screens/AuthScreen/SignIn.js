import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { login } from "../../store/actions/auth.action";
import { useDispatch } from "react-redux";
import NeoMorph from "../../components/NeoMorph";
import { FiLogIn } from "react-icons/fi";

const offWhite = "#FAF9F6";
const gray = "#A9A9A9";
const platinum = "#E5E4E2";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = () => {
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  return (
    <View style={styles.container}>
      <NeoMorph elevation={1} size={100}>
        <Text style={[styles.text, styles.mp, styles.alignC]}>Sign In</Text>
      </NeoMorph>

      <View style={{ marginVertical: 20 }}>
        <TextInput
          style={
            (styles.mp,
            {
              elevation: 2,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#FAFAFA",
            })
          }
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          underlineColor="transparent"
          color="#E2FCFD"
          style={
            (styles.mp,
            { elevation: 2, borderRadius: 20, backgroundColor: "#FAFAFA" })
          }
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <Button
        color={offWhite}
        icon="account-arrow-right"
        mode="contained"
        style={styles.mp}
        onPress={userLogin}
      >
        SignIn
      </Button>

      <Button
        raised
        color="gray"
        icon="account-arrow-right"
        mode="text"
        style={styles.mp}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text>No Account? SignUp</Text>
      </Button>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  mp: {
    marginVertical: 5,
  },

  alignC: {
    alignSelf: "center",
  },
});
