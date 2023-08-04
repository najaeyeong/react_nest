import axios from "axios";

/** apuServer.post  , get  , put  ,delete */
export const apiServer = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI2,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiServer;
