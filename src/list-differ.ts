import { DiffType, Diff, Patch, myers, Pos } from './core';

export class ListDiffer<T> {
	constructor(readonly isEqFn?: any){ }

  diffMain(oldList: ArrayLike<T>, newList: ArrayLike<T>): Diff<T>[] {
	  // Check for null inputs.
	  if(oldList == null || newList == null) throw "Null inputs. (diff_main)";

	 	const [oldListLen, newListLen] = [oldList.length, newList.length];
	 	let i: number, len: number;

	  // Trim off common prefix (speedup).
	  const commonPrefixLen: number = oldList !== newList ? 
	  	this.diffCommonPrefix(oldList, newList) : oldListLen;

	  // Trim off common suffix (speedup).
	  const commonSuffixLen: number = oldListLen !== commonPrefixLen ?
	  	this.diffCommonSuffix(oldList, newList) : 0;

	  // Compute the diff on the middle block.
	  const diffs = this._diffCompute(
	  	listSlice(oldList, commonPrefixLen, oldListLen - commonSuffixLen),
	  	listSlice(newList, commonPrefixLen, newListLen - commonSuffixLen)
	  );

	  [i, len] = [0, commonPrefixLen];
	  while(i < len) 
	  {
	  	diffs.unshift(new Diff(oldList[len - i - 1]));
	  	i += 1;
	  }

	  [i, len] = [oldListLen - commonSuffixLen, oldListLen];
	  while(i < len) diffs.push(new Diff(oldList[i++]));

	  return diffs;
	}

	private _diffCompute(oldList: ArrayLike<T>, newList: ArrayLike<T>): Diff<T>[] {
		const posList: Pos[] = myers(oldList, newList);
		return makeDiffsFromPosList(oldList, newList, posList);
	}

	diffCommonPrefix(oldList: ArrayLike<T>, newList: ArrayLike<T>): number {
		const [oldLen, newLen] = [oldList.length, newList.length];		
		const len = oldLen > newLen ? newLen : oldLen;
		let i = 0;
		for(; i < len; i++) if(oldList[i] !== newList[i]) break;
		return i;
	}

	diffCommonSuffix(oldList: ArrayLike<T>, newList: ArrayLike<T>): number {
		const [oldLen, newLen] = [oldList.length, newList.length];
		const len = oldLen > newLen ? newLen : oldLen;
		let i = 1;
		for(; i <= len; i++) if(oldList[oldLen - i] !== newList[newLen - i]) break;
		return i - 1;
	}

	patchMake(diffs: Diff<T>[]): Patch<T>[] {
		return Patch.make(diffs);
	}

	patchApply(oldList: ArrayLike<T>, patchs: Patch<T>[]): T[] {
		return Patch.apply(oldList, patchs);
	}
}

function listSlice<T>(list: ArrayLike<T>, begin: number, end: number): ArrayLike<T> {
	return Array.prototype.slice.call(list, begin, end);
}

export function makeDiffsFromPosList<T>(
	oldList: ArrayLike<T>,
	newList: ArrayLike<T>, 
	posList: Pos[]
): Diff<T>[] {
	const diffs: Diff<T>[] = [];	
	let diff: Diff<T>, x: number, y: number, preX: number, preY: number;
	for(let i = 1, len = posList.length; i < len; i++)
	{
		[x, y, preX, preY] = [posList[i].x, posList[i].y, posList[i - 1].x, posList[i - 1].y];
		if(y === preY) // delete
		{
			diff = new Diff(oldList[x - 1], DiffType.DELETE);
		}
		else if(x === preX) // insert
		{
			diff = new Diff(newList[y - 1], DiffType.INSERT);
		}
		else // equal
		{
			diff = new Diff(oldList[x - 1]);
		}
		diffs.push(diff);
	}
	return diffs;
}
