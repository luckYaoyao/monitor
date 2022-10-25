import Log from "../core/Log"


const EVENT_ERROR = {
    '1001': 'key 无效'
}

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

const events: string[] = [eventTypes.ERROR, eventTypes.REPORT]

class Events {
    private callbacks: EventConfig = {}
    constructor() {
        this.callbacks = {}
        this.on(eventTypes.ERROR, (data: any) => {
            Log.error(data)
        })
    }

    on(key: string, handle: Function, once: boolean = false) {
        this.checkKeyValid(key)
        // @ts-ignore
        handle.once = once
        if (this.callbacks[key]) {
            this.callbacks[key].push(handle)
        } else {
            this.callbacks[key] = [handle]
        }
    }

    emit(key: string, data: Object, point: any = this) {
        this.checkKeyValid(key)
        if (this.callbacks[key]) {
            this.callbacks[key].forEach((handle: Function) => {
                handle.call(point, data)
                // @ts-ignore
                if (handle.once) {
                    this.off(key, handle)
                }
            })
        }
    }

    once(key: string, handle: Function) {
        this.checkKeyValid(key)
        this.on(key, handle, true)
    }

    off(key: string, handle: Function) {
        this.checkKeyValid(key)
        if (handle === undefined) {
            this.callbacks[key] = []
            delete this.callbacks[key]
        } else {
            this.callbacks[key] = this.callbacks[key].filter((func) => {
                return func != handle
            })
        }
    }

    existEventKey(key: string): boolean {
        if (!key) return false
        return events.includes(key)
    }

    checkKeyValid(key: string) {
        if (!this.existEventKey(key)) {
            throw new Error(`Error 1001: ${key} ${EVENT_ERROR['1001']}`)
        }
    }
}

export default Events
