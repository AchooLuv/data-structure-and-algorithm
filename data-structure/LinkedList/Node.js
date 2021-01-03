export class Node {
  constructor(value) {
    this.value = value;
    this.next = undefined;
  }
}
export class DoublyNode {
  constructor(value,next,prev){
    super(value,next);
    this.prev = prev;
  }
} 