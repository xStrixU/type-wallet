import { createPasswordView } from '../create-password/create-password.view';
import { createMnemonicView } from './create-mnemonic';
import { verifyMnemonicView } from './verify-mnemonic.view';

export const createWalletView = async () => {
	await createPasswordView(true);
	const mnemonic = await createMnemonicView();

	await verifyMnemonicView(mnemonic);

	console.log('Wallet created!');
};
