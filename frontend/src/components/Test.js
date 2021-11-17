import React, { useContext, useEffect,useState } from "react";
import UserContext from "./User/UserContext";
import login from "./APIRequests";
import useFetch from "./Hooks/Fetching/useFetch";

export default function Index() {
  
    const { data, loading } =()=> useFetch("/api/devices", {
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

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive, el]);
};