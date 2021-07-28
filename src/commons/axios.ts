import axios from 'axios'

const instance = axios.create({
  params: {
    key: process.env.RAWG_API_KEY,
  },
})

instance.defaults.timeout = 2500

export default instance
