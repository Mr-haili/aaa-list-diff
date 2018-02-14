import { myers } from './core';
import { ListDiffer, makeDiffsFromPosList } from './list-differ';

const differ = new ListDiffer();


const s1 = 'a123bc';
const s2 = 'abc';

const posList = myers(s1, s2);
console.log('111', posList);
console.log('222', makeDiffsFromPosList(s1, s2, posList));

console.log('***********差异*********');
const diffs = differ.diffMain(s1, s2);
console.log(diffs.map(diff => diff.toString()).join());
console.log('************************');

// console.log('***********补丁*********');
// const patchs = differ.patchMake(diffs);
// for(let patch of patchs)
// {
// 	console.log(JSON.stringify(patch));
// 	console.log("\n");
// }
// console.log('************************');

// console.log('***********打补丁********');
// const newList = differ.patchApply(s1, patchs);
// const strNew = newList.join('');
// console.log(strNew);
// console.log(strNew === s2);



