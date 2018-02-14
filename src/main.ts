import { ListDiffer } from './list-differ';

const differ = new ListDiffer();
// const s1 = 'ABCABBA';
// const s2 = 'CBABAC';
// const s1 = "Good dog";
// const s2 = "Bad dog";
const s1 = `
I am the very model of a modern Major-General,
I've information vegetable, animal, and mineral,
I know the kings of England, and I quote the fights historical,
From Marathon to Waterloo, in order categorical.`;

const s2 = `
I am the very model of a cartoon individual,
My animation's comical, unusual, and whimsical,
I'm quite adept at funny gags, comedic theory I have read,
From wicked puns and stupid jokes to anvils that drop on your head.`;

console.log('***********差异*********');
const diffs = differ.diffMain(s1, s2);
console.log(diffs.map(diff => diff.toString()).join());
console.log('************************');

console.log('***********补丁*********');
const patchs = differ.patchMake(diffs);
for(let patch of patchs)
{
	console.log(JSON.stringify(patch));
	console.log("\n");
}
console.log('************************');

console.log('***********打补丁********');
const newList = differ.patchApply(s1, patchs);
const strNew = newList.join('');
console.log(strNew);
console.log(strNew === s2);



