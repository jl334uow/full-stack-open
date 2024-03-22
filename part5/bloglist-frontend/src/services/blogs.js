import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = 'Bearer ' + newToken
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }
  return await axios.post(baseUrl, newObject, config)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id, newObject) => {
  return await axios.put(baseUrl + '/' + id, newObject)
}

export default { getAll, create, setToken, update }