import React, { useContext } from "react";
import UserContext from "./User/UserContext";
import login from "./APIRequests";

export default function Index() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h2>Home</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {user ? (
        <button
          onClick={() => {
            // call logout
            setUser(null);
          }}
        >
          logout
        </button>
      ) : (
        <button
          onClick={async () => {
            const test = await login({
              username: "LD",
              password: "ENERCON_01",
            });
            const responseData = await test.json();
            setUser(responseData);
          }}
        >
          login
        </button>
      )}
    </div>
  );
}
