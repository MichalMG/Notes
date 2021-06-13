import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.REACT_APP_DATABASE_NOTES,
})

export default instance;