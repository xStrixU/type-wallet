import { select } from '@inquirer/prompts';

import { clearView } from '@/common/utils/console';

export const getStartedView = async () => {
	clearView();

	const choice = await select({
		message:
			"Welcome in TypeWallet - Cryptocurrency wallet written in TypeScript. Let's get started",
		choices: [
			{ name: 'Create new wallet', value: 'create' },
			{ name: 'I already have a wallet', value: 'recover' },
		],
	});

	switch (choice) {
		case 'create': {
			console.log('Create new wallet');
			break;
		}
		case 'recover': {
			console.log('Recover a wallet');
			break;
		}
	}
};
