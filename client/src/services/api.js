// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://finalhealthmatchhubproject.onrender.com",
// });

// // Automatically attach JWT token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "https://finalhealthmatchhubproject.onrender.com/api",
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;