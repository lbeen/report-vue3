export function getAxisMinAndMax(axis) {
    let min = axis[0][0]
    let max = min
    for (let item of axis) {
        for (let value of item) {
            if (value < min) {
                min = value
            }
            if (value > max) {
                max = value
            }
        }
    }

    let scala;
    const minPoint = min.toString().split('.')
    const maxPoint = min.toString().split('.')
    if (!minPoint || !maxPoint) {
        scala = 0
    } else {
        scala = Math.max(minPoint.length, maxPoint.length)
    }

    const multiple = Math.pow(10, scala)
    min = min * multiple
    max = max * multiple
    const diff = Math.round(max - min)

    if (min !== 0) {
        min = Math.round(min - diff / 10) / multiple
    }
    max = Math.round(max + diff / 10) / multiple
    return {
        min,
        max
    }
}

export function round(number, scala){
    const multiple = Math.pow(10, scala)
    return Math.round(number * multiple) / multiple
}

export function getPercent(numerator, denominator) {
    if (denominator === 0) {
        return 0
    }
    return Math.round(numerator / denominator * 100)
}