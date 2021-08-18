import { ToastsContainer, ToastsStore } from "react-toasts";
import App from "./App";
import React, { Component } from "react";

export default function Fetch() {
  //Backend call
  fetch("/api/api-token-auth/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ username: "ECTK", password: "ENERCON_01" }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
    });
}
