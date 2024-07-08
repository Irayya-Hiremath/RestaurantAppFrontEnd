// const serialize = JSON.stringify
// const deserialize = JSON.parse
// NEXT_PUBLIC_CRYPTO_KEY

// function write(key, value) {
//   if (typeof window !== 'undefined') {
//     window.localStorage.setItem(key, serialize(value))
//   }
// }

// function read(key) {
//   if (typeof window !== 'undefined' && window.localStorage.getItem(key) !== 'undefined') {
//     return deserialize(window.localStorage.getItem(key))
//   }

//   return undefined
// }

// async function readAsync(key) {
//   if (typeof window !== 'undefined' && window.localStorage.getItem(key) !== 'undefined') {
//     return await deserialize(window.localStorage.getItem(key))
//   }

//   return undefined
// }

// function remove(key) {
//   if (typeof window !== 'undefined') {
//     window.localStorage.removeItem(key)
//   }
// }

// export { write, read, remove, readAsync }

import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

const secretKey = `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`

const serialize = JSON.stringify
const deserialize = JSON.parse

function encrypt(value) {
  return AES.encrypt(value, secretKey).toString()
}

function decrypt(encryptedValue) {
  const bytes = AES.decrypt(encryptedValue, secretKey)

  return bytes.toString(Utf8)
}

function write(key, value) {
  if (typeof window !== 'undefined') {
    const encryptedValue = encrypt(serialize(value))
    window.localStorage.setItem(key, encryptedValue)
  }
}

function read(key) {
  if (typeof window !== 'undefined' && window.localStorage.getItem(key) !== null) {
    const encryptedValue = window.localStorage.getItem(key)
    const decryptedValue = decrypt(encryptedValue)

    return deserialize(decryptedValue)
  }

  return undefined
}

async function readAsync(key) {
  if (typeof window !== 'undefined' && window.localStorage.getItem(key) !== null) {
    const encryptedValue = window.localStorage.getItem(key)
    const decryptedValue = decrypt(encryptedValue)

    return await deserialize(decryptedValue)
  }

  return undefined
}

function remove(key) {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key)
  }
}

export { write, read, remove, readAsync }
