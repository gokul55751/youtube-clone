import React, { createContext, useEffect, useState } from "react";

import {fetchDataFromApi} from "../utils/api"
export const Context = createContext();

const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectedCategory);
  }, [selectedCategory]);

  const fetchSelectedCategoryData = (query) => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
      console.log(contents);
      setSearchResult(contents);
      setLoading(false);
    });
  };
  return <Context.Provider value={{
    loading,
    setLoading,
    searchResult,
    setSearchResult,
    selectedCategory,
    setSelectedCategory,
    mobileMenu,
    setMobileMenu,
  }}>
    {props.children}
  </Context.Provider>;
};

export default AppContext;
