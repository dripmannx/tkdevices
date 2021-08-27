/*
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
  return(<div>
  <div className="row">
    <div className="col s12 m7">
      <div className="card">
        <div className="card-image">
            <span className="card-title">Card Title</span>
        </div>
        <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  </div>
    <h1>{data["id"]}</h1><h2>{data["serialnumber"]}</h2></div>);
  
}
*/
import React, {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    //paddingTop:20,
    minWidth: 200,
    maxWidth:250,

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  posgreen: {
    marginBottom: 12,
  },
  posred: {
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
});
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
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <Card className={classes.root}>
        <CardContent>

          <Typography variant="h5" component="h2">
            iPhone {data["model"]}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            S/N: {data["serialnumber"]}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Status: {status(data["status"])}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Batterie: {data["batterylife"]}%
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Speicher: {data["capacity"]}GB
          </Typography>


        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
  );
}