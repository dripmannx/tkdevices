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
 

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const fetchData = () => {
    const res = fetch(url, {
      headers: {headers},
      method: method,
      body: body,
    });

    console.log(res);
    if (res.ok) {
      setResponse(res.json());
    } else if (res.status === 403) {
      setIsAuthorized(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading, isAuthorized };
};

export default useFetch;
*/
import React from "react"
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }setLoading(false);
    };
    fetchData();
  }, [url,options]);

  return { response, error,loading };
};
export default useFetch;