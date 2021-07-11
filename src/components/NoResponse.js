import React, { useEffect } from "react";
import { StyleSheet, Text, View, RefreshControl } from "react-native";
import { getInitialData } from "../store/actions";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const NoResponse = ({ children }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getInitialData());

    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View
      style={styles.box}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text>No Response! Try to Refresh</Text>
      {children}
    </View>
  );
};

export default NoResponse;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
