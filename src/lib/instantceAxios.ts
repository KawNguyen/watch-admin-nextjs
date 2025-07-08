import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const instanceAxios = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
