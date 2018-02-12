import { ListDiffer } from './list-differ';

const differ = new ListDiffer();
// const s1 = 'ABCABBA';
// const s2 = 'CBABAC';
// const s1 = "Good dog";
// const s2 = "Bad dog";
const s1 = "Apples are a fruit.";
const s2 = "BApples are also fruit.";

const diffs = differ.diffMain(s1, s2);

console.log('***********差异*********');
for(let diff of diffs)
{
	console.log(`${ diff.type }, ${ diff.item }`);	
}
console.log('************************');


// // 打补丁变化
// const newArray = patchApplyArray(s1.split(''), patchs);
// console.log(newArray.join(''));




