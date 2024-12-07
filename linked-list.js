function LinkedList() {
  let head = null;
  let tail = null;
  let size = 0;

  const append = (value) => {
    const newNode = Node();
    newNode.value = value;
    if (head === null) {
      head = newNode;
      tail = newNode;
    } else {
      tail.nextNode = newNode;
      tail = newNode;
    }
    size++;
  };

  const prepend = (value) => {
    const newNode = Node();
    newNode.value = value;
    if (head === null) {
      head = newNode;
      tail = newNode;
    } else {
      newNode.nextNode = head;
      head = newNode;
    }
    size++;
  };

  const getSize = () => {
    return size;
  };

  const getHead = () => {
    return head;
  };

  const getTail = () => {
    return tail;
  };

  const at = (index) => {
    if (index < 0 || index >= size) {
      console.log(`No node at index: ${index}, size of list: ${getSize()}`);
      return;
    } else {
      let current = head;
      for (let i = 0; i < index; i++) {
        current = current.nextNode;
      }
      //   console.log(current);
      return current;
    }
  };

  const pop = () => {
    if (size === 0) {
      console.log("Cannot pop from an empty list");
      return;
    }
    size--;
    if (size === 0) {
      head = null;
      tail = null;
    } else {
      tail = at(size - 1);
      tail.nextNode = null;
    }
  };

  const contains = (value) => {
    let current = head;
    while (current) {
      if (current.value === value) return true;

      current = current.nextNode;
    }
    return false;
  };

  const find = (value) => {
    // returns index of node containing value, else null
    let current = head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;

      current = current.nextNode;
      index++;
    }
    return null;
  };

  const toString = () => {
    // prints list to console
    let str = "";
    let current = head;
    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    str += "null";
    console.log(str);
  };

  const insertAt = (value, index) => {
    if (index < 0 || index > size) {
      console.log(
        `Cannot insert value: ${value} at index: ${index}. List size = ${size}`
      );
      return;
    }
    if (index === 0) {
      prepend(value);
    } else if (index === size) {
      append(value);
    } else {
      const newNode = Node();
      newNode.value = value;
      let previous = at(index - 1);
      newNode.nextNode = previous.nextNode;
      previous.nextNode = newNode;
      size++;
    }
  };

  const removeAt = (index) => {
    if (index < 0 || index >= size) {
      console.log(`Cannot remove at index: ${index}. List size = ${size}`);
      return;
    }
    if (index === size - 1) {
      pop();
    } else if (index === 0) {
      head = head.nextNode;
      size--;
    } else {
      let previous = at(index - 1);
      previous.nextNode = previous.nextNode.nextNode;
      size--;
    }
  };

  return {
    append,
    prepend,
    getSize,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function Node() {
  return { value: null, nextNode: null };
}

const list = LinkedList();
list.append(1);
list.append(3);
list.prepend(2);
list.append(4);
list.toString(); // Expected: ( 2 ) -> ( 1 ) -> ( 3 ) -> ( 4 ) -> null
console.log(list.getSize()); // Expected: 4

list.pop(); // Removes 4
list.pop(); // Removes 3
console.log(list.getSize()); // Expected: 2
list.toString(); // Expected: ( 2 ) -> ( 1 ) -> null
console.log(list.getHead()); // Expected: { value: 2, nextNode: { value: 1, nextNode: null } }

console.log(list.find(2)); // Expected: 0
console.log(list.find(3)); // Expected: null

// Inserting at valid and invalid positions
list.insertAt(12, 2); // Inserting at position 2 (tail)
list.insertAt(-1, 1); // Inserting at position (1)
list.toString(); // Expected: ( 2 ) ->  ( -1 ) -> ( 1 ) -> ( 12 ) -> null

// Removing nodes
list.removeAt(1); // Removing node at index 1
list.toString(); // Expected: ( 2 ) -> ( 1 ) -> ( 12 ) -> null
list.removeAt(0); // Removing node at index 0 (head)
list.toString(); // Expected: ( 1 ) -> ( 12 ) -> null
list.removeAt(5); // Invalid index, should log error
