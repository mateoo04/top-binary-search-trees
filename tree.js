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

  insert(value) {
    let currentNode = this.root;
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

prettyPrint(tree.root);
