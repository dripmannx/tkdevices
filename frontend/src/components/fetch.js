import {ToastsContainer, ToastsStore} from 'react-toasts';
import App from './App';
import React, {Component} from 'react';
 

export default function Fetch() {
  
                //Backend call
                fetch("/api/device", {
                  method: "GET",
                  headers: {
                    "Content-type": "application/json",
                    /*
                    "X-Auth-Token": "8c183ffd95228fe49e4dcaaa1d42aced2261cb0f",
                    */
                  },
                  
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    console.log(resp);
                    resolve();
                  });
}
