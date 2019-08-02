import axios from 'axios'

const Axios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})

export default Axios
