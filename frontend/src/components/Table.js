//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import arrow_green_in from "./../../static/img/arrow_green_in.png";
import arrow_red_out from "./../../static/img/arrow_red_out.png";
import "./../../static/css/table.css";
import { QRCode } from "react-qr-svg";

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

  const getDevices = () => {
    fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.table(resp);
        setData(resp);
       
      });
  };
  /*
  const getCurrentUser = () => {
    fetch("/api/current_user", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.table(resp);
      });
  };

  */

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
      title: "Batterie in %",
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
      defaultSort:"desc",
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
      title: "Speicher in GB",
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
      /*
      cellStyle: (e, rowData) => {
        if (rowData.status === "lagernd") {
          return { color: "green" };
        } else {
          return { color: "red" };
        }
      },
      */

      lookup: {
        true: "lagernd",
        false: "rausgegeben"
      },

      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
          : true,
      initialEditValue: true,
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
  const qrdiv = (id,model,serialnumber,batterylife) => {
    <div id="qrcodediv">
      <QRCode
        className="qrcode"
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="Q"
        style={{ width: 80 }}
        //TODO change prod URL Redirect
        value={"http://localhost:8000/devices/" + id}
      />
      <p className="model">Model: {model}</p>
      <p className="serialnumber">S/N: {serialnumber}</p>
      <p className="batterie">Batterie: {batterylife}%</p>
    </div>;
    window.print();
  };
const printDiv = (divName) =>  {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

}
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
              return new Promise((resolve, reject) => {
                //Backend call

                const clonedData = [...data];
                clonedData[rowData.tableData.id][columnDef.field] = newValue;
                setData(clonedData);
                fetch(url + "/" + rowData.id, {
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
                    resolve();
                  });
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.id, {
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
                fetch(url + "/" + oldData.id, {
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
                    value={"http://localhost:8000/devices/" + rowData.id}
                  />
                  
                </div>
                <button
                  id="print-div"
                  className="print-button"
                  onClick={() => {
                    window.open(`/devices/${rowData.id}`, "_blank").focus();

                   
                    
                  }}
                ></button>
              </div>
            );
          }}
        />
      </div>
    </ThemeProvider>
  );
}
