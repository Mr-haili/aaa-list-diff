import { Pos } from './types';

export enum DiffType {
  DELETE = -1, INSERT = 1, EQUAL = 0
};

const DiffTypeToStr: { [key: number]: string } = {
  '-1': 'd',
  '0': 'e',
  '1': 'i'
}

export class Diff<T> {
	static recoverOldList<T>(diffs: ReadonlyArray<Diff<T>>): T[] {
		return this._filter(diffs, DiffType.INSERT);
	}

	static recoverNewList<T>(diffs: ReadonlyArray<Diff<T>>): T[] {
		return this._filter(diffs, DiffType.DELETE);
	}

	private static _filter<T>(
		diffs: ReadonlyArray<Diff<T>>, 
		filterType: DiffType.DELETE | DiffType.INSERT
	): T[] {
		return diffs.filter(diff => diff.type !== filterType)
			.map(diff => diff.item);
	}

  constructor(
    readonly item: T,
    readonly type: DiffType = DiffType.EQUAL
  ){ }

  toString(): string {
    return "(" + this.type + ",\"" + this.item.toString() + "\")";
  }
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
