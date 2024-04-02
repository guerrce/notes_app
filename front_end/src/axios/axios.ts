import axios from "axios";
import { BUILD_URL, DEV_URL } from "../constants";

const baseURL = process.env.NODE_ENV === 'development'
  ? DEV_URL
  : BUILD_URL

const instance = axios.create({
  baseURL,
});

export default instance;
