const axios = require("axios");
axios.defaults.baseURL = process.env.VITE_API_URL ?? "http://localhost/api/";
