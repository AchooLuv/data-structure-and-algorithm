import {
    Compare,
    defaultCompare
} from "../util.js"
import Node from "BinarySearchTree.js"

const Color = {
    RED: 1,
    BLACK: -1
}

class RebBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Color.RED
        this.parent = null
    }
    idRed() {
        return this.color === Color.RED
    }
}

export class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
}