
const awaitTime = async (time: number) => {
    await new Promise(res => setTimeout(res, time))
}

const UTIL = {
    awaitTime
}

export default UTIL