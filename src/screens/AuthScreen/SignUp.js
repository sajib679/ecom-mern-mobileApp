import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../store/actions/auth.action";
import NeoMorph from "../../components/NeoMorph";
const offWhite = "#FAF9F6";
const gray = "#A9A9A9";
const platinum = "#E5E4E2";
const SignUp = ({ navigation }) => {
  const initialState = "";
  const [firstName, setFirstName] = useState(initialState);
  const [lastName, setLastName] = useState(initialState);
  const [email, setEmail] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const userSignup = () => {
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <NeoMorph elevation={1} size={106}>
          <Text style={[styles.text, styles.mp, styles.alignC]}>Sign Up</Text>
        </NeoMorph>
        <View style={{ marginVertical: 20, flex: 1, elevation: 20 }}>
          <TextInput
            underlineColor="transparent"
            style={[
              styles.inputStyle,
              { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
            ]}
            placeholder="First Name"
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            underlineColor="transparent"
            style={styles.inputStyle}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            underlineColor="transparent"
            style={[styles.inputStyle, { elevation: 2 }]}
            placeholder="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            underlineColor="transparent"
            style={[
              styles.inputStyle,
              {
                elevation: 2,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            secureTextEntry
            placeholder="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <View>
          <Button
            color={offWhite}
            icon="account-arrow-right"
            mode="contained"
            style={(styles.mp, { marginVertical: 10 })}
            onPress={userSignup}
          >
            <Text style={{ alignSelf: "center" }}>SignUp</Text>
          </Button>
          <Button
            color="gray"
            icon="account-arrow-right"
            mode="outlined"
            style={styles.mp}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text>Already Have an Account? SignIn</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  mp: {
    marginVertical: 1,
  },
  alignC: {
    // alignItems: "center",
    // justifyContent: "center",
  },

  inputStyle: { backgroundColor: "#fafafa", marginBottom: 0.4, elevation: 2 },
});
