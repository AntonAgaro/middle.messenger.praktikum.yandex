import { HTTPMethods } from '../enums/HTTPMethods'

function queryStringify(data: Record<string, string>) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  let res = '?'
  Object.keys(data).forEach((i, idx, arr) => {
    res = `${res + i}=${data[i].toString()}${idx === arr.length - 1 ? '' : '&'}`
  })

  return res
}

type HTTPMethod = (url: string, options: Record<string, any>) => Promise<unknown>

export default class HTTPTransport {
  static baseURL = 'https://ya-praktikum.tech/api/v2'

  get: HTTPMethod = (url, options = {}) => {
    if (options.data) {
      options.data = queryStringify(options.data)
      url += options.data
    }
    return this.request(url, { ...options, method: HTTPMethods.GET })
  }

  post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: HTTPMethods.POST })

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: HTTPMethods.PUT })

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: HTTPMethods.DELETE })

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj

  request: HTTPMethod = (url, options) => {
    const { method, data } = options
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, HTTPTransport.baseURL + url)
      if (options.headers) {
        for (const header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header])
        }
      }

      xhr.responseType = 'json'
      xhr.withCredentials = true

      const handleError = () => {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }

      xhr.onload = () => {
        if (xhr.status >= 200) {
          resolve(xhr)
        } else {
          handleError()
        }
      }

      xhr.onabort = handleError
      xhr.onerror = handleError
      xhr.ontimeout = handleError

      if (method === 'GET' || !data) {
        xhr.send()
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
