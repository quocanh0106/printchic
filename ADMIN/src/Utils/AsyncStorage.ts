const setItem = (name: string, params: any) => {
  return Promise.resolve().then(function () {
    localStorage.setItem(name, params)
  })
}
const getItem = (name: string) => {
  return Promise.resolve().then(function () {
    return localStorage.getItem(name)
  })
}
const removeItem = (name: string) => {
  return Promise.resolve().then(function () {
    return localStorage.removeItem(name)
  })
}

export { getItem, setItem, removeItem }
