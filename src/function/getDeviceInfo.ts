export const isPc = (): boolean => {
    // @ts-ignore
    const platform = navigator.platform || navigator?.userAgentData.platform
    const reg = /(Win32|Win16|WinCE|Mac68K|MacIntel|MacIntel|MacPPC|Linux mips64)/i
    return reg.test(platform)
}

export const isMobile = (): boolean => {
    // @ts-ignore
    const platform = navigator.platform || navigator.userAgentData.platform
    const reg = /(iPhone|iPad|iPod|iOS|Android|Linux armv8l|Linux armv7l|Linux aarch64)/i
    return reg.test(platform)
}

export const getSystem = (): string => {
    try {
        if (/(android|Android|ANDROID)/i.test(navigator.userAgent)) {
            return 'Android'
        }
        if (/(iPhone|iPad|iPod|iOS|iphone|ipad|ipod|ios)/i.test(navigator.userAgent)) {
            return 'ios'
        }
        if (/win|windows|Win|Windows/i.test(navigator.userAgent)) {
            return 'windows'
        }

        if (/Linux/i.test(navigator.platform)) {
            return 'linux'
        }
        if (/Mac/i.test(navigator.userAgent)) {
            return 'mac'
        }
        return 'Unknow'
    } catch (e) {
        console.log(e)
        return 'Unknow'
    }
}

export const isWeChat = (): boolean => {
    return /MicroMessenger/i.test(navigator.userAgent)
}
