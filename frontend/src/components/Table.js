//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./../../static/css/table.css";
import { QRCode } from "react-qr-svg";
import openInNewTab from "./openInNewTab";

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

const darkTheme = createTheme({
  header: {
    zIndex: 0,
  },
  palette: {
    type: "dark",
  },
  overrides: {
    MuiTableRow: {
      hover: {
        "&:hover": {
          backgroundColor: "#2E2E2E !important",
        },
      },
    },
  },
});

export default function Table() {
  if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
  const url = "/api/device";
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  async function getDevices(){
    
  const response = await fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
  console.log(response);
  if (response.ok){
    const data = await response.json();
    return setData(data);
  }}
  

  
  

  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getDevices();
  }, []);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12 ||
        rowData.serialnumber !== rowData.serialnumber.toUpperCase()
          ? "S/N im richtigen Format angeben"
          : true,
      filterPlaceholder: "S/N eingeben",
    },
    {
      title: "Modell",
      field: "model",
      lookup: {
        "SE 2016": "iPhone SE 2016",
        "SE 2020": "iPhone SE 2020",
        "6s": "iPhone 6s",
        7: "iPhone 7",
        11: "iPhone 11",
      },
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === ""
          ? "Model auswählen"
          : true,
      filterPlaceholder: "Modell auswählen",
      initialEditValue: "SE 2016",
    },
    {
      title: "Batterie",
      field: "batterylife",
      //defaultSort: "desc",

      validate: (rowData) =>
        rowData.batterylife === undefined ||
        rowData.batterylife === "" ||
        rowData.batterylife < 0 ||
        rowData.batterylife > 100
          ? "Wert zwischen 0 und 100"
          : true,
      filtering: false,
      defaultSort: "desc",
      render: (rowData) => rowData.batterylife + "%",

      /*
      cellStyle: (e, rowData) => {
        if (rowData.batterylife >= 90) {
          return { color: "green" };
        }else if (rowData.batterylife === undefined){
          return { color: "white" };
        
        } else {
          return { color: "red" };
        }
      
     
      }, */
    },
    {
      title: "Speicher",
      field: "capacity",

      lookup: {
        32: "32GB",
        64: "64GB",
        128: "128GB",
        256: "256GB",
      },

      validate: (rowData) =>
        rowData.capacity === undefined || rowData.capacity === ""
          ? "Speicher auswählen"
          : true,
      filterPlaceholder: "Speicher auswählen",
      initialEditValue: 32,
    },
    {
      title: "Status",
      //defaultFilter: true,
      field: "status",
      
      

      lookup: {
        true: "lagernd",
        false: "rausgegeben",
      },
      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
          : true,
      initialEditValue: true,
      defaultFilter:["true"]
    },
    {
      title: "Defekt",
      field: "status_defect",
      type: "boolean",
      filering: false,
    
    },
  ];

  const deviceCountIn = $.grep(data, function (n, i) {
    return n.status === true;
  });

  const deviceCount = deviceCountIn.length + " Geräte lagernd";

  return (
    <ThemeProvider theme={darkTheme}>
      <title>{deviceCount}</title>

      <div className="Table">
        <h1 className="second-title" align="center">
          {deviceCount}
        </h1>
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.BOTTOM_CENTER}
        />
        <MaterialTable
          //icons={tableIcons}
          className="TableRow"
          title={""}
          data={data}
          columns={columns}
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return Promise((resolve, reject) => {
                //Backend call

                const clonedData = [...data];
                clonedData[rowData.tableData.serialnumber][columnDef.field] = newValue;
                setData(clonedData);
                fetch(url + "/" + rowData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(rowData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    ToastsStore.success("Änderung gespeichert");
                    getDevices();
                    resolve();
                  })
                  .catch((err) => console.log(err));
              });
            },
          }}
          editable={{
            onRowAdd: (newData, tableData) =>
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
                    getDevices();
                    openInNewTab(`/devices/${newData.serialnumber}`);
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
                    getDevices();
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
                  getDevices();
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
            headerStyle: {
              zIndex: 0,
            },

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
          detailPanel={(rowData) => {
            const qrcodeurl =
              "http://localhost:8000/devices/" + rowData.serialnumber; 
            return (
              <div>
                <div id="qrcodediv">
                  <QRCode
                    className="qrcode"
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 80 }}
                    //TODO change prod URL Redirect
                    value={qrcodeurl}
                    onClick={() => {
                      window.open(qrcodeurl, "_blank").focus();
                    }}
                  />
                </div>
              </div>
            );
          }}
        />
      </div>
    </ThemeProvider>
  );
}
