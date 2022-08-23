import Events from './lib/Events'
import ErrorCapture from './lib/ErrorCapture'

class Monitor {
    // 事件
    private events: Events
    // 错误捕获
    private errorCapture: ErrorCapture

    constructor() {
        this.events = new Events()
        // 初始化错误捕获
        this.errorCapture = new ErrorCapture(this.events)
    }
}

export default Monitor

// @ts-ignore
window.Monitor = Monitor
