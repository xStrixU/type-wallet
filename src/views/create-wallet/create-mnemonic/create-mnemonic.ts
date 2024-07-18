import { clearView, waitForEnter } from '@/common/utils/console';
import { generateMnemonic } from '@/modules/keys/bip39';

export const createMnemonicView = async () => {
	clearView();

	console.log(
		"Now it's time to generate your Secret Recovery Phrase. When you are ready to see it, click ENTER. Be careful and keep it secret!",
	);

	await waitForEnter();
	clearView();

	const mnemonic = generateMnemonic(16);
	const words = mnemonic.split(' ');

	console.log('Your Secret Recovery Phrase:');
	words.forEach((word, i) => {
		console.log(`${i + 1}. ${word}`);
	});

	console.log();
	console.log(
		'This phrase is the ONLY way to recover your wallet. Keep it in save place and do NOT share it with anyone!',
	);
	console.log('If you have saved your phrase, click ENTER to continue');

	await waitForEnter();

	return mnemonic;
};
