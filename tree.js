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

const prettyPrint = (node, prefix = '', isLeft = true) => {
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

class Tree {
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
}

const buildTree = function buildBalancedBinarySearchTree(array) {
  if (!array.length) return null;

  const mid = parseInt(array.length / 2);

  let root = new Node(array[mid]);
  root.left = buildTree(array.slice(0, mid));
  root.right = buildTree(array.slice(mid + 1));

  return root;
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// tree.insert(21);
// tree.insert(0);
// tree.insert(60);
tree.deleteItem(4);
prettyPrint(tree.root);
