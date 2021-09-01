
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./../../static/css/DeviceInDetail.css";

function status(state) {
  if (state===true) {
    return "lagernd";
  }
  return "rausgegeben";
}

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
          console.log(resp);
          setData(resp);

        });
  };

  useEffect(() => {
    getDevice();
  }, []);


  return (
    <Card className="root">
      <CardContent>
        <Typography className="pos" variant="h5" component="h2">
          iPhone {data["model"]}
        </Typography>
        <Typography className="pos" color="textSecondary">
          S/N: {data["serialnumber"]}
        </Typography>
        <Typography className="pos" color="textSecondary">
          Status: {status(data["status"])}
        </Typography>
        <Typography className="pos" color="textSecondary">
          Batterie: {data["batterylife"]}%
        </Typography>
        <Typography className="pos" color="textSecondary">
          Speicher: {data["capacity"]}GB
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a href="/devices">Zurück</a>
        </Button>
      </CardActions>
    </Card>
  );
}