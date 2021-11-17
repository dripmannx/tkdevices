/* import React, { useState, useEffect } from "react";
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
import getCurrentUser from "./APIRequests";
function status(state) {
  if (state === true) {
    return "lagernd";
  }
  return "in Nutzung";
}
function statusDefect(state_defect) {
  if (state_defect === true) {
    return "Defekt";
  }
  return "einwadfrei";
}
export default function DeviceInDetail() {
  const location = useLocation();

  let identifier = null;
  location.state === undefined
    ? (identifier = location.pathname.split("/").pop())
    : (identifier = location.state);

  document.title = `iPhone ${location.state}`;
  const url = "/api/device/" + identifier;

  const [data, setData] = useState([]);
  const { response, loading, error } = useFetch({
    method: "get",
    url: url,
    headers: JSON.stringify({
      Authorization: `Token ${localStorage.getItem("token")}`,
    }),
    body: JSON.stringify({}),
  });
  //const [error, setError] = useState(false);
  const [username, setUsername] = useState([]);

  async function getDevice() {
    setError(false);
    const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(response);
    if (response.ok) {
      const device = await response.json();
      console.log(device, device.status_defect);
      return setData(device);
    } else {
      return setError(true);
    }
  }

   useEffect(() => {
    getDevice();
    
    
  }, []); 

  const handleOnState = async () => {
    const clonedData = data;
    clonedData.status = !clonedData.status;
    setData(clonedData);
    await fetch(url, {
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
  };
  const handleOnDefect = async () => {
    const clonedData = data;
    clonedData.status = !clonedData.status_defect;
    setData(clonedData);
    await fetch(url, {
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
  };

  return (
    <>
      <div>{JSON.stringify(username, null, 2)}</div>
      {error === true && <h1 className="notFound">Kein Gerät Gefunden</h1>}
      {error === false && (
        <div className="wrapper">
          <div className="file__upload">
            <div className="header">
              <p>
                <span>iPhone {response.model}</span>
              </p>
            </div>
            <form className="body">
              <div>
                <p>S/N: {response.serialnumber}</p>

                <p className={response.status ? "text-green-600" : "text-red-600"}>
                  <span className="text-black">Status: </span>
                  {status(response.status)}
                </p>

                <p>Speicher: {response.capacity}GB</p>
                <p>Batterie: {response.batterylife}%</p>
                <p
                  className={
                    !data.status_defect ? "text-green-600" : "text-red-600"
                  }
                >
                  <span className="text-black">Status: </span>
                  {statusDefect(response.status_defect)}{" "}
                </p>
              </div>

              <Button
                variant="contained"
                className="Btn-state"
                onClick={() => handleOnState()}
              >
                Status Ändern
              </Button>
              <Button
                variant="contained"
                className="Btn-defect"
                onClick={() => handleOnDefect()}
              >
                Defect melden
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
 */
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
import getCurrentUser from "./APIRequests";
function status(state) {
  if (state === true) {
    return "lagernd";
  }
  return "in Nutzung";
}
function statusDefect(state_defect) {
  if (state_defect === true) {
    console.log(state_defect);
    return "Defekt";
  }
  return "einwadfrei";
}
export default function DeviceInDetail() {
  const location = useLocation();

  let identifier = null;
  location.state === undefined
    ? (identifier = location.pathname.split("/").pop())
    : (identifier = location.state);

  document.title = `iPhone ${location.state}`;
  const url = "/api/device/" + identifier;

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState([]);

  async function getDevice() {
    setError(false);
    const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(response);
    if (response.ok) {
      const device = await response.json();
      console.log(device, device.status_defect);
      return setData(device);
    } else {
      return setError(true);
    }
  }

  useEffect(() => {
    getDevice();
  }, []);

  const handleOnState = async () => {
    const clonedData = data;
    clonedData.status = !clonedData.status;
    setData(clonedData);
    await fetch(url, {
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
  };
  const handleOnDefect = async () => {
    const clonedData = data;
    clonedData.status_defect = !clonedData.status_defect;
    setData(clonedData);
    await fetch(url, {
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
  };

  return (
    <>
     
      {error === true && <h1 className="notFound">Kein Gerät Gefunden</h1>}
      {error === false && (
        <div className="wrapper">
          <div className="device-content">
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
                <p
                  className={
                    !data.status_defect ? "text-green-600" : "text-red-600"
                  }
                >
                  <span className="text-black">Zustand: </span>
                  {statusDefect(data.status_defect)}{" "}
                </p>
              </div>
              <div className="button-wrapper">
                <Button
                  variant="contained"
                  className="Btn-state"
                  onClick={() => handleOnState()}
                >
                  Status Ändern
                </Button>
                <Button
                  variant="contained"
                  className="Btn-defect"
                  onClick={() => handleOnDefect()}
                >
                  Defect melden
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
