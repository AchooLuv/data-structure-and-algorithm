export function bubbleSort(randomArray) {
    const {
        length
    } = randomArray

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // 减去已排序数据的迭代趟数
            if (randomArray[j] > randomArray[j + 1]) {
                [randomArray[j], randomArray[j + 1]] = [randomArray[j + 1], randomArray[j]]
            }
        }
    }

    return randomArray
}

export function optimizedBubbleSort(randomArray) {
    const {
        length
    } = randomArray

    for (let i = 0; i < length - 1; i++) {
        let exchange = true
        for (let j = 0; j < length - 1 - i; j++) {
            if (randomArray[j] > randomArray[j + 1]) {
                [randomArray[j], randomArray[j + 1]] = [randomArray[j + 1], randomArray[j]]
                exchange = false
            }
        }
        // 无数据交换时，则说明当前数据已排序完成
        if (exchange) return randomArray
    }
}

// 双向冒泡
export function bidirectionalBubbleSort(randomArray) {
    let low = 0
    let high = randomArray.length - 1
    while (low < high) {
        let exchange = true
        for (let i = low; i < high; i++) {
            // 找出最大值，置于右边
            if (randomArray[i] > randomArray[i + 1]) {
                [randomArray[i], randomArray[i + 1]] = [randomArray[i + 1], randomArray[i]]
                exchange = false
            }
        }
        high--
        for (let j = high; j > low; j--) {
            // 找出最小值，置于左边
            if (randomArray[j] < randomArray[j - 1]) {
                [randomArray[j], randomArray[j - 1]] = [randomArray[j - 1], randomArray[j]]
                exchange = false
            }
        }
        low++
        if (exchange) return randomArray
    }
}