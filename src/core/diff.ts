import { Patch } from './patch';

export enum DiffType {
	DELETE = -1, INSERT = 1, EQUAL = 0
};

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
