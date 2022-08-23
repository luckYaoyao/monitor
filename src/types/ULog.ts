interface ULog {
    // 监控指标的大类-稳定性
    kind: string,
    // 小类型-错误
    type: string,
    // JS执行错误
    error: string,
    // 访问路径报错
    url: string,
    // 报错信息
    message: string,
    // 哪个文件报错了
    filename: string,
    // 报错行和列
    position: string,
    // 堆栈信息
    stack: string,
    // 代表事件名称
    selector: string
}

export default ULog