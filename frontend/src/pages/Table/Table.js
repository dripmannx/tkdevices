//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import MaterialTable from "material-table";
import useAxios from "../../utils/useAxios";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
//importing Talbe Style and Übersetztung
import Props, { localization, darkTheme } from "./props";
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useReducer,
  useContext,
} from "react";
import { createTheme, ThemeProvider, alpha } from "@material-ui/core/styles";
//import CSS Styles
import "../../../static/css/table.css";

import SmartphoneIcon from "@material-ui/icons/Smartphone";
import LoopIcon from "@material-ui/icons/Loop";
import AuthContext from "../../utils/AuthContext";
import Router, { useHistory } from "react-router-dom";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
const override = css`
  display: block;
  margin: 10 auto;
  border-color: red;
  z-index: 9999;
`;
export default function Table() {
  const url = "/api/device";
  const history = useHistory();
  const [data, setData] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const api = useAxios();
  let [color, setColor] = useState("#ffffff");
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provides all devicedata
  document.title = "Geräte";
  useEffect(() => {
    getDevices();
    if (!user.is_staff) {
      localization.body.emptyDataSourceMessage = "Keine Berechtigung zu lesen";
      
    }
  }, []);
  const getDevices = async () => {
    let response = await api.get("/api/device");

    if (response.status === 200) {
      setData(response.data);
    } else {
      ToastsStore.error("Fehler beim Laden der Geräte");
    }
  };
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
        rowData.batterylife < 1 ||
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
        false: "in Nutzung",
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
      title: "Zustand",
      field: "condition",
      type: "boolean",
      filering: false,
      cellStyle: {
        justifyContent: "right",
      },
    },
  ];

  const deviceCount = data.length.toString() + " Geräte lagernd";

  return (
    <ThemeProvider theme={darkTheme}>
      {loading ? (
        <div className="sweet-loading justify-center text-center">
          <BeatLoader
            color={color}
            loading={loading}
            css={override}
            size={50}
          />
        </div>
      ) : (
        <>
          <title className="">{deviceCount}</title>
          <div className="Table">
            <ToastsContainer
              store={ToastsStore}
              position={ToastsContainerPosition.BOTTOM_CENTER}
            />

            <MaterialTable
              //icons={tableIcons}
              title={deviceCount}
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
                          ToastsStore.error(
                            "Daten nicht vollständig oder doppelt"
                          );
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
                          ToastsStore.error(
                            "Daten nicht vollständig oder doppelt"
                          );
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
                //Backend call
                /* fetch(url + "/" + oldData.serialnumber, {
                  method: "PUT",
                  headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(newData),
                }).then((resp) => {
                  if (resp.ok) {
                    ToastsStore.success("Geräte Daten gespeichert");
                    resp.json();
                    getData(data, setData, url);
                    resolve();
                  } else {
                    ToastsStore.error("Fehler beim Speichern");
                    reject();
                  }
                });
              }), */

                //delete Row uf user has permission to do so
                onRowDelete: (oldData) =>
                  new Promise(async (resolve, reject) => {
                    //Backend call
                    await api
                      .delete(`/api/device/${oldData.serialnumber}`, oldData)
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
                exportButton: true,
                headerStyle: {
                  zIndex: 0,
                },

                filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
              }}
              actions={[
                (rowData) => ({
                  icon: SmartphoneIcon,
                  tooltip: "Gerät öffnen",
                  onClick: (event, rowData) => {
                    history.push({
                      pathname: `/devices/` + rowData.serialnumber,
                      state: rowData.serialnumber,
                    });
                  },
                }),
                (rowData) => ({
                  icon: LoopIcon,
                  tooltip: "Status ändern",
                  onClick: (event, rowData) => {
                    new Promise(async (resolve, reject) => {
                      const clonedData = rowData;
                      clonedData.status = !clonedData.status;

                      await api
                        .put(`/api/device/${rowData.serialnumber}`, clonedData)
                        .then((response) => {
                          ToastsStore.success("Status Geändert");
                          getDevices();
                          resolve();
                        })
                        .catch(function (error) {
                          //Case if Data is redundant or not complete || BAD REQUEST 400
                          if (error.response.status === 400) {
                            ToastsStore.error(
                              "Daten nicht vollständig oder doppelt"
                            );
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
                }),
              ]}
              localization={localization}
            />
          </div>
        </>
      )}
    </ThemeProvider>
  );
}
