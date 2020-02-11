import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://10.255.248.92:3007/`,
    // baseURL: `http://203.150.210.26:3007/`,
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
