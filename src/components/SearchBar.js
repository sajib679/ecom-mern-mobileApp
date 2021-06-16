import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
const offWhite = "#FAF9F6";

const Search = ({ value, onChangeText, onFocus, onBlur }, ref) => {
  return (
    <SearchBar
      ref={ref}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
      containerStyle={styles.containerStyle}
      inputContainerStyle={styles.inputContainerStyle}
      placeholder="Type Here..."
    />
  );
};

export const SearchRef = React.forwardRef(Search);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainerStyle: {
    backgroundColor: "#F5F5F5",
  },
});
