import axios from 'axios';

const applyAxiosConfig = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default applyAxiosConfig;
