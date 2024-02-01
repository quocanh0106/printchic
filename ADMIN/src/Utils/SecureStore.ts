import { TOKEN_KEY } from '~/Constants'
// import * as SecureStore from 'expo-secure-store'
import { setItem, getItem, removeItem } from './AsyncStorage'

const setToken = async (token: string) => {
  if (true) {
    await setItem(TOKEN_KEY, token)
  } else {
    // return SecureStore.setItemAsync(TOKEN_KEY, token)
  }
}

const getToken = async () => {
  if (true) {
    const token = await getItem(TOKEN_KEY)
    return token
  } else {
    // return SecureStore.getItemAsync(TOKEN_KEY)
  }
}

const getAccessToken = async () => {
  // if (__DEV__) {
  const accessToken = await getItem(TOKEN_KEY)
  //   const idToken = await getItem(ID_TOKEN_KEY)
  //   const refreshToken = await getItem(REFRESH_TOKEN_KEY)
  return accessToken
  // } else {
  //  return SecureStore.getItemAsync(TOKEN_KEY)
  // }
}

const deleteToken = async () => {
  await removeItem(TOKEN_KEY)
}

const onLogout = async () => {
  await deleteToken()
}

export { setToken, getToken, getAccessToken, deleteToken, onLogout }
