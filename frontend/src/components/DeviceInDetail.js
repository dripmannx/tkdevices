import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./../../static/css/DeviceInDetail.css";
import { QRCode } from "react-qr-svg";
import getData, { ForwardLogIn } from "./APIRequests";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
function status(state) {
  if (state === true) {
    return "lagernd";
  }
  return "rausgegeben";
}

export default function DeviceInDetail() {

  ForwardLogIn();
   const location = useLocation();

   console.log(location.pathname);

  const identifier = location.pathname.split("/").pop();
  document.title = `iPhone ${identifier}`;
  console.log(windowurl, identifier);
  const url = "/api/device/" + identifier;

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const information = () => {
    return (
      <div className="root">
        <div className="content">
          <ul className="data">
            <li className="pos printable item1">iPhone {data["model"]}</li>
            <li className="pos printable item2">S/N: {data["serialnumber"]}</li>
            <li className="pos non-printable">
              Status: {status(data["status"])}
            </li>
            <li className="pos printable item3">
              Batterie: {data["batterylife"]}%
            </li>
            <li className="pos printable item4">
              Speicher: {data["capacity"]}GB
            </li>
          </ul>
        </div>

        <Button
          onClick={() => updateDevice(data)}
          size="small"
          className="non-printable"
        >
          Status ändern
        </Button>
        <Button
          size="small"
          className="non-printable"
          onClick={() => {
            window.print();
          }}
        >
          Drucken
        </Button>
      </div>
    );
  };
  async function getDevice() {
    setError(false);
    const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return setData(data);
    } else {
      return setError(true);
    }
  }

  useEffect(() => {
    getDevice();
  }, []);

  console.log(data);
  function updateDevice(data) {
    console.log(data, "Hi");
    const clonedData = [data];
    clonedData["status"] = false;
    console.log(clonedData["status"]);
    console.log(clonedData);
    setData(clonedData);

    console.log(data, "data");
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then(() => {
        getDevice();
      })
      .catch((err) => console.log(err));
  }

  if (error === false) {
    return (
      <Card className="root">
        <CardContent>
          <div className="content">
            <div className="pos printable item1" variant="h5" component="h2">
              iPhone {data["model"]}
            </div>
            <div className="pos printable item2">
              S/N: {data["serialnumber"]}
            </div>
            <div className="pos non-printable">
              Status: {status(data["status"])}
            </div>
            <div className="pos printable item3">
              Batterie: {data["batterylife"]}%
            </div>
            <div className="pos printable item4">
              Speicher: {data["capacity"]}GB
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => updateDevice(data)}
            size="small"
            className="non-printable"
          >
            Status ändern
          </Button>
          <Button
            size="small"
            className="non-printable"
            onClick={() => {
              window.print();
            }}
          >
            Drucken
          </Button>
        </CardActions>
      </Card>
    );
  } else {
    return <h1>Device not Found</h1>;
  }
}
