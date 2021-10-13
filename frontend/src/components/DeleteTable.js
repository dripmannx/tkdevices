//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import "./../../static/css/table.css";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

import getData, { ForwardLogIn } from "./APIRequests";
const darkTheme = createTheme({
  header: {
    zIndex: 0,
  },
  palette: {
    type: "dark",
  },
  overrides: {
    MuiTableRow: {
      
        zIndex: 0,
      
      hover: {
        "&:hover": {
          backgroundColor: "#fff !important",
        },
      },
    },
  },
});

export default function DeleteTable() {
  document.title = `Defekte Geräte`; 
  ForwardLogIn();
  const url = "/api/devices/defect";
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      filterPlaceholder: "S/N eingeben",
      validate: (rowData) => 
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12 ||
        rowData.serialnumber !== rowData.serialnumber.toUpperCase()
          ? "S/N im richtigen Format angeben"
          : true,
      tooltip: "Seriennummer sortieren",
    },
    {
      title: "Status defekt",
      field: "status_defect",
      filterPlaceholder: "Status auswählen",
      type: "boolean",
      validate: (rowData) =>
        rowData.status_defect === undefined || rowData.model ===""
          ? "Status als defekt melden"
          : true,
      tooltip: "Sortieren",
    },
    {
      title: "DEP entfernt",
      field: "removed_from_DEP",
      filterPlaceholder: "Entfernt aus DEP",
      type: "boolean",
      defaultSort: "asc",
      tooltip: "Nach DEP Status sortieren",
    },
  ];
 
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
 async function getDevices() {
   const response = await fetch(url, {
     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
   });
   console.log(response);
   if (response.ok) {
     const data = await response.json();
     return setData(data);
   }
 }
  useEffect(() => {
    //getData(data,setData, url);
    getDevices();
  }, []);
  
  const deviceCountNotRemoved = $.grep(data, function (n, i) {
    return n.removed_from_DEP === false;
  });
  const deviceCountDefect = $.grep(data, function (n, i) {
    return n.status_defect === true;
  });

  const deviceCount =
    deviceCountDefect.length + " Geräte defekt und nicht aus dem DEP entfernt";

  return (  
    <ThemeProvider theme={darkTheme}>
      <title>{deviceCountDefect.length} Defekte Geräte</title>
      <div className="Table">
       
        <h1 className="first-title" align="center">
          {deviceCount}
        </h1>

        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        <MaterialTable
          className="TableRow"
          title={deviceCountNotRemoved.length + " Geräte nicht entfernt"}
          data={data}
          columns={columns}
      
          cellEditable={{
            isCellEditable: (rowData) => rowData.model === "",
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise((resolve, reject) => {
                //Backend call
                
                const clonedData = [...data];
                clonedData[rowData.tableData.id][columnDef.field] = newValue;
                setData(clonedData);
                fetch(url + "/" + rowData.serialnumber, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },

                  body: JSON.stringify(rowData),
                })
                  .then((resp) => resp.json())

                  .then((resp) => {
                    getData(data, setData, url);
                    resolve();
                    ToastsStore.success("Änderung gespeichert");
                  });


              });
            
            },
          }}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ToastsStore.success("Neues Gerät gespeichert");
                    getData(data, setData, url);
                    resolve();
                  });
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ToastsStore.success("Gerätedaten gespeichert");
                    getData(data, setData, url);
                    resolve();
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.serialnumber, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }).then((resp) => {
                  ToastsStore.success("Gerät Gelöscht");
                  getData(data, setData, url);
                  resolve();
                });
              }),
          }}
         
          options={{
            paging: false,
            maxBodyHeight: 700,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            headerStyle:{zIndex: 0},
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
