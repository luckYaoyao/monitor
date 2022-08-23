import Report from './Report'
interface EventTYpe {
    ERROR: string
    REPORT: string
}

interface EventConfig {
    [propName: string]: Array<Function>
}

export const eventTypes: EventTYpe = {
    ERROR: 'error',
    REPORT: 'report'
}

const events: string[] = [
    eventTypes.ERROR,
    eventTypes.REPORT
]

class Events {
    private callbacks: EventConfig = {}
    constructor() {
        this.callbacks = {}
        this.on(eventTypes.ERROR, (data: any) => {
            Report(data)
        })
    }

    on(key: string, handle: Function) {
        if (this.existEventKey(key)) {
            if (this.callbacks[key]) {
                this.callbacks[key].push(handle)
            } else {
                this.callbacks[key] = [handle]
            }
        } else {
            throw new Error(`Error 1002: ${key} 无效`)
        }
    }

    emit(key: string, data: Object) {
        if (
            this.existEventKey(key) &&
            this.callbacks[key]
        ) {
            this.callbacks[key].forEach(
                (handle: Function) => {
                    handle(data)
                }
            )
        } else {
            throw new Error(`Error 1001: ${key} 无效`)
        }
    }

    once(key: string, handle: Function) {}

    existEventKey(key: string): boolean {
        if (!key) return false
        return events.includes(key)
    }
}

export default Events
