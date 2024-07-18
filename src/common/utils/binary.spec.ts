import { describe, expect, it } from 'vitest';

import { bufferToBinary } from './binary';

describe('binary', () => {
	describe('bufferToBinary', () => {
		it.each([
			{
				buffer: Buffer.from([0x4e, 0x2f, 0x1a]),
				binary: '010011100010111100011010',
			},
			{
				buffer: Buffer.from([0x3f, 0x1e, 0x7a, 0xb3, 0x5d]),
				binary: '0011111100011110011110101011001101011101',
			},
			{
				buffer: Buffer.from([0x7b, 0x4c, 0x8d, 0x2a, 0x4e, 0x6f, 0x5b]),
				binary: '01111011010011001000110100101010010011100110111101011011',
			},
		])(`bufferToBinary($buffer) returns $binary`, ({ buffer, binary }) => {
			expect(bufferToBinary(buffer)).toBe(binary);
		});
	});
});
