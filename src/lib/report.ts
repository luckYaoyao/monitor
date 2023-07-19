const DEFAULT_URL = 'http://yunhai-vision.com:3000/images/gs.gif'

const report = (data: any, url: string = DEFAULT_URL) => {
    let image = new Image()
    image.src = `${url}?d=${ encodeURIComponent(JSON.stringify(data)) }`
}

export default report
