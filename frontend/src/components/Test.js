import React, { useContext, useEffect } from "react";
import UserContext from "./User/UserContext";
import login from "./APIRequests";
import useFetch from "./Hooks/Fetching/useFetch";

export default function Index() {
  
    const { data, loading } =()=> useFetch("api/devices", {
      method: "GET",
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
  console.log(data)

  return (
    <div>
      <h2>Home</h2>
      <div>{!data ? "loading..." : data}</div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
