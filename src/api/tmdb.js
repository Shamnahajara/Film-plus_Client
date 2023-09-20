import axios from "axios";
import { baseURL } from "./constance";
const instance = axios.create({
    baseURL: baseURL,
   
  });

  export default instance;