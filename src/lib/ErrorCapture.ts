import Events from './Events'
class ErrorCapture {
    constructor(events: Events) {
        this.injectJsError()
    }

    injectJsError() {
        // 监听全局未捕获的错误
        window.addEventListener(
            'error',
            (event: ErrorEvent) => {
                let log = {
                    // 监控指标的大类-稳定性
                    kind: 'stability',
                    // 小类型-错误
                    type: 'error',
                    // JS执行错误
                    error: 'jsError',
                    // 访问路径报错
                    url: '',
                    // 报错信息
                    message: event.message,
                    // 哪个文件报错了
                    filename: event.filename,
                    // 报错行和列
                    position: `${event.lineno}:${event.colno}`,
                    // 堆栈信息
                    stack: getLines(event.error.stack),
                    // 代表事件名称
                    selector: ''
                }
                console.log('error', event)
                // 资源加载错误
            }
        )

        window.addEventListener(
            'unhandledrejection',
            (event: PromiseRejectionEvent) => {
                console.log(event)
            }
        )
    }

    report() {}

    formatEvent() {}
}

const getLines = (stack: string) => {
    return stack
        .split('\n')
        .slice(1)
        .map((item) => item.replace(/^\s+at\s+/g, ''))
        .join('^')
}

export default ErrorCapture
