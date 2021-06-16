import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "react-native-elements";
import Card from "../../components/Card";
import { signout } from "../../store/actions/auth.action";
const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.flexRow}>
      <View style={styles.avatar}>
        <Avatar.Image
          size={60}
          source={{
            uri: "https://uploads.disquscdn.com/images/dc368ebd907dfb3c40406ed0c842b10023f20651969cbd4bf77e524b3bf29ce7.jpg",
          }}
        />
        <Text
          style={{
            textTransform: "capitalize",
          }}
        >
          {user.fullName}
        </Text>
      </View>
      <View>
        <Button
          mode="contained"
          color="#FAF9F6"
          onPress={() => dispatch(signout())}
        >
          <Text>LogOut</Text>
        </Button>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  avatar: {
    alignItems: "center",
  },
});
