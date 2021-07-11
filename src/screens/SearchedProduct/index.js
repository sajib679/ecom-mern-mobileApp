import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByName,
  resetSearch,
  searchFocused,
} from "../../store/actions";

import { SearchRef } from "../../components/SearchBar";
import SearchedProductStore from "./SearchedProductContainer";

const Search = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermLength, setSearchTermLength] = useState(0);
  const [focused, setFocused] = useState(false);
  const dispatch = useDispatch();

  function usePrevious(value) {
    const ref = useRef(null);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const inputRef = useRef(null);

  const prevCount = usePrevious(searchTerm?.length);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  useEffect(() => {
    focused && dispatch(searchFocused(focused, searchTermLength));
  }, [focused]);

  const searchByName = (value) => {
    if (searchTermLength > prevCount && searchTermLength >= 2) {
      dispatch(getProductsByName(value));
    }
    if (prevCount > searchTermLength && searchTermLength >= 2) {
      dispatch(getProductsByName(value));
    }

    if (prevCount > searchTermLength && searchTermLength < 2) {
      dispatch(resetSearch());
    }
  };

  const handleChange = (e) => {
    const input = e;
    setSearchTerm(input);
    setSearchTermLength(input.length);
  };

  useEffect(() => {
    setSearchTerm(searchTerm);
    setSearchTermLength(searchTermLength);
    dispatch(searchFocused(focused, searchTermLength));
    searchByName(searchTerm);
  }, [searchTerm]);

  return (
    <View>
      <SearchRef
        ref={inputRef}
        value={searchTerm}
        onChangeText={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></SearchRef>
      {searchTermLength > 1 && <SearchedProductStore navigation={navigation} />}
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({});
