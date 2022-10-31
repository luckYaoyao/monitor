// 性能监控

class PerformanceCapture {
    constructor() {
        this.pagePerformanceMonitor()
        this.resourcesMonitor()
        this.apiMonitor()
    }

    private pagePerformanceMonitor() {
        // 监控页面性能：FCP、白屏时间
        const per = performance.getEntriesByType('navigation')[0]
        // 取 fp 或 fcp 性能指标来代表 白屏时间
        // const fp = performance.getEntriesByType('paint')[0].startTime
        console.log(performance.getEntriesByType('paint'))

        const firstPaintComplete =
            performance.timing.loadEventEnd - performance.timing.navigationStart

        console.log('LCP: 最大内容渲染时间')
        console.log('DCL: DOMContentLoaded , DOM解析完毕')
        console.log('load: 页面依赖的所有资源加载完')
    }

    private resourcesMonitor() {
        // 静态资源监控：加载时间、资源大小、http协议
        // window.onerror | unhandledrejection | console.error
        // 一是onerror会获取不到跨域的script错误，解决方案也很简单：为跨域的script标签设置crossorigin属性，并且需要静态服务器为当前资源设置CORS响应头。
        // Todo: 和error是否能合并？
    }

    private apiMonitor() {
        // 接口监控，重写 xmlHttpRequest、fetch
        // let _fetch = fetch
        // window.fetch = function () {
        //     // custom code
        //     return _fetch.apply(this, arguments).then((res) => {
        //         // custom code
        //         return res
        //     })
        // }
    }
}

export default PerformanceCapture
