import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import SearchPresenter from "./SearchPresenter";

export default ({ token }) => {
  const navigation = useNavigation();
  const [searching, setSearching] = useState();
  const [name, setName] = useState();
  const [results, setResults] = useState();

  const triggerSearch = async () => {
    setSearching(true);
    const form = {
      ...(name && { name }),
    };

    try {
      const { data } = await api.search(form, token);
      setResults(data);
    } catch (e) {
      console.warn(e);
    } finally {
      Keyboard.dismiss();
      setSearching(false);
    }
  };

  return (
    <SearchPresenter
      navigation={navigation}
      name={name}
      setName={setName}
      searching={searching}
      triggerSearch={triggerSearch}
      results={results}
    />
  );
};
