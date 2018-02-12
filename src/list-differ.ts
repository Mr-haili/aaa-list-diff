import { myers } from './core/algorithm';
import { makeDiffsFromPosList, Diff, DiffType } from './core/diff';
import { Pos } from './core/types';

export class ListDiffer<T> {
	constructor(readonly isEqFn?: any){ }

  diffMain(oldList: ArrayLike<T>, newList: ArrayLike<T>): Diff<T>[] {
	  // Check for null inputs.
	  if(oldList == null || newList == null) throw "Null inputs. (diff_main)";

	 	const [oldListLen, newListLen] = [oldList.length, newList.length];
	 	let i: number, len: number;

	  // Trim off common prefix (speedup).
	  const commonPrefixLen: number = oldList !== newList ? 
	  	this.diffCommonPrefix(oldList, newList): oldListLen;

	  // Trim off common suffix (speedup).
	  const commonSuffixLen: number = oldListLen !== commonPrefixLen ?
	  	this.diffCommonSuffix(oldList, newList): 0;

	  // Compute the diff on the middle block.
	  const diffs = this._diffCompute(
	  	listSlice(oldList, commonPrefixLen, oldListLen - commonSuffixLen),
	  	listSlice(newList, commonPrefixLen, newListLen - commonSuffixLen)
	  );

	  [i, len] = [0, commonPrefixLen];
	  while(i < len) diffs.unshift(new Diff(oldList[i++]));

	  [i, len] = [oldListLen - commonSuffixLen, oldListLen];
	  console.log(i, len);
	  while(i < len) diffs.push(new Diff(oldList[i++]));

	  return diffs;
	}

	private _diffCompute(oldList: ArrayLike<T>, newList: ArrayLike<T>): Diff<T>[] {
		console.log(oldList, newList);
		const posList: Pos[] = myers(oldList, newList);
		return makeDiffsFromPosList(oldList, newList, posList);;
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
}

function listSlice<T>(list: ArrayLike<T>, begin: number, end: number): ArrayLike<T> {
	return Array.prototype.slice.call(list, begin, end);
}
