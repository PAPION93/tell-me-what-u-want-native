import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/usersSlice";
import ProfilePresenter from "./ProfilePresenter";

export default ({ name }) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };
  return <ProfilePresenter name={name} logout={logout} />;
};
