function merge(left, right) {
  let result = [];

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else if (right[rightIndex] < left[leftIndex]) {
      result.push(right[rightIndex]);
      rightIndex++;
    } else if ((left[leftIndex] = right[rightIndex])) {
      //Prevents duplicate numbers in the sorted result array
      result.push(left[leftIndex]);
      leftIndex++;
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

function mergeSort(array) {
  if (array.length === 1) return array;

  const mid = parseInt(array.length / 2);

  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

//First goes right and then to the leftmost leaf node to get the next smallest element in the tree
function getSuccessor(currentNode) {
  currentNode = currentNode.right;
  while (currentNode !== null && currentNode.left !== null) {
    currentNode = currentNode.left;
  }

  return currentNode;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.array = array;
    this.root = buildTree(mergeSort(array));
  }

  insert(data, root = this.root) {
    if (root === null) return new Node(data);

    if (data < root.data) root.left = this.insert(data, root.left);
    else if (data > root.data) root.right = this.insert(data, root.right);

    return root;
  }

  deleteItem(data, root = this.root) {
    if (root === null) return root;

    if (data < root.data) {
      root.left = this.deleteItem(data, root.left);
    } else if (data > root.data) {
      root.right = this.deleteItem(data, root.right);
    } else {
      /*When one child is null, the other one will be returned,
      if both are null, null will be returned */
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      const successor = getSuccessor(root);
      root.data = successor.data;
      this.deleteItem(successor.data, root.right);
    }

    if (root === this.root) {
      this.root = root;
      return;
    }
    return root;
  }

  find(data, root = this.root) {
    if (data === root.data) return root;

    if (data < root.data) root = root.left;
    else if (data > root.data) root = root.right;

    return this.find(data, root);
  }

  levelOrderIteration(callback) {
    if (callback === null) throw new Error('No callback function provided.');

    let q = [];
    q.push(this.root);

    while (q.length !== 0) {
      callback(q[0]);

      if (q[0].left !== null) q.push(q[0].left);
      if (q[0].right !== null) q.push(q[0].right);

      q.shift();
    }
  }

  levelOrderRecursion(callback, q = [this.root]) {
    if (callback === null) throw new Error('No callback function provided.');
    if (q.length === 0) return;

    callback(q[0]);

    if (q[0].left !== null) q.push(q[0].left);
    if (q[0].right !== null) q.push(q[0].right);

    this.levelOrderRecursion(callback, q.slice(1));
  }

  preOrder(callback, current = this.root) {
    if (callback === null) throw new Error('No callback function provided.');

    if (current === null) return;

    callback(current);
    this.preOrder(callback, current.left);
    this.preOrder(callback, current.right);
  }

  inOrder(callback, current = this.root) {
    if (callback === null) throw new Error('No callback function provided.');

    if (current === null) return;

    this.inOrder(callback, current.left);
    callback(current);
    this.inOrder(callback, current.right);
  }

  postOrder(callback, current = this.root) {
    if (callback === null) throw new Error('No callback function provided.');

    if (current === null) return;

    this.postOrder(callback, current.left);
    this.postOrder(callback, current.right);
    callback(current);
  }

  height(node = this.root) {
    if (node === null) return 0;

    if (node.left === null && node.right === null) {
      return 0;
    }

    let leftHeight = 1 + this.height(node.left);
    let rightHeight = 1 + this.height(node.right);

    return leftHeight >= rightHeight ? leftHeight : rightHeight;
  }

  //distance from node to root of the tree
  depth(node) {
    let current = this.root;
    let depth = 0;

    while (current !== node) {
      depth++;

      if (node.data < current.data) current = current.left;
      else if (node.data > current.data) current = current.right;
    }

    return depth;
  }

  //checking if tree of every node is balanced(height difference is no larger than 1)
  isBalanced(node = this.root) {
    if (node === null) return true;

    let heightDifference = this.height(node.left) - this.height(node.right);

    if (Math.abs(heightDifference) > 1) return false;

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    this.root = buildTree(mergeSort(this.getAllItems()));
  }

  getAllItems(node = this.root) {
    if (node === null) return [];

    let array = [];
    array.push(node.data);

    return array.concat(
      this.getAllItems(node.left),
      this.getAllItems(node.right)
    );
  }
}

const buildTree = function buildBalancedBinarySearchTree(array) {
  if (!array.length) return null;

  const mid = parseInt(array.length / 2);

  let root = new Node(array[mid]);
  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1));

  return root;
};
