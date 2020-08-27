import {
    AVLTree
} from "./Tree/AVLTree.js"

let tree = new AVLTree()
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);

const treeArray = {
    in: [],
    pre: [],
    post: []
}

tree.inOrderTraverse(key => {
    treeArray.in.push(key)
})
tree.preOrderTraverse(key => {
    treeArray.pre.push(key)
})
tree.postOrderTraverse(key => {
    treeArray.post.push(key)
})

console.log(tree.min())
console.log(tree.max())
console.log(treeArray)