import { DiffType, Diff } from './diff';

/**
 * Class representing one patch operation.
 */
export class Patch<T> {
	// static methods
	static make<T>(diffs: Diff<T>[]): Patch<T>[] {
		const oldList: ArrayLike<T> = Diff.recoverOldList(diffs),
			patchs: Patch<T>[] = [], diffsLen = diffs.length,
			PlaceholderDiff: Diff<T> = new Diff(null);
		let slow = 0, fast = 0,
			eqDelOffset = 0, insDelOffset = 0,
			isEatingEq = true, isEqType = true, patch: Patch<T>;

		diffs.push(PlaceholderDiff);
		while(fast < diffsLen)
		{
			isEqType = (diffs[fast].type === DiffType.EQUAL);

			if(isEatingEq === isEqType)
			{
				fast += 1;
				if(isEqType) eqDelOffset += 1;
			}
			else
			{
				if(!isEatingEq)
				{
					patch = new Patch(eqDelOffset, eqDelOffset + insDelOffset,
						diffs.slice(slow, fast));
					patchs.push(patch);

					eqDelOffset += patch.oldLen;
					insDelOffset = (patch.newLen - patch.oldLen);
				}
				slow = fast;
				isEatingEq = !isEatingEq;
			}
		}
		diffs.pop();

		return patchs;
	}

	// apply patchs to oldList
	static apply<T>(oldList: ArrayLike<T>, patchs: Patch<T>[], ItemMap?: any): Array<T> {
		const newList: Array<T> = [];
		let idx = 0, oldStart: number,
			diffIdx: number, diffType: number;

		for(let patch of patchs)
		{
			[oldStart] = [patch.oldStart];
			while(idx < oldStart) newList.push(oldList[idx++]);

			for(let diff of patch.diffs)
			{
				switch(diff.type)
				{
					case DiffType.EQUAL:
						newList.push(diff.item);
						idx += 1;
						break;
					case DiffType.DELETE:
						idx += 1;
						break;
					case DiffType.INSERT:
						newList.push(diff.item);
						break;
					default:
						throw `error patch type: ${ diff.type }`;
				}
			}
		}

		const oldListLen = oldList.length;
		while(idx < oldListLen) newList.push(oldList[idx++]);
		// oldArray.shift();

		return newList;
	}

	// class methods
  readonly oldLen: number;
  readonly newLen: number;

	constructor(
	  readonly oldStart: number,
	  readonly newStart: number,
	  readonly diffs: ReadonlyArray<Diff<T>>
	){
		this.oldLen = Diff.recoverOldList(diffs).length;
		this.newLen = Diff.recoverNewList(diffs).length;
	}

  /**
   * Emmulate GNU diff's format.
   * Header: @@ -382,8 +481,9 @@
   * Indicies are printed as 1-based, not 0-based.
   * @return The GNU diff string.
   */
  // toString(): string {
  // }
}
