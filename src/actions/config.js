import axios from "axios";

export const configAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  headers: {
    Authorization: `Token ${localStorage.getItem("access")}`,
  },
});
