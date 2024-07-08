// import { LOG_IN } from 'src/constant/ApiConstant'
import { LOG_IN } from '@/constants/ApiConstant'
import { axiosPostWithoutHeader } from '../utility'



export async function userLogin(payload) {
  try {
    const url = `${LOG_IN}`
    const data = payload
    const response = await axiosPostWithoutHeader({ url, body: data })


    return response
  } catch (error) {
    if (error.response) {
      console.info('Request made and server responded')
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
    }

    return error
  }
}


