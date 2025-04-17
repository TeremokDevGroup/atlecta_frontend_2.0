import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-API-Key': import.meta.env.VITE_API_KEY,
    "x-kl-ajax-request": "Ajax_Request"
  },
});

export default http;
