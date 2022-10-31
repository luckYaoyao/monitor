import Request from './Request'

import { REPORT_URL } from '../config/index'

export default async (log: Object) => {
    try {
        const data = await Request({
            url: '/app/monitor/log/add',
            // url: '/app/' + REPORT_URL,
            method: 'post',
            data: {
                __logs__: [log]
            }
        })
        console.log(data)
    } catch (error: any) {
        // Todo 全局处理
        console.log('report', error)
    }
}
