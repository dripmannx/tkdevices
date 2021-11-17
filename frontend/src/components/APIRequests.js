import React,{useContext} from "react";
import Router,{useHistory  } from "react-router-dom";
import UserContext from "./User/UserContext"
export default async function getData(data, setData, url,forbidden=false) {
  
  if (url !== undefined) {
    const response = await fetch(url, {
      headers: { Authorization: `Token ${(localStorage.getItem("token"))}` },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log("j");
      return setData(data);
    } else if (response.status === 401) {
      history.push("/")
    } else if (response.status === 403) {
      return(forbidden=true);
    }
  }
}
export function ForwardLogIn() {
  if ((localStorage.getItem("user")) === null) {
    window.location.replace("http://localhost:8000");
  }
}
/*
export function checkLogIn(loginState, setLoginState) {
  

  if ((localStorage.getItem("token")) == null) {
    setLoginState(false);
    
  }else { setLoginState(true); }
  return loginState;
}
*/
export async function  login(userData) {
  const user = await fetch("/api/api-token-auth/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
    console.log(user);
    return  user;
  
  
    
}

export async function getCurrentUser(e, username, setUsername, url) {
  e.preventDefault();
  const response = await fetch(url, {
    headers: { Authorization: `Token ${(localStorage.getItem("token"))}` },
  });
  if (response.ok) {
    const user = await response.json();
    return (user);
  } else if (response.statusText === "Unauthorized") {
   hirstory.push("/"); 
  }
}
export async function useCurrentUser(e,url) {
  const history = useHistory();
  e.preventDefault();
  const response = await fetch(url, {
    headers: { Authorization: `Token ${(localStorage.getItem("token"))}` },
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else if (response.statusText === "Unauthorized") {
    history.push("/")
  }
}
