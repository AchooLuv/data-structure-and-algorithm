import {
    bubbleSort,
    optimizedBubbleSort,
    bidirectionalBubbleSort
} from "./Sort/bubbleSort.js"

const randomArray = [13, 3, 6, 1, 9, 23]
console.log("随机数组：" + randomArray)
let sortArray = bidirectionalBubbleSort(randomArray)
console.log("排序树组：" + sortArray)