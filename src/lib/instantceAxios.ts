import axios from "axios";
const URL = process.env.NEXT_PUBLIC_URL;

export const instanceAxios = axios.create({
  baseURL: URL,
});
