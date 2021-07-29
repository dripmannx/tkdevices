import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect } from "react";
import {save } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
export default function Table() {
  
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const [data, setData] = useState([]);
  const columns = [
    { title: "Seriennummer", field: "serialnumber" },
    { title: "Modell", field: "model" },
    { title: "Batterie", field: "batterylife" },
    { title: "Speicher", field: "capacity" },
    { title: "Status", field: "status" },
  ];
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serialnumber: "PLOIKJUZHGT" }),
    };
    fetch("/api/all")
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
        console.log(resp);
      });
  }, []);
  console.log(setData.serialnumber);
  const deviceCount = data.length;
  return (
     <ThemeProvider theme={darkTheme}> 
     <div className="Table">
      <h1 align="center">Alle Geräte</h1>
      <h4 align="center">{deviceCount} Geräte</h4>
      <MaterialTable
        class="TableRow"
        title="Geräte Daten"
        data={data}
        columns={columns}
        /*
        options={{
          headerStyle: {
            backgroundColor: "#464646",
            color: "#fff",
          },
          cellStyle: {
            backgroundColor: "#464646",
            hoverBackgroundColor: "#4646",
            color: "#fff",
          },
        }}
        */
        //missing logic to save and edit
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, data) => alert("You saved " + data.serialnumber),
          },
          (data) => ({
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, data) =>

              confirm("You want to delete " + data.serialnumber),
            disabled: data.status === "raus",
          }),
        ]}
      />
    </div>
    </ThemeProvider>
  );
  
}
