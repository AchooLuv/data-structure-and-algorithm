import {
    Compare,
    defaultCompare
} from "../util.js"
import Node from "BinarySearchTree.js"

const Color = {
    RED: 1,
    BLACK: -1
}

class RedBlackNode extends Node {
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
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Color.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            // 修复红黑树
            this.fixTreeProperties(newNode)
        }
    }
    insertNode(node, key) {
        if (this.root == null) return false
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            if (node.left == null) {
                node.left = new RedBlackTree(key)
                node.left.parent = node
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        }
        if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            if (node.right == null) {
                node.right = new RedBlackTree(key)
                node.right.parent = node
                return node.right
            } else {
                return this.insertNode(node.right, key)
            }
        }
    }
    fixTreeProperties(node){
        
    }
}