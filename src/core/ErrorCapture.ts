// 错误监控
import Monitor from '../index'
import ULog from '../types/ULog'
import Report from './Report'
type ErrorEventUnion = ErrorEvent | PromiseRejectionEvent

class Error {
    constructor(monitor: Monitor) {
        this.errorCapture()
    }

    errorCapture() {
        window.addEventListener(
            'error',
            (event: ErrorEvent) => {
                this.reportError(event)
            },
            true
        )
        window.addEventListener(
            'unhandledrejection',
            (event: ErrorEventUnion) => {
                console.log(event)
                this.reportError(event)
            },
            true
        )
    }

    formatError(event: ErrorEventUnion) {
        const uLog: ULog = {
            kind: 'stability',
            type: 'error',
            // JS执行错误
            errorType: 'jsError',
            // 访问路径报错
            url: location.href,
            // 报错信息
            message: '',
            // 哪个文件报错了
            filename: '',
            // 报错行和列
            position: '',
            // 堆栈信息
            stack: '',
            // 时间
            timeStamp: event.timeStamp
        }
        const { type } = event

        if (type === 'error') {
            const node = event.target as HTMLElement,
                nodeName = node.nodeName

            if (nodeName === 'IMG' || nodeName === 'LINK' || nodeName === 'SCRIPT') {
                Object.assign(uLog, {
                    errorType: 'assetsError',
                    message: `asserts url error}`,
                    filename: node.getAttribute('src') || node.getAttribute('href')
                })
            } else {
                Object.assign(uLog, {
                    // 报错信息
                    message: (event as ErrorEvent).message,
                    // 哪个文件报错了
                    filename: (event as ErrorEvent).filename,
                    // 报错行和列
                    position: `${(event as ErrorEvent).lineno}:${(event as ErrorEvent).colno}`,
                    // 堆栈信息
                    stack: this.getLines((event as ErrorEvent).error.stack)
                })
            }
        }

        if (type === 'unhandledrejection') {
            Object.assign(uLog, {
                // 报错信息
                message: (event as PromiseRejectionEvent).reason.message,
                // 哪个文件报错了
                filename: '',
                // 报错行和列
                position: '',
                // 堆栈信息
                stack: this.getLines((event as PromiseRejectionEvent).reason.stack)
            })
        }
        return uLog
    }

    getLines = (stack: string) => {
        return stack
            .split('\n')
            .slice(1)
            .map((item) => item.replace(/^\s+at\s+/g, ''))
            .join('^')
    }

    reportError = (event: ErrorEventUnion) => {
        const logData: ULog = this.formatError(event)
        console.log(logData)
        Report.emit(logData)
    }
}

export default Error
