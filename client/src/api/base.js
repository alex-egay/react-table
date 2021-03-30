import axios from 'axios';

const ApiService = {
  init() {
    axios.interceptors.request.use(async (config) => {
      config.headers = {
        Accept: 'application/json',
      };

      return config;
    });
  },

  get(resource, params) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
  },

  post(resource, params) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
  },

  put(resource, params) {
    return axios.put(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
  },

  delete(resource, params) {
    return axios.delete(`${process.env.REACT_APP_BASE_URL}${resource}`, params);
  },
};

export default ApiService;
