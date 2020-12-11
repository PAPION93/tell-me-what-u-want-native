import React, { useEffect } from "react";
import SavedPresenter from "./SavedPresenter";

export default ({ getFavs, restaurants }) => {
  useEffect(() => {
    getFavs();
  }, []);
  return <SavedPresenter restaurants={restaurants} />;
};
