
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
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
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
const api = useAxios();
  let identifier = null;
  location.state === undefined
    ? (identifier = location.pathname.split("/").pop())
    : (identifier = location.state);

  document.title = `iPhone ${location.state}`;
  const url = "/api/device/" + identifier;

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  

 
const getDevice = async () => {
   await api
     .get(url)
     .then((response) => {
       
       setData(response.data)
     })
     .catch(function (error) {
         //Case if permission is serverbased withddrawn but not frontendbased || FORBIDDEN
       if (error.response.status === 403) {
         ToastsStore.error("Keine Berechtigung");
       } else if (response.status === 404) {
         ToastsStore.error("Keine Verbindung zum Server");
       }setError(true)
     });
};
  useEffect(() => {
    getDevice();
  }, []);

  const handleOnStatus = async () => {
    const clonedData = data;
    clonedData.status = !clonedData.status;
    setData(clonedData);
      await api
        .put(url, clonedData)
        .then((response) => {
          getDevice();
          ToastsStore.success(`Status als ${status(data.status)} gesetzt`);

        })
        .catch(function (error) {
          //Case if Data is redundant or not complete || BAD REQUEST 400
          if (error.response.status === 400) {
            ToastsStore.error("Daten nicht vollständig oder doppelt");
            //Case if permission is serverbased withdrawn but not frontendbased || FORBIDDEN 403
          } else if (error.response.status === 403) {
            ToastsStore.error("Keine Berechtigung");
            //Case if Server not responding
          } else if (response.status === 404) {
            ToastsStore.error("Keine Verbindung zum Server");
          }
        });
  };
  const handleOnDefect = async () => {
    const clonedData = data;
    clonedData.status_defect = !clonedData.status_defect;
    setData(clonedData);
      await api
        .put(url, clonedData)
        .then((response) => {
           ToastsStore.success(`Status als ${statusDefect(data.status_defect)} gesetzt`);
          getDevice();
        })
        .catch(function (error) {
          //Case if Data is redundant or not complete || BAD REQUEST 400
          if (error.response.status === 400) {
            ToastsStore.error("Daten nicht vollständig oder doppelt");
            //Case if permission is serverbased withdrawn but not frontendbased || FORBIDDEN 403
          } else if (error.response.status === 403) {
            ToastsStore.error("Keine Berechtigung");
            //Case if Server not responding
          } else if (response.status === 404) {
            ToastsStore.error("Keine Verbindung zum Server");
          }
        });
  };
  

  return (
    <>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
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
                  onClick={() => handleOnStatus()}
                >
                  Status Ändern
                </Button>
                <Button
                  variant="contained"
                  className="Btn-defect"
                  onClick={() => handleOnDefect()}
                >
                  Defekt Status ändern
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
