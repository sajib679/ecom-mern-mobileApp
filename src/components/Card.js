import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";

const Card = ({ headerLeft, headerRight, onPress, children, ...rest }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card} {...rest}>
        {(headerLeft || headerRight) && (
          <View style={styles.cardHeader}>
            {headerLeft && (
              <View
                style={{
                  alignSelf: "center",
                  fontSize: "20px",
                  fontWeight: "500",
                }}
              >
                {headerLeft}
              </View>
            )}
            {headerRight && headerRight}
          </View>
        )}

        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: "98%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1,
    padding: 10,
    borderBottomColor: "#cecece",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    marginHorizontal: 4,
  },

  cardHeader: {
    padding: 2,
    borderBottomWidth: 0.1,
    borderBottomColor: "#cecece",
  },
});
