import { Pos } from '../types';

const Towards: ReadonlyArray<Pos> = [{x: 1, y: 0}, {x: 0, y: 1}];

export function myers<T>(srcList: ArrayLike<T>, tarList: ArrayLike<T>): Pos[] {
	let round: { [index: number]: Pos } = {};
	let nextRound: { [index: number]: Pos } = {};
	const beginPos = { x: 0, y: 0 };

	round[0] = beginPos;
	portal(srcList, tarList, beginPos);

	// 进行一次过滤
	let editDistance = srcList.length + tarList.length;
	let pos: Pos, nextPos: Pos, idx: number, k: number, x: number, y: number, tmp: Pos;
	while(editDistance--)
	{
		for(let idx = -tarList.length; idx <= srcList.length; idx++)
		{
			pos = round[idx];
			if(!pos) continue;
			if(pos.x === srcList.length && pos.y === tarList.length)
			{
				const posList = [];
				while(pos)
				{
					posList.unshift(pos);
					[pos, tmp] = [pos.prePos, pos];
					delete tmp.prePos;
				}
				return posList;
			}

			[x, y] = [pos.x, pos.y];
			k = x - y;

			nextPos = portal(srcList, tarList, { x: x + 1, y, prePos: pos });
			nextRound[k + 1] = getBetterPos(nextRound[k], nextPos);

			nextPos = portal(srcList, tarList, { x, y: y + 1, prePos: pos });
			nextRound[k - 1] = getBetterPos(nextRound[k], nextPos);
		}

		round = nextRound;
		nextRound = { };
	}
}

// 当k值相同的时候, 我们需要分辨出更好的落脚点
function getBetterPos(posA: Pos | undefined, posB: Pos){
	if(!posA) return posB;
	if(posA.x !== posB.x) posA.x > posB.x ? posA : posB;
	return posA.y > posB.y ? posA : posB;
}

// 传送
function portal<T>(srcList: ArrayLike<T>, tarList: ArrayLike<T>, pos: Pos): Pos {
	let [x, y] = [pos.x, pos.y];
	while(srcList[x] && tarList[y] && srcList[x] === tarList[y])
	{
		x += 1;
		y += 1;
		pos = { x, y, prePos: pos };
	}
	return pos;
}
