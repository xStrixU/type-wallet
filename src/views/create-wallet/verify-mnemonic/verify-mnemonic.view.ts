import { input } from '@inquirer/prompts';

import { clearView } from '@/common/utils/console';

export const verifyMnemonicView = async (mnemonic: string) => {
	clearView();

	const words = mnemonic.split(' ');
	const indexes = [0, 11];

	console.log("Let's see if you have kept your Secret Recovery Phrase");

	for (const index of indexes) {
		await input({
			message: `Which word is in the ${index + 1}th position?`,
			validate: word => (word === words[index] ? true : 'Invalid word!'),
		});
	}
};
