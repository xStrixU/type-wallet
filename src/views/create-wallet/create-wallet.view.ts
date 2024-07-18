import { createMnemonicView } from './create-mnemonic/create-mnemonic';
import { createPasswordView } from './create-password/create-password.view';
import { verifyMnemonicView } from './verify-mnemonic/verify-mnemonic.view';

export const createWalletView = async () => {
	await createPasswordView();
	const mnemonic = await createMnemonicView();

	await verifyMnemonicView(mnemonic);

	console.log('Wallet created!');
};
