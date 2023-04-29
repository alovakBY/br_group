import axios from 'axios'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'

const config = {
   baseURL: BASE_URL,
}

const api = axios.create(config)

export default api
