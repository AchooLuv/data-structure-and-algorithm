export function selectionSort(randomArray) {
    const {
        length
    } = randomArray
    let minIndex
    for (let i = 0; i < length - 1; i++) {
        minIndex = i
        for (let j = i + 1; j < length; j++) {
            if (randomArray[minIndex] > randomArray[j]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {   //优化点：相等时不交换
            [randomArray[minIndex], randomArray[i]] = [randomArray[i], randomArray[minIndex]]
        }
    }
    return randomArray
}