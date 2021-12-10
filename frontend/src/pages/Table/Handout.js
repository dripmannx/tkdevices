//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef, useContext } from "react";
import "../../../static/css/table.css";
import AuthContext from "../../utils/AuthContext";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import LinkIcon from "@material-ui/icons/Link";
import { darkTheme, localization } from "./props";
import useAxios from "../../utils/useAxios";

export default function HandoutTable() {
  document.title = `Aufträge`;
  const api = useAxios();
  const url = `/api/handouts`;
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user } = useContext(AuthContext);
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provides all devices
function isURL(_string) {
 
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matchPattern.test(_string);
}
  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = async () => {
    let response = await api.get("/api/handouts");

    if (response.status === 200) {
      setData(response.data);
    } else if (response.status === 401) {
      localization.body.emptyDataSourceMessage = "Keine Berechtigung zu lesen";
    }
  };

  const columns = [
    {
      title: "Link",
      field: "link",
      tooltip: "Nach Link suchen",
      filterPlaceholder: "nach Link suchen",
      validate: (rowData) =>!isURL(rowData.link)||
        rowData.link === undefined ||
        rowData.link === ""  ? "Link Format nicht korrekt (http(s)://...)"
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
      initialEditValue: user?.username,
      editable: "never",
    },
  ];

  const handouts_not_shipped = $.grep(data, function (n, i) {
    return n.is_shipped === false;
  });
  const handouts = data.length.toString();

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
        {/*  */}
        <MaterialTable
          className="TableRow"
          title={handouts_not_shipped.length + " Aufträge nicht bearbeitet"}
          data={data}
          columns={columns}
          cellEditable={{
            isCellEditable: (rowData) => rowData.model === "",
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
              return new Promise(async (resolve, reject) => {
                //Backend call

                const clonedData = [...data];
                clonedData[rowData.tableData.id][columnDef.field] = newValue;
                setData(clonedData);
                await api
                  .put(`/api/handouts/${rowData.id}`, rowData)
                  .then((response) => {
                    ToastsStore.success("Gerätedaten gespeichert");
                    getDevices();
                    resolve();
                  })
                  .catch(function (error) {
                    //Case if Data is redundant or not complete || BAD REQUEST 400
                    if (error.response.status === 400) {
                      ToastsStore.error("Daten nicht vollständig oder doppelt");
                      //Case if permission is serverbased withdrawn but not frontendbased || FORBIDDEN 403
                    } else if (error.response.status === 403) {
                      ToastsStore.error("Keine Berechtigung");
                      //Case if Server not responding
                    } else if (response.status === 404) {
                      ToastsStore.error("Keine Verbindung zum Server");
                    }
                    reject();
                  });
              });
            },
          }}
          editable={{
            //add Row if user has permission to do so
            onRowAdd: (newData, tableData) =>
              new Promise(async (resolve, reject) => {
                //Backend call

                await api
                  .post("/api/handouts", newData)
                  .then((response) => {
                    ToastsStore.success("Auftrag hinzugefügt");
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
                  .put(`/api/handouts/${oldData.id}`, newData)
                  .then((response) => {
                    ToastsStore.success("Auftrag gespeichert");
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
                  .delete("/api/handouts/"+oldData.id, oldData)
                  .then((response) => {
                    ToastsStore.success("Auftrag gelöscht");
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
                    } else if (response.status === 404) {
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
            headerStyle: { zIndex: 1 },

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
                window.open(rowData.link, "_blank").focus();
              },
            },
          ]}
        />
      </div>
    </ThemeProvider>
  );
}
