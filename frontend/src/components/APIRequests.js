import React from 'react'
export default async function getData(data,setData,url) {
   const response = await fetch(url, {
     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
   });
   console.log(response);
   if (response.ok) {
     const data = await response.json();
     console.log("j")
     return setData(data);
   } else if (response.statusText === "Unauthorized") {
     window.location.replace("http://localhost:8000");
   }
 }
export  function ForwardLogIn(){
    if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
}
export function checkLogIn(loginState, setLoginState) {
  if (localStorage.getItem("token") == null) {
    setLoginState(false);
  }else { setLoginState(true); }
}


export async function getCurrentUser(username,setUsername,url){
   const response = await fetch(url, {
     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
   });
   console.log(response);
   if (response.ok) {
     const username = await response.json();
     console.log("hi")
     return setUsername(username);
     
   } else if (response.statusText === "Unauthorized") {
     window.location.replace("http://localhost:8000");
   }
}


