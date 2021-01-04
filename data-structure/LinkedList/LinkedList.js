import defaultEquals from "../util.js";
import Node from "./Node.js";

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }
  indexOf(value) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(value, current.element)) {
        return i;
      }
      current = current.next;
    }
  }
  getElementAt(index) {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      for (let i = 0; i < index && current != null; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }
  // 链尾添加值
  push(value) {
    const node = new Node(value);
    let current;
    if (this.head == null) {
      // 链为空
      this.head = node;
    } else {
      current = this.getElementAt(this.count - 1);
      current.next = node;
    }
    this.count++;
  }
  // 任意位置插入
  insert(value, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(value);
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        const previous = this.getElementAt(index - 1);
        const current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }
  // 删除链中指定位置的值
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      // 越界检查
      let current = this.head;
      if (index === 0) {
        // 删除链头
        this.head = current.next;
      } else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
  remove(value) {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  getHead() {
    return this.head;
  }
  toString() {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.count && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
