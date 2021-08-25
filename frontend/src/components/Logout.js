import React, { useState, useEffect, Fragment } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState([]);


  const getCurrentUser = () => {
    fetch("/api/current_user", {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setUsername(resp);
      });
  };
  useEffect(() => {
    getCurrentUser();
  }, []); 
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      window.location.replace("http://localhost:8000");
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
      
        localStorage.removeItem("token");
        window.location.replace("http://localhost:8000");
  };

  return (
   <div>
       <title>Logout</title>
       <h1>Eingeloggt als <em>{username["user"]}</em></h1>
   <h1>Bist du sicher, dass du dich Ausloggen willst?</h1>
   {loading === false && (
     <form className="box" onSubmit={handleLogout}> 
       <input type="submit" value="Logout" />
     </form>
   )}
 </div>
  );
};
 
export default Logout;
