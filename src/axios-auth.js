import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_DATABASE_NOTES,
  params: {
    key: process.env.REACT_APP_AUTH_KEY_NOTES
  }
})

export default instance;