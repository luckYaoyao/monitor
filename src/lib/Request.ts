const METHOD_GET = 'GET'
const METHOD_POST = 'POST'

interface RequestOption {
    // 请求方法
    method: string
    // 请求URL
    url: string
    // 携带数据
    data?: Object
}

const formatParams = (params: any) => {
    let arr: Array<string> = []
    for (let key in params) {
        if (
            params[key] ||
            params[key] === 0 ||
            params[key] === false
        ) {
            arr.push(`${key}=${encodeURI(params[key])}`)
        }
    }
    return `${arr.join('&')}`
}

const Request = function (params: RequestOption) {
    return new Promise((resolve, reject) => {
        let { method, url, data } = params

        let xhr = new XMLHttpRequest()

        if (method.toUpperCase() === METHOD_GET) {
            url += '?' + formatParams(data)
        }

        xhr.open(method, url)

        setContentType(xhr, 'json')
        xhr.onreadystatechange = function () {
            if (
                xhr.readyState === 4 &&
                xhr.status === 200
            ) {
                resolve(xhr.response)
            }
        }

        xhr.onerror = function (event: ProgressEvent) {
            reject(event)
        }

        xhr.timeout = 30 * 1000
        xhr.ontimeout = function (event: ProgressEvent) {
            reject(event)
        }

        if (method.toUpperCase() == METHOD_GET) {
            xhr.send()
        }

        if (method.toUpperCase() == METHOD_POST) {
            xhr.send(JSON.stringify(data))
        }
    })
}

interface ContentType {
    json: string
    form: string
    text: string
    html: string
    [propName: string]: string
}

const contentTypeList: ContentType = {
    json: 'application/json; charset=utf-8',
    form: 'application/x-www-form-urlencoded; charset=utf-8',
    text: 'text/plain; charset=utf-8',
    html: 'text/html; charset=utf-8'
}

const setContentType = (
    xhr: XMLHttpRequest,
    type: string
) => {
    if (contentTypeList[type]) {
        xhr.setRequestHeader(
            'Content-Type',
            contentTypeList[type]
        )
    }
}

export default Request
