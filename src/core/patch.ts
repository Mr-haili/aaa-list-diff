
// export function patchApply(oldArray: Array<any>, diffs: Diff<any>[], ItemMap?: any): Array<any> {
// 	const newArray: Array<any> = [];
// 	let idx: number = 0, diffIdx: number, diffType: number;
// 	for(let diff of diffs)
// 	{
// 		[diffIdx, diffType] = [diff.idx, diff.type];
// 		while(idx < diffIdx) newArray.push(oldArray[idx++]);
// 		switch(diffType)
// 		{
// 			case DiffType.EQUAL:
// 				newArray.push(oldArray[idx]);
// 				idx += 1;
// 				break;
// 			case DiffType.DELETE:
// 				idx += 1;
// 				break;
// 			case DiffType.INSERT:
// 				newArray.push(diff.item);
// 				break;
// 			default:
// 				throw `error patch type: ${ diffType }`;
// 		}
// 	}
// 	oldArray.shift();
// 	return newArray;
// }
