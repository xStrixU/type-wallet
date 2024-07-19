import { describe, expect, it } from 'vitest';

import { getOrdinalSuffix } from './number';

describe('number', () => {
	describe('getOrdinalSuffix', () => {
		it.each([
			{ number: 1, result: '1st' },
			{ number: 2, result: '2nd' },
			{ number: 3, result: '3rd' },
			{ number: 4, result: '4th' },
			{ number: 8, result: '8th' },
			{ number: 11, result: '11th' },
			{ number: 12, result: '12th' },
			{ number: 13, result: '13th' },
			{ number: 100, result: '100th' },
			{ number: 101, result: '101st' },
			{ number: 102, result: '102nd' },
			{ number: 103, result: '103rd' },
			{ number: 111, result: '111th' },
			{ number: 112, result: '112th' },
			{ number: 113, result: '113th' },
			{ number: 124, result: '124th' },
		])(`getOrdinalSuffix($number) returns $result`, ({ number, result }) => {
			expect(getOrdinalSuffix(number)).toBe(result);
		});
	});
});
