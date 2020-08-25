import {
    Compare,
    defaultCompare
} from "../util.js"
import Node from "BinarySearchTree.js"

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}

export class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }
    // 获取节点高
    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    // 获取节点平衡因子
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    // LL旋转：向右的单旋转
    rotationLL(node) {
        let tmp = node.left //node的左孩子取代node
        node.left = tmp.right //node左孩子的右孩子成为node的左孩子
        tmp.right = node //node成为左孩子的右孩子
        return tmp
    }
    // RR旋转：向左的单旋转
    rotationRR(node) {
        let tmp = node.right //node的右孩子取代node
        node.right = tmp.left //node的右孩子的左孩子成为node的右孩子
        tmp.left = node //node成为右孩子的左孩子
        return tmp
    }
    // LR旋转：向右的双旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left) //先向左单旋
        return this.rotationLL(node) //再向右单旋
    }
    // RL旋转：向左的双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right) //先向右单旋
        return this.rotationRR(node) //再向左单旋
    }

    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        if (node == null) {
            return new Node(key)
        } else if (this.compareFn(node.key, key) === Compare.BIGGER_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(node.key, key) === Compare.LESS_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node //已存在，重复节点
        }
        // AVLTree自平衡
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(node.left.key, key) === Compare.BIGGER_THAN) {
                // 插入节点在node的左孩子的左子树上，进行LL旋转
                node = this.rotationLL(node)
            } else {
                // 插入节点在node的左孩子的右子树上，进行LR旋转
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(node.right.key, key) === Compare.LESS_THAN) {
                // 插入节点在node的右孩子的右子树上，进行RR旋转
                node = this.rotationRR(node)
            } else {
                // 插入节点在node的右孩子的左子树上，进行RL旋转
                return this.rotationRL(node)
            }
        }
        return node
    }

    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        node = super.removeNode(node, key)
        if (node == null) {
            return node
        }
        const balanceFactor = this.getBalanceFactor(node)
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            if (balanceFactorLeft === BalanceFactor.BALANCED || BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node)
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node)
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.right)
            if (balanceFactorRight === BalanceFactor.BALANCED || BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node)
            }
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node)
            }
        }
        return node
    }
}