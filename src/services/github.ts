import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/users',
  headers: {
    authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
})

export default api