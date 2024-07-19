import { confirm, input } from '@inquirer/prompts';

import { createPasswordView } from './create-password/create-password.view';

import { clearView } from '@/common/utils/console';
import { getOrdinalSuffix } from '@/common/utils/number';
import { isWordValid, validateMnemonic } from '@/modules/keys/bip39';

export const recoverWalletView = async () => {
	let i = 0;
	let mnemonic: string;

	do {
		clearView();

		console.log(
			i > 0
				? 'The Secret Recovery Phrase you entered was invalid, try again:'
				: 'To recover your wallet, you need to enter the Secret Recovery Phrase:',
		);

		const words = await getTwelveWords(1);
		const confirmed = await confirm({
			message: 'Do you have a 24-word recovery phrase?',
		});

		if (confirmed) {
			const moreWords = await getTwelveWords(13);

			words.push(...moreWords);
		}

		mnemonic = words.join(' ');
		i++;
	} while (!validateMnemonic(mnemonic));

	await createPasswordView();

	console.log('Wallet recovered!');
};

const getTwelveWords = async (from: number) => {
	const words: string[] = [];

	for (let i = from; i < from + 12; i++) {
		const word = await input({
			message: `Enter the ${getOrdinalSuffix(i)} word`,
			validate: value => isWordValid(value) || 'Invalid word',
		});

		words.push(word);
	}

	return words;
};
