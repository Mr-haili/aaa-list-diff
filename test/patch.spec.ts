/* the test case is copied from https://github.com/google/diff-match-patch */
import { Diff, DiffType, Patch } from '../src/core/';
import { ListDiffer } from '../src/list-differ';

const differ = new ListDiffer();

// diff s1 and s2, and patch s1
function diffPatchApply(s1: string, s2: string, s3?: string): string {
	const diffs = differ.diffMain(s1, s2);
	const patchs = differ.patchMake(diffs);
	if(!s3) s3 = s1;
	return differ.patchApply(patchs, s3).join('');
}

describe('patch apply', function(){
	it('after patch the oldList must equal newList.', function() {
		let s1: string, s2: string, s3: string, s4: string;

		// Null case.
		s1 = '';
		s2 = '';
		s3 = 'Hello world.';
		s4 = 'Hello world.';
		expect(diffPatchApply(s1, s2, s3)).toEqual(s4);

		// Exact match.
		s1 = 'The quick brown fox jumps over the lazy dog.';
		s2 = 'That quick brown fox jumped over a lazy dog.';
		s3 = 'The quick brown fox jumps over the lazy dog.';
		s4 = 'That quick brown fox jumped over a lazy dog.';
		expect(diffPatchApply(s1, s2, s3)).toEqual(s4);

		// Big delete, small change.
		s1 = 'x1234567890123456789012345678901234567890123456789012345678901234567890y';
		s2 = 'xabcy';
		s3 = 'x123456789012345678901234567890-----++++++++++-----12345678901234567890y';
		s4 = 'xabcy';
		expect(diffPatchApply(s1, s2, s3)).toEqual(s4);

		// Big delete, big change 1.
		s1 = 'x1234567890123456789012345678901234567890123456789012345678901234567890y',
		s2 = 'xabcy';
		s3 = 'x12345678901234567890---------------++++++++++-----12345678901234567890y';
		s4 = 'xabcy';
		expect(diffPatchApply(s1, s2, s3)).toEqual(s4);

		expect(diffPatchApply('', 'test')).toEqual('test');
		expect(diffPatchApply('test', '')).toEqual('');

		s1 = 'The quick brown fox jumps over the lazy dog.';
		s2 = 'Woof';
		expect(diffPatchApply(s1, s2)).toEqual(s2);

		s1 = 'XY';
		s2 = 'XtestY';
		expect(diffPatchApply(s1, s2)).toEqual(s2);

		s1 = 'y';
		s2 = 'y123';
		expect(diffPatchApply(s1, s2)).toEqual(s2);

		// some more test cases
		s1 = 'ABCABBA';
		s2 = 'CBABAC';
		expect(diffPatchApply(s1, s2)).toEqual(s2);

		s1 = "Good dog";
		s2 = "Bad dog";
		expect(diffPatchApply(s1, s2)).toEqual(s2);

		s1 = `
			I am the very model of a modern Major-General,
			I've information vegetable, animal, and mineral,
			I know the kings of England, and I quote the fights historical,
			From Marathon to Waterloo, in order categorical.
		`;
		s2 = `
			I am the very model of a cartoon individual,
			My animation's comical, unusual, and whimsical,
			I'm quite adept at funny gags, comedic theory I have read,
			From wicked puns and stupid jokes to anvils that drop on your head.
		`;
		expect(diffPatchApply(s1, s2)).toEqual(s2);
	});
});