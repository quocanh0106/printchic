import { TOKEN_KEY } from '~/Constants'
import axios from './interceptors'
import { clientStorage } from '~/Utils/clientStorage'

/**

Sử dụng setoken nếu cần thiết
@param token */ export const setToken = async (token = '') => {
  axios.defaults.headers.common['Authorization'] = `${token}`
}
export const clearToken = async () => {
  axios.defaults.headers.common['Authorization'] = ''
}

const requestAboutCode = 'ECONNABORTED'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.timeout = 360000

const RequestClient = class {
  constructor() {
    const access_token = clientStorage.get(TOKEN_KEY)
    if (access_token) {
      this.init(access_token)
    } else {
      this.init('')
    }
  }

  async init(access_token: string) {
    axios.defaults.headers.common['x-access-token'] = `${access_token}`
  }
  async headers(params: any) {
    const keys = Object.keys(params)

    keys.forEach((key: any) => {
      axios.defaults.headers.common[key] = params[key]
    })
  }
  async get(endpoint: string, params?: any) {
    return await axios
      .get(endpoint, { params: params ? params : '' })
      .then((values) => {
        return values
      })
      .catch((error) => {
        return error.response
      })
  }

  async post(endpoint: string, body: any, config?: any) {
    return await axios
      .post(endpoint, body, config)
      .then((values) => {
        return values
      })
      .catch((error) => {
        return error.response
      })
  }

  async put(endpoint: string, body: any, config: any) {
    return await axios
      .put(endpoint, body, config)
      .then((values) => {
        return values
      })
      .catch((error) => {
        return error.response
      })
  }

  async delete(endpoint: string, data: any) {
    return await axios
      .delete(endpoint, { data: data })
      .then((values) => {
        return values
      })
      .catch((error) => {
        return error.response
      })
  }
  async upload(endpoint: string, file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return await axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((values) => {
        return values
      })
      .catch((error) => {
        return error.response
      })
  }
  handleError(error: any) {
    if (error.response && error.response.status === 401) {
      // xử lý logout đoạn này
    }
    if (error.code === requestAboutCode || ('response' in error && error.response === undefined)) {
      // delay(1000);
      error.recall = true
    }
    // throw error;
  }
}

const client = new RequestClient()

export { client }
