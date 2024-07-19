import assert from 'node:assert/strict';

import { wordlist } from './wordlist';

import { bitsToBuffer, bufferToBits } from '@/common/utils/binary';
import * as crypto from '@/common/utils/crypto';

const normalize = (value: string) => value.normalize('NFKD');

export const generateMnemonic = (size: number) => {
	assert(
		size >= 16 && size <= 32,
		'Entropy size must be between 16 and 32 bytes',
	);
	assert(size % 4 === 0, 'Entropy size must be a multiple of 4 bytes');

	const entropy = crypto.randomBytes(size);
	const hash = crypto.sha256(entropy);

	const entropyBits = bufferToBits(entropy);
	const checksumBits = bufferToBits(hash).slice(0, size / 4);
	const bits = entropyBits + checksumBits;

	const words = Array.from({ length: bits.length / 11 }).map((_, i) => {
		const index = Number.parseInt(bits.slice(i * 11, (i + 1) * 11), 2);

		return wordlist[index];
	});

	return words.join(' ');
};

export const mnemonicToSeed = (mnemonic: string) => {
	return crypto.pbkdf2({
		password: normalize(mnemonic),
		salt: 'mnemonic',
		iterations: 2048,
		keylen: 64,
		digest: 'sha512',
	});
};

export const validateMnemonic = (mnemonic: string) => {
	const words = normalize(mnemonic).split(' ');

	if (words.length % 3 !== 0) {
		return false;
	}

	let bits = '';

	for (const word of words) {
		const index = wordlist.indexOf(word);

		if (index === -1) {
			return false;
		}

		bits += index.toString(2).padStart(11, '0');
	}

	const entropyBits = bits.slice(0, -words.length / 3);
	const checksumBits = bits.slice(-words.length / 3);

	const entropy = bitsToBuffer(entropyBits);
	const hash = crypto.sha256(entropy);
	const hashChecksumBits = bufferToBits(hash).slice(0, words.length / 3);

	return checksumBits === hashChecksumBits;
};

export const isWordValid = (word: string) => wordlist.includes(word);
