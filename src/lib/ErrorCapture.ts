import Events from './Events'
import ULog from '../types/ULog'

class ErrorCapture {
    private events: Events

    constructor(events: Events) {
        this.events = events
        this.injectJsError()
    }

    injectJsError() {
        // 监听全局未捕获的错误
        window.addEventListener(
            'error',
            (event: ErrorEvent) => {
                console.log('error', event)
                // 资源加载错误
                const log = this.formatEvent(event)
                this.report(log)
            }
        )

        window.addEventListener(
            'unhandledrejection',
            (event: PromiseRejectionEvent) => {
                console.log(event)
            }
        )
    }

    report(event: ULog) {
        this.events.emit('error', event)
    }

    formatEvent(event: ErrorEvent): ULog {
        let log: ULog = {
            // 监控指标的大类-稳定性
            kind: 'stability',
            // 小类型-错误
            type: 'error',
            // JS执行错误
            error: 'jsError',
            // 访问路径报错
            url: event.filename,
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

        return log
    }
}

const getLines = (stack: string) => {
    return stack
        .split('\n')
        .slice(1)
        .map((item) => item.replace(/^\s+at\s+/g, ''))
        .join('^')
}

export default ErrorCapture
