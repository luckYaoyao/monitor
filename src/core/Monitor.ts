import Events from '../lib/Events'
import ErrorCapture from './ErrorCapture'

class Monitor {
    // 事件
    public events: Events
    // 错误捕获
    private errorCapture: ErrorCapture

    constructor() {
        this.events = new Events()
        this.errorCapture = new ErrorCapture(this)
    }
}

export default Monitor