import Request from './Request'

export default async (log: Object) => {
    try {
        const data = await Request({
            url: '/app/monitor/log/list',
            method: 'get',
            data: log
        })
        console.log(data)
    } catch (error: any) {
        // Todo 全局处理
        console.log('report', error)
    }
}
