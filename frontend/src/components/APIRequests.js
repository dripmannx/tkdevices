import React from "react";
export default async function getData(data, setData, url) {
  if (url !== undefined) {
    const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log("j");
      return setData(data);
    } else if (response.statusText === "Unauthorized") {
      window.location.replace("http://localhost:8000");
    }
  }
}
export function ForwardLogIn() {
  if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
}
/*
export function checkLogIn(loginState, setLoginState) {
  if (localStorage.getItem("token") == null) {
    setLoginState(false);
    
  }else { setLoginState(true); }
  return loginState;
}
*/
export function checkLogIn() {
  console.log("ceck");
}

export async function getCurrentUser(e, username, setUsername, url) {
  e.preventDefault();
  const response = await fetch(url, {
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  });
  console.log(response);
  if (response.ok) {
    const username = await response.json();
    console.log("hi");
    return setUsername(username);
  } else if (response.statusText === "Unauthorized") {
    window.location.replace("http://localhost:8000");
  }
}
