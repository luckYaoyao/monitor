interface RequestOption {
    // 请求方法
    method: string
    // 请求URL
    url: string
    // 携带数据
    data?: Object
}

const Request = function (params: RequestOption) {
    return new Promise((resolve, reject) => {
        const { method, url } = params

        let xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded;charset=UTF-8'
        )

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

        xhr.timeout = 10 * 1000
        xhr.ontimeout = function (event: ProgressEvent) {
            reject(event)
        }

        xhr.send()
    })
}

export default Request
