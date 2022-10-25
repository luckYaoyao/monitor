import report from "../lib/report"
import { getCurrentTime } from "../function/utils"

const INFO_CLASS = 'background-color: #ddd; padding: 2px 6px; border-radius: 4px;'
const WARN_CLASS = 'background-color: yellow; padding: 2px 6px; border-radius: 4px'
const ERROR_CLASS = 'background-color: red; padding: 2px 6px; border-radius: 4px; color: #fff'

const handle = (data: any, type: logType) => {
    report(data)
}

class Log {
    static info(data: LogData) {
        console.log('%cinfo', INFO_CLASS, getCurrentTime(), JSON.stringify(data))
        handle(data, 'info')
    }

    static warn(data: LogData) {
        console.log('%cwarn', WARN_CLASS, getCurrentTime(), JSON.stringify(data))
        handle(data, 'warn')
    }

    static error(data: LogData) {
        console.log('%cerror', ERROR_CLASS, getCurrentTime(), JSON.stringify(data))
        handle(data, 'error')
    }
}

export default Log