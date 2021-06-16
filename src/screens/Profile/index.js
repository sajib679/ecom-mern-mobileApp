import React from "react";
import { StyleSheet, View } from "react-native";
import Hr from "../../components/Hr";
import ProfileTab from "./ProfileTab";
import UserDetails from "./UserDetails";
const Profile = () => {
  return (
    <View style={styles.container}>
      <UserDetails />
      <Hr />
      <ProfileTab />
      <Hr />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
