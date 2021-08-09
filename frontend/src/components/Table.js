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
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [
    {
      title: "Seriennummer",
      field: "serialnumber",
      validate: (rowData) =>
        rowData.serialnumber === undefined ||
        rowData.serialnumber === "" ||
        rowData.serialnumber.length != 12||rowData.serialnumber !== rowData.serialnumber.toUpperCase()
          ? "S/N im richtigen Format angeben"
          : true,
    },
    {
      title: "Modell",
      field: "model",
      lookup: {
        "SE 2016": "iPhone SE 2016",
        "SE 2020": "iPhone SE 2020",
        "6s": "iPhone 6s",
        "7":"iPhone 7",
        "11": "iPhone 11"
      },
      validate: (rowData) =>
        rowData.model === undefined || rowData.model === "" ? "Model auswählen" : true,
    },
    {
      title: "Batterie in %",
      field: "batterylife",

      validate: (rowData) =>
        rowData.batterylife === undefined ||
        rowData.batterylife === "" ||
        rowData.batterylife < 0 ||
        rowData.batterylife > 100
          ? "Wert zwischen 0 und 100 Eintragen"
          : true,
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
    },
    {
      title: "Status",
      field: "status",
      lookup: {"lagernd":"lagernd",
                "raus":"rausgegeben",
      },
      defaultSort:"asc",
      validate: (rowData) =>
        rowData.status === undefined || rowData.status === ""
          ? "Status auswählen"
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
const deviceCountIn = $.grep(data, function (n, i) {
  return n.status === "lagernd";
});
  
  
  const deviceCount = data.length +  ' Geräte'+'\n'+'davon '+  deviceCountIn.length + ' lagernd';
  console.log('${deviceCount}')
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
                //Backend call
                fetch(url, {
                  method: "POST",
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
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //Backend call
                fetch(url + "/" + oldData.id, {
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
                //Backend call
                fetch(url + "/" + oldData.id, {
                  method: "DELETE",
                  headers: {
                    "Content-type": "application/json",
                  },
                }).then((resp) => {
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
            maxBodyHeight: 600,
            actionsColumnIndex: -1,
            addRowPosition: "first",
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#2E2E2E" : "#424242",
            }),
          }}
        />
      </div>
    </ThemeProvider>
  );
}
