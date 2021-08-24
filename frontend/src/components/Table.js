<<<<<<< HEAD
//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { FlightTakeoff } from "@material-ui/icons";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const darkTheme = createTheme({
  header:{
    zIndex:0
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
=======
/* import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { save } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import tableIcons from "./TableIcons";
import { makeStyles } from "@material-ui/styles";
const tableIcons = tableIcons
const useStyles = makeStyles({
  colHeader: {
    color: "red",
    "&:hover": {
      color: "blue",
    },
  },
});
export default function Table() {
  const classes = useStyles()
  const url = "/api/all";
  const urledit = "/api/device/";
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const [data, setData] = useState([]);
>>>>>>> origin/master
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
<<<<<<< HEAD
        rowData.serialnumber.length != 12 ||
        rowData.serialnumber !== rowData.serialnumber.toUpperCase()
          ? "S/N im richtigen Format angeben"
          : true,
      filterPlaceholder: "S/N eingeben",
=======
        rowData.serialnumber.length != 12|| rowData.serialnumber != rowData.serialnumber.toUpperCase()
          ? "Falsches Format oder Leer (Uppercase und 12 stellig)"
          : true,
>>>>>>> origin/master
    },
    {
      title: "Modell",
      field: "model",
<<<<<<< HEAD
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
=======
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
>>>>>>> origin/master
    },
    {
      title: "Batterie in %",
      field: "batterylife",
<<<<<<< HEAD
      defaultSort: "desc",

      validate: (rowData) =>
        rowData.batterylife === undefined ||
        rowData.batterylife === "" ||
        rowData.batterylife < 0 ||
        rowData.batterylife > 100
          ? "Wert zwischen 0 und 100"
          : true,
      filtering: false,

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
=======
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
>>>>>>> origin/master
    },
    {
      title: "Speicher in GB",
      field: "capacity",
<<<<<<< HEAD

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
        false: "rausgegeben",
      },
      filterPlaceholder: "Status auswählen",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
          : true,
    },
    {
      title: "Defekt",
      field: "status_defect",
      type: "boolean",
      filering: false,
    },
  ];
  const url = "/api/device";
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  
  const getDevices = () => {
    fetch(url, {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
=======
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "benötigt" : true,
    },
    {
      title: "Status",
      field: "status",
      lookup: {
        lagernd: "lagernd",
        raus: "raus",
        validate: (rowData) =>
          rowData.model === undefined || rowData.model === ""
            ? "benötigt"
            : true,
      },
    },
  ];
  const getDevices = () => {
    fetch("/api/all")
>>>>>>> origin/master
      .then((resp) => resp.json())
      .then((resp) => {
        console.table(resp);
        setData(resp);
      });
  };
<<<<<<< HEAD
  const getCurrentUser = () => {
    fetch("/api/current_user", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.table(resp);
        
      });
  };
  getCurrentUser();
=======
>>>>>>> origin/master
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getDevices();
  }, []);
<<<<<<< HEAD
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
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        <MaterialTable
          icons={tableIcons}
          class="TableRow"
          title={""}
          data={data}
          columns={columns}
          /*
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
          */
          editable={{
            onRowAdd: (newData,tableData) =>
=======

  const deviceCount = data.length + " Geräte";
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="Table">
        <h1 align="center">Alle Geräte</h1>
        <h4 align="center"></h4>
        <MaterialTable
          icons={tableIcons}
          class="TableRow"
          title={deviceCount}
          data={data}
          columns={columns}
          
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                //Backend POST
                fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                });
                document
                  .write(newData)
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend PUT
                fetch(urledit + oldData.id, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                //Backend DELETE
                fetch(urledit + oldData.id, {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                  },
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
          }}
         
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            paging: false,
            maxBodyHeight: "600px",
          }}
        />
      </div>
    </ThemeProvider>
  );
}
 */
  /*
          cellEditable={{
            onCellEditApproved: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend PUT
                fetch(urledit + oldData.id, {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
            }}
          */
//This File is for the Table View. It calls the RestAPI Endpoint(POST,DELETE,PUT,GET) for the different actions. It uses the material-table for the Table View 
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import { save } from "@material-ui/icons";
import { createTheme, ThemeProvider, alpha } from "@material-ui/core/styles";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export default function Table() {
  const url = "/api/device";
  
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12
          ? "Eintragen"
          : true,
    },
    {
      title: "Modell",
      field: "model",
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "Required" : true,
    },
    {
      title: "Batterie in %",
      field: "batterylife",
      numeric:true,
      validate: (rowData) =>
        rowData.batterylife === undefined || rowData.batterylife === "" || rowData.batterylife < 0 || rowData.batterylife > 100
          ? "Eintragen"
          : true,
     
        
          
    },
    {
      title: "Speicher in GB",
      field: "capacity",
      validate: (rowData) =>
        rowData.capacity === undefined || rowData.capacity === ""
          ? "Required"
          : true,
    },
    {
      title: "Status",
      field: "status",

      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Required"
          : true,
    },
  ];
  const getDevices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  };
  //useEffect Hook to fetch the data from the REST API Endpoint, wich provided all devices
  useEffect(() => {
    getDevices();
  }, []);

  const deviceCount = data.length + " Geräte";
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="Table">
        <h1 align="center">Alle Geräte</h1>
        <h4 align="center"></h4>
        <MaterialTable
          icons={tableIcons}
          class="TableRow"
          title={deviceCount}
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newData) =>
>>>>>>> origin/master
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url, {
                  method: "POST",
                  headers: {
<<<<<<< HEAD
                    Authorization: `Token ${localStorage.getItem("token")}`,
=======
                    "Content-type": "application/json",
>>>>>>> origin/master
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
<<<<<<< HEAD
                    ToastsStore.success("Neues Gerät gespeichert");
                    getDevices();
                    resolve();
                  });
                
              }),

=======
                    getDevices();
                    resolve();
                  });
              }),
>>>>>>> origin/master
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.id, {
                  method: "PUT",
                  headers: {
<<<<<<< HEAD
                    Authorization: `Token ${localStorage.getItem("token")}`,
=======
                    "Content-type": "application/json",
>>>>>>> origin/master
                  },
                  body: JSON.stringify(newData),
                })
                  .then((resp) => resp.json())
                  .then((resp) => {
<<<<<<< HEAD
                    ToastsStore.success("Gerätedaten gespeichert");
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
                    Authorization: `Token ${localStorage.getItem("token")}`,
                  },
                }).then((resp) => {
                  ToastsStore.success("Gerät Gelöscht");
                  getDevices();
                  resolve();
                });
                
              }),
              
          }}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            paging: false,
            maxBodyHeight: 700,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,
            headerStyle: {
              zIndex: 1,
            },

            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
            filterCellStyle: { Color: "#2E2E2E", paddingTop: 1 },
=======
                    "Content-type": "application/json",
                  },
                })
                  .then((resp) => {
                    getDevices();
                    resolve();
                  });
              }),
          }}
          options={{
            paging: false,
            maxBodyHeight: 600,
            actionsColumnIndex: -1,
            addRowPosition: "first",
>>>>>>> origin/master
          }}
        />
      </div>
    </ThemeProvider>
  );
}
