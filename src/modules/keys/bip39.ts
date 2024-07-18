import assert from 'node:assert/strict';

import { wordlist } from './wordlist';

import { bufferToBinary } from '@/common/utils/binary';
import * as crypto from '@/common/utils/crypto';

export const generateMnemonic = (size: number) => {
	assert(
		size >= 16 && size <= 32,
		'Entropy size must be between 16 and 32 bytes',
	);
	assert(size % 4 === 0, 'Entropy size must be a multiple of 4 bytes');

	const entropy = crypto.randomBytes(size);
	const hash = crypto.sha256(entropy);

	const entropyBits = bufferToBinary(entropy);
	const checksumBits = bufferToBinary(hash).slice(0, size / 4);
	const bits = entropyBits + checksumBits;

	const words = Array.from({ length: bits.length / 11 }).map((_, i) => {
		const index = Number.parseInt(bits.slice(i * 11, (i + 1) * 11), 2);

		return wordlist[index];
	});

	return words.join(' ');
};

export const mnemonicToSeed = (mnemonic: string) =>
	crypto.pbkdf2({
		password: mnemonic,
		salt: 'mnemonic',
		iterations: 2048,
		keylen: 64,
		digest: 'sha512',
	});
