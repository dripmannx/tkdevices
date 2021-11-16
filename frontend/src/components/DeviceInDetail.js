import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@material-ui/core/Typography";
import "./../../static/css/DeviceInDetail.css";
import { QRCode } from "react-qr-svg";
import getData, { ForwardLogIn } from "./APIRequests";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import useFetch from "./Hooks/Fetching/useFetch";
import getCurrentUser from "./APIRequests"
function status(state) {
  if (state === true) {
    return "lagernd";
  }
  return "in Nutzung";
}

export default function DeviceInDetail() {
  
  const location = useLocation();
  
 
  const identifier = location.state;
  
  document.title = `iPhone ${location.state}`;
  const url = "/api/device/" + identifier;

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
const [username, setUsername] = useState([]);

  async function getDevice() {
    setError(false);
    const response = await fetch(url, {
      headers: { Authorization: `Token ${(localStorage.getItem("token"))}` },
    });
    console.log(response);
    if (response.ok) {
      const device = await response.json();
      return setData(device);
    } else {
      return setError(true);
    }
  }

  useEffect(() => {
    getDevice();
  }, []);

  const handleOnClick = async () => {
    const clonedData = data;
    clonedData.status = !clonedData.status;
    setData(clonedData);
    await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Token ${(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => {
        getDevice();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div>{JSON.stringify(username,null,2)}</div>
      {error === true && <h1 className="notFound">Kein Gerät Gefunden</h1>}
      {error === false && (
        <div className="wrapper">
          <div className="file__upload">
            <div className="header">
              <p>
                <span>iPhone {data.model}</span>
              </p>
            </div>
            <form className="body">
              <div>
                <p>S/N: {data.serialnumber}</p>

                <p className={data.status ? "text-green-600" : "text-red-600"}>
                  <span className="text-black">Status: </span>
                  {status(data.status)}
                </p>

                <p>Speicher: {data.capacity}GB</p>
                <p>Batterie: {data.batterylife}%</p>
              </div>

              <Button
                variant="{data} contained"
                className="Btn-state"
                onClick={() => handleOnClick()}
              >
                Status Ändern
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
