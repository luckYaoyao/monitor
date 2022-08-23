interface EventTYpe {
    ERROR: string
    REPORT: string
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
    constructor() {}

    on(key: string, handle: Function) {}

    emit(key: string, handle: Function) {}

    once(key: string, handle: Function) {}
}

export default Events
