import { Link, useLocation } from "react-router-dom";
import React from 'react'
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function Props() {
    let location = useLocation();
    
  
       return(
           <>
           </>
       );    
}
//Table German trans
export const localization ={
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
              actions: "",
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
              searchPlaceholder: "Suche...",}
            
};

export const darkTheme = createTheme({
  header: {
    zIndex: -1,
  },
  palette: {
    type: "dark",
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#ff9100",
      },
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&:hover": {
          backgroundColor: "#2E2E2E !important",
        },
      },
    },
  },
});
