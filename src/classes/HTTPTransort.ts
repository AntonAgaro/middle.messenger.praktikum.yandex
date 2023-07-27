enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
function queryStringify(data: Record<string, string>) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  let res = '?'
  Object.keys(data).forEach((i, idx, arr) => {
    res = `${res + i}=${data[i].toString()}${idx === arr.length - 1 ? '' : '&'}`
  })

  return res
}

export default class HTTPTransport {
  get = (url: string, options: Record<string, any> = {}) => {
    if (options.data) {
      options.data = queryStringify(options.data)
      url += options.data
    }
    return this.request(url, { ...options, method: HTTPMethods.GET })
  }

  post = (url: string, options = {}) => this.request(url, { ...options, method: HTTPMethods.POST })

  put = (url: string, options = {}) => this.request(url, { ...options, method: HTTPMethods.PUT })

  delete = (url: string, options = {}) => this.request(url, { ...options, method: HTTPMethods.DELETE })

  // PUT, POST, DELETE

  // options:
  // headers — obj
  // data — obj

  request = (url: string, options: Record<string, any>) => {
    const { method, data } = options
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      if (options.headers) {
        for (const header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header])
        }
      }

      xhr.responseType = 'json'

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
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}
