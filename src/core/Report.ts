import Request from '../lib/Request'
import ULog from '../types/ULog'

interface ReportType {}

class Report implements ReportType {
    public static async emit(logData: ULog) {
        // const logObj: ULog = this.eventHandle(event)
        try {
            const data = await Request({
                url: '/app/monitor/log/add',
                // url: '/app/' + REPORT_URL,
                method: 'post',
                data: logData
            })
            console.log(data)
        } catch (error: any) {
            // Todo 全局处理
            console.log('report', error)
        }
    }

    private eventHandle(logData: ULog): ULog {
        return logData
    }
}

export default Report
