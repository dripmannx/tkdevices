import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAxios from "../utils/useAxios";
import AuthContext from "../utils/AuthContext";
const Landing = () => {
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [devices, setDevices] = useState([]);
 
  useEffect(() => {
    getDevices();

  }, []);
  const getDevices = async () => {
    let response = await api.get("/api/device");
    console.log(response.data);
    if (response.status === 200) {
      setDevices(response.data);
    }
  };
  return (
    <div>
      <div>{user?.username}</div>
      <ul>
        {devices.map((device) => (
          <div>
          <Card key={device.id} sx={{ height: 180, width: 250 }}>
            <CardContent>
              <Typography className="text-xs" variant="h8" component="h2">
                {device.serialnumber}
              </Typography>
              <Typography className="text-xs" variant="h8" component="h2">
                {device.status}
              </Typography>
              <Typography className="text-xs" variant="h8" component="h2">
                {device.batterylife}
              </Typography>
              <Typography className="text-xs" variant="h8" component="h2">
                {device.model}
              </Typography>
            </CardContent>
          </Card></div>
        ))}
      </ul>
    </div>
  );
};

export default Landing;
export const HomePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <p>landing</p>
    </Box>
  );
}; 