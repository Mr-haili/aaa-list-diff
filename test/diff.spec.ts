import { Diff, DiffType } from '../src/core/';
import { ListDiffer } from '../src/list-differ';

const differ = new ListDiffer();

function formatDiffs<T>(diffs: Diff<T>[]): any[] {
	const list = []
	for(let diff of diffs) list.push([diff.type, diff.item]);
	return list
}

function diff(s1: string, s2: string): any[] {
	const diffs = differ.diffMain(s1, s2);
	return formatDiffs(diffs);
}

describe('Diff main', function(){
	it('Perform a trivial diff.', function() {
		let result: any[];

		// Null case.
		result = [];
		expect(diff('', '')).toEqual(result);

		// Equality.
		result = [[0, 'a'], [0, 'b'], [0, 'c']];
		expect(diff('abc', 'abc')).toEqual(result);

		// Simple insertion.
		result = [[0, 'a'], [0, 'b'], [1, '1'], [1, '2'], [1, '3'], [0, 'c']];
		expect(diff('abc', 'ab123c')).toEqual(result);

		// Simple deletion.
		result = [[0, 'a'], [-1, '1'], [-1, '2'], [-1, '3'], [0, 'b'], [0, 'c']];
		expect(diff('a123bc', 'abc')).toEqual(result);

		// Two insertions.
		result = [[0, 'a'], [1, '1'], [1, '2'], [1, '3'], [0, 'b'], [1, '4'], [1, '5'], [1, '6'], [0, 'c']];
		expect(diff('abc', 'a123b456c')).toEqual(result);

		// Two deletions.
		result = [[0, 'a'], [-1, '1'], [-1, '2'], [-1, '3'], [0, 'b'], [-1, '4'], [-1, '5'], [-1, '6'], [0, 'c']];
		expect(diff('a123b456c', 'abc')).toEqual(result);
	});
});