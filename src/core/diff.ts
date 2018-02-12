import { Pos } from './types';

export enum DiffType {
  DELETE = -1, INSERT = 1, EQUAL = 0
};

const DiffTypeToStr: { [key: number]: string } = {
  '-1': 'DEL',
  '0': 'EQ',
  '1': 'INS'
}

export class Diff<T> {
  constructor(
    readonly item: T,
    readonly type: DiffType = DiffType.EQUAL
  ){ }

  toString(): string {
    return "(" + DiffTypeToStr[this.type] + ",\"" + this.item.toString() + "\")";
  }
}

export function makeDiffsFromPosList<T>(
	oldList: ArrayLike<T>,
	newList: ArrayLike<T>, 
	posList: Pos[]
): Diff<T>[] {
	const diffs: Diff<T>[] = [];	
	let x, y, preX, preY, type;
	for(let i = 1, len = posList.length; i < len; i++)
	{
		[x, y, preX, preY] = [posList[i].x, posList[i].y, posList[i - 1].x, posList[i - 1].y];
		let diff: Diff<T>;	

		if(y === preY) // delete
		{
			diff = { type: DiffType.DELETE, item: oldList[x - 1] };
		}
		else if(x === preX) // insert
		{
			diff = { type: DiffType.INSERT, item: newList[y - 1] };
		}
		else // equal
		{
			diff = { type: DiffType.EQUAL, item: oldList[x - 1] };
		}
		diffs.push(diff);
	}
	return diffs;
}
