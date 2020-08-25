import {
    Compare,
    defaultCompare
} from "../util.js"

 export class Node {
    constructor(key) {
        this.key = key
        this.left = null;
        this.right = null
    }
}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn
        this.root = null
    }

    insert(key) {
        if (this.root == null) {
            this.root = new Node(key)
        }
        this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            if (node.left == null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            if (node.right == null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        if (node == null) {
            return null
        }
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 无左右子树或左右子节点
            if (node.left == null && node.right == null) {
                node = null
                return node
            }
            // 只有右子树或右子节点
            if (node.left == null) {
                node = node.right
                return node
                // 只有左子树或左子节点
            } else if (node.right == null) {
                node = node.left
                return node
            }
            // 左右子节点或左右子树均存在
            const aux = this.minNode(node.right)
            node.key = aux.key
            node.right = this.removeNode(node.right, aux.key)
            return node
        }
    }

    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node == null) {
            return false
        }
        if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }

    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        let current = node
        while (current != null && current.right != null) {
            current = current.right
        }
        return current
    }

    // 中序遍历
    inOrderTraverse(node, cb) {
        if (node.root != null) {
            this.inOrderTraverse(node.left, cb)
            cb(node.key)
            this.inOrderTraverse(node.right, cb)
        }
    }
    // 先序遍历
    preOrderTraverse(node, cb) {
        if (node.root != null) {
            cb(node.key)
            this.preOrderTraverse(node.left, cb)
            this.preOrderTraverse(node.right, cb)
        }
    }
    // 后序遍历
    postOrderTraverse(node, cb) {
        if (node.root != null) {
            this.postOrderTraverse(node.left, key)
            this.postOrderTraverse(node.right, key)
            cb(node.key)
        }
    }
}