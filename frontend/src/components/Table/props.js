import { Link, useLocation } from "react-router-dom";
import React from 'react'

export default function Props() {
    let location = useLocation();
    
  
       console.log(location.pathname)
       return(
           <>
           </>
       );    
}
