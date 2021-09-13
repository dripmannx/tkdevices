import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./../../static/css/DeviceInDetail.css";
import { QRCode } from "react-qr-svg";
function status(state) {
  if (state === true) {
    return "lagernd";
  }
  return "rausgegeben";
}

export default function DeviceInDetail() {
  if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
  const windowurl = window.location.href;
  
  const identifier = windowurl.split("/").pop();
  console.log(windowurl, identifier);
  const url = "/api/device/"+identifier
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  async function getDevice() {
    setError(false)
    const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      return setData(data);
    }else{
      return setError(true)
    }
  }
  

  useEffect(() => {
    getDevice();
  }, []);
if (error===false){
  return (
    <Card className="root">
      <CardContent>
        <QRCode
          className="qrcode "
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 100 }}
          //TODO change prod URL Redirect
          value={"http://localhost:8000/devices/" + identifier}
        />
        <div className="content">
          <div className="pos printable item1" variant="h5" component="h2">
            iPhone {data["model"]}
          </div>
          <div className="pos printable item2">S/N: {data["serialnumber"]}</div>
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
        <Button size="small" className="non-printable">
          <a href="/devices">Zurück</a>
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
}else{
  return <h1>Device not Found</h1>
}}
