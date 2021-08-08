import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { getInitialData } from "../store/actions";

const NoResponse = ({ children }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInitialData());
  }, []);

  return (
    <ScrollView
      style={styles.box}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text>No Response! Try to Refresh</Text>
      {children}
    </ScrollView>
  );
};

export default NoResponse;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    textAlign: "center",
  },
});
