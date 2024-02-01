import axios from 'axios'
import { TOKEN_KEY } from '~/Constants'
import { getAccessToken } from '~/Utils/SecureStore'
import { clientStorage } from '~/Utils/clientStorage'

axios.interceptors.response.use(
  (res) => {
    const response: any = res
    return response
  },
  async (error) => {
    const originalRequest = error.config
    let urlRefreshToken = originalRequest.url.split('/')
    urlRefreshToken = urlRefreshToken[urlRefreshToken.length - 1]

    if (error?.response?.status === 401) {
      handleLogout()
    }
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    if (token) {
      setTokenToAuthor(token)
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export const setTokenToAuthor = (token: string) => {
  axios.defaults.headers.common['x-access-token'] = `${token}`
}

export const isSuccessResponse = (res: any) => {
  return res.data.success
}

export const clearToken = async () => {
  axios.defaults.headers.common['x-access-token'] = ''
}

export const handleLogout = () => {
  clientStorage.remove(TOKEN_KEY)
  clearToken()
}

export default axios
