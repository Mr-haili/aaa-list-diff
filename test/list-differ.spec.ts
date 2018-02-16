import { ListDiffer, Diff, Patch } from '../src';

const differ = new ListDiffer();

describe('ListDiffer patchMake', function(){
	let s1 = 'abcde';
	let s2 = 'acdef';
	let expectedPatchs = [
		new Patch(1, 1, [ new Diff('b', -1) ]),
		new Patch(5, 4, [ new Diff('f', 1) ])
	];

	it('patchMake from oldList and newList', function() {
		const patchs = differ.patchMake(s1, s2);
		const expectedPatchs = [
			new Patch(1, 1, [ new Diff('b', -1) ]),
			new Patch(5, 4, [ new Diff('f', 1) ])
		];
		expect(patchs).toEqual(expectedPatchs);
	});

	it('patchMake from diffs', function() {
		const diffs = differ.diffMain(s1, s2);
		const patchs = differ.patchMake(diffs);
		expect(patchs).toEqual(expectedPatchs);
	});
});