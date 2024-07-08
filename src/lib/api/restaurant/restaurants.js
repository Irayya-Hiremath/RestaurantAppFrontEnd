import { RESTAURANT,CREATE_NEW_RESTAURANT }  from '@/constants/ApiConstant'
import { axiosGet, axiosPost, axiosDelete } from '../utility'

export async function getListOfRestaurants() {
  try {
    const url = `${RESTAURANT}`

    const response = await axiosGet({ url })

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
export async function getDetailOfRestaurants(id) {
  try {
    const url = `${RESTAURANT}/${id}`

    const response = await axiosGet({ url })

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
export async function addRestaurant(payload) {
  try {
    const url = `${CREATE_NEW_RESTAURANT}`
    const data = payload
    const response = await axiosPost({ url, body: data })

    // console.log('api response',response)

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

export async function updateRestaurant(payload, id) {
  try {
    const url = `${RESTAURANT}/update/${id}`
    const data = payload
    const response = await axiosPost({ url, body: data })

    // console.log('api response',response)

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
export async function deleteRestaurant(id) {
  try {
    const url = `${RESTAURANT}/delete/${id}`
    const response = await axiosDelete({ url })

    // console.log('api response',response)

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
