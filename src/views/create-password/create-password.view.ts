import { password } from '@inquirer/prompts';

import { validatePassword } from './validate-password';

import { clearView } from '@/common/utils/console';

export const createPasswordView = async (isStarting?: boolean) => {
	clearView();

	console.log(
		isStarting ? "Let's start by creating" : 'Great, now create',
		'a password that will be used to unlock the wallet:',
	);

	const passwordValue = await password({
		message: 'Enter password',
		mask: '*',
		validate: validatePassword,
	});
	await password({
		message: 'Confirm password',
		mask: '*',
		validate: value =>
			value === passwordValue ? true : 'Passwords do not match',
	});

	return passwordValue;
};
