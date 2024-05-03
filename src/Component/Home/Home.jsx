import React, { useEffect, useState } from "react";
import MenuTitleCard from "../MenuTitleCard/MenuTitleCard";
import { useDispatch } from "react-redux";
import { login as authLogin, logout } from "../../Store/authSlice";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const dispatch = useDispatch();
  function removeExpiredToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded_token = jwtDecode(token);
      const expirationTime = decoded_token.exp * 1000;
      if (Date.now() > expirationTime) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    }
  }

  useEffect(() => {
    removeExpiredToken();
  }, []);

  return (
    <div>
      <MenuTitleCard />
    </div>
  );
};

export default Home;
