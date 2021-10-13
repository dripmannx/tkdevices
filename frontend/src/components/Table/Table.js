//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import MaterialTable from "material-table";
import Props from "./props";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "../../../static/css/table.css";
import { QRCode } from "react-qr-svg";
import openInNewTab from "../openInNewTab";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import getData, {ForwardLogIn} from "../APIRequests"
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
export default function Table( ) {
 document.title =" Lagernde Geräte";
  const url = "/api/device";
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provides all devices
  useEffect(() => {
    
    getData(data,setData,url);
  }, []);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12 ||
        rowData.serialnumber !== rowData.serialnumber.toUpperCase() ||
        rowData.serialnumber.indexOf(" ") >= 0
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
      cellStyle: (data, rowData) => ({
        color: data > 90 ? "green" : "red",
      }),
     
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
      cellStyle: (data, rowData) => ({
        color: data === "lagernd" ? "green" : "red",
      }),
      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
          : true,
      initialEditValue: true,
      defaultFilter: ["true"],
    },
    {
      title: "Defekt",
      field: "status_defect",
      type: "boolean",
      filering: false,
      cellStyle: {
        justifyContent: "center",
      },
    },
  ];

  const deviceCountIn = $.grep(data, function (n, i) {
    return n.status === true;
  });

  const deviceCount = deviceCountIn.length + " Geräte lagernd";

  return (
    <ThemeProvider theme={darkTheme}>
      <Props />
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
          /*
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return Promise((resolve, reject) => {
                //Backend call

                const clonedData = [...data];
                clonedData[rowData.tableData.id][columnDef.field] = newValue;
                setData(clonedData);
                console.log(clonedData);
                fetch(url + "/" + rowData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(rowData),
                })
                  .then((resp) => resp.json())
                  .then(() => {
                    ToastsStore.success("Änderung gespeichert");
                    getDevices();
                    resolve();
                  })
                  .catch((err) => console.log(err));
              });
            },
          }}
          */
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
                    getData(data, setData, url);
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
            exportButton: true,
            headerStyle: {
              zIndex: 0,
            },

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
          actions={[
            {
              icon: SmartphoneIcon,
              tooltip: "Gerät öffnen",
              onClick: (event, rowData) => {
                openInNewTab(
                  "http://localhost:8000/devices/" + rowData.serialnumber
                );
              },
            },
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "Keine Einträge",
              addTooltip: "Hinzufügen",
              deleteTooltip: "Löschen",
              editTooltip: "Bearbeiten",
              filterRow: {
                filterTooltip: "Filter",
              },
              editRow: {
                deleteText: "Diese Zeile wirklich löschen?",
                cancelTooltip: "Abbrechen",
                saveTooltip: "Speichern",
              },
            },
            grouping: {
              placeholder: "Spalten ziehen ...",
              groupedBy: "Gruppiert nach:",
            },
            header: {
              actions: "Aktionen",
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} von {count}",
              labelRowsSelect: "Zeilen",
              labelRowsPerPage: "Zeilen pro Seite:",
              firstAriaLabel: "Erste Seite",
              firstTooltip: "Erste Seite",
              previousAriaLabel: "Vorherige Seite",
              previousTooltip: "Vorherige Seite",
              nextAriaLabel: "Nächste Seite",
              nextTooltip: "Nächste Seite",
              lastAriaLabel: "Letzte Seite",
              lastTooltip: "Letzte Seite",
            },
            toolbar: {
              addRemoveColumns: "Spalten hinzufügen oder löschen",
              nRowsSelected: "{0} Zeile(n) ausgewählt",
              showColumnsTitle: "Zeige Spalten",
              showColumnsAriaLabel: "Zeige Spalten",
              exportTitle: "Export",
              exportAriaLabel: "Export",
              exportName: "Export als CSV",
              searchTooltip: "Suche...",
              searchPlaceholder: "Suche...",
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
