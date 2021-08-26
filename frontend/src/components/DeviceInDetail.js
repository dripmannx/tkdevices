import React, { useState, useEffect } from "react";


export default function DeviceInDetail() {
  if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
  const windowurl = window.location.href;
  var id = windowurl.split("/").pop();
  const [data,setData] = useState([]);
  const url = "/api/device/";

  const getDevice = () => {
    fetch(url+id, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);

      });
  };
  useEffect(() => {
    getDevice();
  }, []);
  return(<> <h1>{data["id"]}</h1><h2>{data["serialnumber"]}</h2></>);
  
}
