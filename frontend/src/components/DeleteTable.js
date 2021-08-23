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

export default function DeleteTable() {
  
    if (localStorage.getItem("token") == null) {
      window.location.replace("http://localhost:8000");
    } 
    
  const url = "/api/device/defect";
 
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
  const getDevices = () => {
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
          icons={tableIcons}
          class="TableRow"
          title={deviceCountNotRemoved.length + " Geräte nicht entfernt"}
          data={data}
          columns={columns}
          /*
          cellEditable={{
            isCellEditable: (rowData) => rowData.model === "",
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
                    "Content-type": "application/json",
                  },

                  body: JSON.stringify(rowData),
                })
                  .then((resp) => resp.json())

                  .then((resp) => {
                    getDevices();
                    resolve();
                    ToastsStore.success("Änderung gespeichert");
                  });


              });
            
            },
          }}
          */
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
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            paging: false,
            maxBodyHeight: 700,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            filtering: true,

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
