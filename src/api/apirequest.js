import axios from "axios";
const baseURL=`https://admin.aventuras.co.in/`;
// const baseURL=`http://localhost:1337`;
const API = axios.create({
  baseURL,
});

export {API,baseURL};
