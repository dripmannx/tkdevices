import MaterialTable from "material-table";
import React, { useState, useEffect, forwardRef } from "react";
import openInNewTab from "./openInNewTab";
  var sn = prompt("Seriennummer eingeben");

  if (sn != null) {
    openInNewTab("http://localhost:8000/devices/" +sn);}
