import axios from 'axios'
import { readAsync } from '../../../lib/windows/utils'

const base_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}`

export const GetAPIHeader = async () => {
  const userDetails = await readAsync('userData')
  const header = {}
  if (userDetails?.token !== '') {
    header['token'] = `${userDetails?.token}`
  }

  return header
}

export const axiosGet = async ({ url, params }) => {
  const headers = await GetAPIHeader()
  const completeUrl = `${base_url}${url}`
  headers['Content-Type'] = 'application/json'

  return axios.get(completeUrl, { headers: headers, params: params })
}

export const axiosPost = async ({ url, body }) => {
  const completeUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`
  const headers = await GetAPIHeader()
  headers['Content-Type'] = 'application/json'

  return axios.post(completeUrl, body, { headers })
}
export const axiosPostWithoutHeader = async ({ url, body }) => {
  const completeUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`

  return axios.post(completeUrl, body, {  })
}


export const axiosDelete = async ({ url, params }) => {
  const completeUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`
  console.log('completeUrl', completeUrl)
  const headers = await GetAPIHeader()
  headers['Content-Type'] = 'application/json'

  return axios.delete(completeUrl,  { headers: headers, params: params  })
}
