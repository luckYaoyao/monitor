import Events from './lib/Events'
import Analyser from './lib/Analyse'
import ErrorCapture from './core/ErrorCapture'

class Monitor {
    // 事件
    private events: Events
    // 错误捕获
    // private errorCapture: ErrorCapture
    private errorCapture: ErrorCapture
    // 访问量捕获
    // private analyser: Analyser

    constructor() {
        this.events = new Events()
        // 初始化错误捕获
        this.errorCapture = new ErrorCapture(this)
        // this.errorCapture = new ErrorCapture(this.events)

        // this.analyser = new Analyser(this.events)
    }
}

export default Monitor

// @ts-ignore
window.Monitor = Monitor
