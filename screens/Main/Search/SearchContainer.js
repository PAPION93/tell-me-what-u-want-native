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
  const [page, setPage] = useState(1);

  const triggerSearch = async () => {
    setSearching(true);
    const form = {
      ...(name && { name }),
    };

    try {
      const { data } = await api.search(page, form, token);
      setResults(data);
    } catch (e) {
      console.warn(e);
    } finally {
      Keyboard.dismiss();
      setSearching(false);
    }
  };

  const increasePage = () => {
    setPage(page + 1);
    triggerSearch();
  };

  return (
    <SearchPresenter
      navigation={navigation}
      name={name}
      setName={setName}
      searching={searching}
      triggerSearch={triggerSearch}
      increasePage={increasePage}
      results={results}
    />
  );
};
