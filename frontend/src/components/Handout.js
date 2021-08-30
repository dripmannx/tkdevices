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

import LinkIcon from "@material-ui/icons/Link";


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
var openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};
export default function HandoutTable() {
  if (localStorage.getItem("token") == null) {
    window.location.replace("http://localhost:8000");
  }
  

  const url = `/api/handouts`;
  const [username, setUsername] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const getCurrentUser = () => {
    fetch("/api/current_user", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setUsername(resp)
      });
  };
 useEffect(() => {
   getCurrentUser();
 }, []); 
  const columns = [
    {
      title: "Link",
      field: "link",
      tooltip: "Nach Link suchen",
      filterPlaceholder: "nach Link suchen",
      validate: (rowData) =>
        rowData.link === undefined || rowData.link === ""
          ? "Link eingeben"
          : true,
      sorting: false,
    },
    {
      title: "Status",
      field: "is_shipped",
      tooltip: "Nach Status filtern",
      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.is_shipped === undefined ? "Status als defekt melden" : true,
      tooltip: "Sortieren",
      lookup: { true: "versendet", false: "nicht versendet" },
      initialEditValue: false,
    },
    {
      title: "Ersteller",
      field: "owner",
      tooltip: "Nach Erstellern filtern",

      initialEditValue: username["user"],
      editable: "never",
    },
  ];
  const getHandouts = () => {
    fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };

  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getHandouts();
  }, []);
  const handouts_not_shipped = $.grep(data, function (n, i) {
    return n.is_shipped === false;
  });
  const handouts = $.grep(data, function (n, i) {
    return n.is_shipped === true || n.is_shipped === false;
  });

  const deviceCount = handouts.length + " Aufträge vorhanden";

  return (
    <ThemeProvider theme={darkTheme}>
      <title>{handouts_not_shipped.length} offene Aufträge</title>
      <div className="Table">
        <h1 className="first-title" align="center">
          {deviceCount}
        </h1>

        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.BOTTOM_CENTER}
        />

        <MaterialTable
          className="TableRow"
          title={handouts_not_shipped.length + " Geräte nicht entfernt"}
          data={data}
          columns={columns}
          detailPanel={[
            {
              tooltip: "Show Name",
              render: (rowData) => {
                return (
                  <div
                    style={{
                      fontSize: 20,
                      textAlign: "left",
                      color: "white",
                      
                     
                    }}
                  >
                    Ersteller: {rowData.owner}
                  </div>
                );
              },
            },
          ]}
          
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
                    getHandouts();
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
                    getHandouts();
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
                    getHandouts();
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
                  getHandouts();
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
            headerStyle:{zIndex:1},

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
          actions={[
            {
              icon: LinkIcon,
              tooltip: "Link öffnen",
              onClick: (event, rowData) => {
                openInNewTab(rowData.link);
              },
            },
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
