import React, { useEffect, useState } from "react";
import { useUser } from '../context/UserContext';

export default function UserDetails() {
  const { userData, setUserData } = useUser();

  useEffect(() => {
    fetch("http://localhost:5000/api/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data); 
      });
  }, [setUserData]);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/login";
  };
  
  if (!userData) {
    return <div>Loading...</div>; // You can display a loading indicator
  }

  return (
    <div>
      <h1>Account Page</h1>
      <h2>Name: {userData.fname}</h2>
      <h2>Email: {userData.email}</h2>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
