export const getCurrentTime = () => {
    let date = new Date()
    return date.toLocaleTimeString()
}