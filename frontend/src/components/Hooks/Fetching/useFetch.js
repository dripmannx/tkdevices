/* import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: {  },
};

export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      console.log(res);
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
 */
import React from "react";
import { useState, useEffect } from "react";

const useFetch = async (url,  options = {}) => {
  const [state, setState] = useState({ data: null, loading: true });
  
    const response =  await fetch(url, {
     options,
    });
    if (response.ok) {
      console.log("tre")
      setState({ data: resp.json(), loading: false });
    }  return state;
  };



export default useFetch;
