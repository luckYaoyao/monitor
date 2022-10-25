// 监控指标的大类-稳定性、访问统计
type kind = 'stability' | 'access'
// 小类型-错误
type miniType = 'error' | 'performance' | 'blank'
// 错误类型-js执行错误、资源异常
type errorType = 'jsError' | 'assetsError'

interface LogData {
    // 监控指标的大类-稳定性
    kind: kind
    // 小类型-错误
    type: miniType
    // JS执行错误
    errorType: errorType
    // 访问路径报错
    url: string
    // 报错信息
    message: string
    // 哪个文件报错了
    filename: string
    // 报错行和列
    position: string
    // 堆栈信息
    stack: string
    // 时间
    timeStamp: number
}

type logType = 'info' | 'warn' | 'error'
