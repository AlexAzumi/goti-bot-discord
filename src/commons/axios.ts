import axios from 'axios'
// Configuration
import config from '../../configuration.json'

const instance = axios.create({
  params: {
    key: process.env.RAWG_API_KEY,
    page_size: config.limit,
  },
})

instance.defaults.timeout = 2500

export default instance
