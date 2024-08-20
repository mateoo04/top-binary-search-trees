import { Tree, prettyPrint } from './tree.js';

const generateArray = function generateArrayOfRandomNumbers(quantity) {
  let array = [];

  for (let i = 0; i < quantity; i++) {
    array.push(parseInt(Math.random() * 100));
  }

  return array;
};

const generatedArray = generateArray(20);

const tree = new Tree(generatedArray);

prettyPrint(tree.root);

const callback = (item) => {
  console.log(item.data);
};

tree.insert(140);
tree.insert(177);
tree.insert(201);
tree.insert(300);

console.log('after insertation:');
prettyPrint(tree.root);

tree.rebalance();
console.log('after rebalance:');
prettyPrint(tree.root);
