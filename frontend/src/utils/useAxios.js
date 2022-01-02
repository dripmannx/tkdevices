import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import { useHistory } from "react-router-dom";
const baseURL = "http://localhost:8000";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens,logoutUser } = useContext(AuthContext);
  const history = useHistory();
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const refresh = jwt_decode(authTokens.refresh);
    const isExpiredRefresh = dayjs.unix(refresh?.exp).diff(dayjs()) < 1;
    const isExpired = dayjs.unix(user?.exp).diff(dayjs()) < 1;
    //logout if reshresh token is expired
    if (isExpiredRefresh) {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      history.push("/login");
    }
    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
