//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import "../../../static/css/table.css";
import { darkTheme } from "./props";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

import useAxios from "../../utils/useAxios";
export default function DeleteTable() {
  document.title = `Defekte Geräte`;
  const url = "/api/devices/defect";
  const [data, setData] = useState([]);
  const api = useAxios();
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
      title: "Zustand",
      field: "condition",
      filterPlaceholder: "Status auswählen",
      type: "boolean",
      validate: (rowData) =>
        rowData.condition !== true || rowData.model === null
          ? "Zustand als defekt melden"
          : true,
      tooltip: "Sortieren",
      initialEditValue: true,
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

  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all device data

  useEffect(() => {
    let isApiSubscribed = true;

    if(isApiSubscribed) getDevices();
    return () => {
      isApiSubscribed = false;
    }
  }, []);
  const getDevices = async () => {
    let response = await api.get(url);

    if (response.status === 200) {
      setData(response.data);
    }
  };
  const deviceCountNotRemoved = $.grep(data, function (n, i) {
    return n.removed_from_DEP === false;
  });
  const deviceCountDefect = $.grep(data, function (n, i) {
    return n.condition === true;
  });

  const deviceCount =
    deviceCountDefect.length + " Geräte defekt und nicht aus dem DEP entfernt";

  return (
    <ThemeProvider theme={darkTheme}>
      
      <div className="Table">

        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        <MaterialTable
          className="TableRow"
          title={deviceCountNotRemoved.length + " Geräte nicht entfernt"+"\n"+deviceCountDefect.length+" Geräte defekt"}
          data={data}
          columns={columns}
          
            
          editable={{
            //add Row if user has permission to do so
            onRowAdd: (newData, tableData) =>
              new Promise(async (resolve, reject) => {
                //Backend call

                await api
                  .post("/api/device", newData)
                  .then((response) => {
                    ToastsStore.success("Gerät hinzugefügt");
                    getDevices();
                    resolve();
                  })
                  .catch(function (error) {
                    //Case if Data is redundant or not complete || BAD REQUEST
                    if (error.response.status === 400) {
                      ToastsStore.error("Daten nicht vollständig oder doppelt");
                      //Case if permission is serverbased withddrawn but not frontendbased || FORBIDDEN
                    } else if (error.response.status === 403) {
                      ToastsStore.error("Keine Berechtigung");
                    } else if (response.status === 404) {
                      ToastsStore.error("Keine Verbindung zum Server");
                    }
                    reject();
                  });
              }),
            //update Row if user has permission to do so
            onRowUpdate: (newData, oldData) =>
              new Promise(async (resolve, reject) => {
                await api
                  .put(`/api/device/${oldData.serialnumber}`, newData)
                  .then((response) => {
                    ToastsStore.success("Gerätedaten gespeichert");
                    getDevices();
                    resolve();
                  })
                  .catch(function (error) {
                    //Case if Data is redundant or not complete || BAD REQUEST
                    if (error.response.status === 400) {
                      ToastsStore.error("Daten nicht vollständig oder doppelt");
                      //Case if permission is serverbased withddrawn but not frontendbased || FORBIDDEN
                    } else if (error.response.status === 403) {
                      ToastsStore.error("Keine Berechtigung");
                      //Case if Server is not responding || INTERNAL SERVER ERROR 404
                    } else if (response.status === 404) {
                      ToastsStore.error("Keine Verbindung zum Server");
                    }
                    reject();
                  });
              }),
            //delete Row uf user has permission to do so
            onRowDelete: (oldData) =>
              new Promise(async (resolve, reject) => {
                //Backend call
                await api
                  .delete("/api/device/"+oldData.serialnumber, oldData)
                  .then((response) => {
                    ToastsStore.success("Gerät gelöscht");
                    getDevices();
                    resolve();
                  })
                  .catch(function (error) {
                    //Case if Data is redundant or not complete || BAD REQUEST
                    if (error.response.status === 400) {
                      ToastsStore.error("Daten nicht aktuell");
                      //Case if permission is serverbased withddrawn but not frontendbased || FORBIDDEN
                    } else if (error.response.status === 403) {
                      ToastsStore.error("Keine Berechtigung");
                    } else if (error.response.status === 404) {
                      ToastsStore.error("Keine Verbindung zum Server");
                    }
                    reject();
                  });
              }),
          }}
          options={{
            paging: false,
            maxBodyHeight: 700,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            headerStyle: { zIndex: 0 },
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
          }}
        />
      </div>
    </ThemeProvider>
  );
}
