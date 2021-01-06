const hasCycle = function (head) {
  if (!head || !head.next) return false
  while (head) {
    if (head.tag) return true
    head.tag = true;
    head = head.next
  }
  return false
}