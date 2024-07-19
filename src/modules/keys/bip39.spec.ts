import { describe, expect, it, vi } from 'vitest';

import {
	generateMnemonic,
	isWordValid,
	mnemonicToSeed,
	validateMnemonic,
} from './bip39';

import * as crypto from '@/common/utils/crypto';

vi.mock('@/common/utils/crypto', async importOriginal => {
	const actual = await importOriginal<typeof crypto>();

	return {
		...actual,
		randomBytes: vi.fn(),
	};
});

describe('bip39', () => {
	describe('generateMnemonic', () => {
		it.each([
			{
				size: 16,
				entropy: '444f2f67c17ef9e72946a8ba92467025',
				mnemonic:
					'dust just supreme load usage vicious pink steak ritual mutual orchard enlist',
			},
			{
				size: 20,
				entropy: '85aecd6e85db3daad87aacb5f944627c07243912',
				mnemonic:
					'mad island forum arm record step giggle few remove sketch blush way inch broken entire',
			},
			{
				size: 24,
				entropy: 'a0259fa180eef9623c8506fa8a02520bade55161063a7c65',
				mnemonic:
					'parent coconut trick achieve usage rain velvet patch whisper exotic nest blanket tattoo post lottery shrug ladder collect',
			},
		])(
			`generateMnemonic() with entropy $entropy returns $mnemonic`,
			({ size, entropy, mnemonic }) => {
				vi.mocked(crypto.randomBytes).mockReturnValue(
					Buffer.from(entropy, 'hex'),
				);

				expect(generateMnemonic(size)).toBe(mnemonic);
			},
		);
	});

	describe('mnemonicToSeed', () => {
		it.each([
			{
				mnemonic:
					'valid outside mail post uphold parade object alien excuse escape track melody',
				seed: 'cc805fcc501fbe42abec8a740fc28f5f856bf6eb0ebc8bc7156e42c15beec1b136cbde08c79a90f743d0c973b117e353cad43040a52b59d92676f0571be6a4f9',
			},
			{
				mnemonic:
					'anger sad bargain blue lounge later hard child bracket sugar opera whisper pitch glimpse movie',
				seed: 'f392ab2a08f5591b0fb2372e24c3f4914e7836bb3cb068ca3e3cc1e57286e5278fb62462bdd34a7d63f1fc120257559c79166d8fc33e0237a9a801eb44b02432',
			},
			{
				mnemonic:
					'spatial pig gaze stuff bread exhaust alone mind army into rural pledge few scorpion arrive protect bullet sunset',
				seed: 'ed04e94abe6724c186fee08af50865bbd7650023b1524f79d892a3567cb57c0a27e24dccfa02c956802a3ba088f4efae40c18934957c58d5521215c4e9b55d30',
			},
		])(
			`mnemonicToSeed($mnemonic) returns $seed`,
			async ({ mnemonic, seed }) => {
				const calculatedSeed = await mnemonicToSeed(mnemonic);

				expect(calculatedSeed.toString('hex')).toBe(seed);
			},
		);
	});

	describe('validateMnemonic', () => {
		it.each([
			{
				mnemonic:
					'romance elder reform melt catch drill horror error obscure during review master',
				result: true,
			},
			{
				mnemonic:
					'opera cactus rough quiz client muffin busy together update goat battle skirt',
				result: true,
			},
			{
				mnemonic:
					'shoulder garage supply half minute ladder since school want gentle sport tiny',
				result: false,
			},
			{
				mnemonic: 'vendor tiger saddle dilemma bitter',
				result: false,
			},
			{
				mnemonic:
					'weapon shine catch blur inch humor risk okay derive confirm cup space again expose before',
				result: true,
			},
		])(
			`validateMnemonic($mnemonic) returns $result`,
			({ mnemonic, result }) => {
				expect(validateMnemonic(mnemonic)).toBe(result);
			},
		);
	});

	describe('isWordValid', () => {
		it.each([
			{ word: 'sword', result: true },
			{ word: 'weak', result: false },
			{ word: 'hello', result: true },
			{ word: 'hi', result: false },
		])(`isWordValid($word) returns $result`, ({ word, result }) => {
			expect(isWordValid(word)).toBe(result);
		});
	});
});
