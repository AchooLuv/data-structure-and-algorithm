import {
    selectionSort
} from "./Sort/selectionSort.js"

const randomArray = [13, 3, 6, 1, 9, 23,17]
console.log("随机数组：" + randomArray)
let sortArray = selectionSort(randomArray)
console.log("排序树组：" + sortArray)