import readline from 'node:readline';

import chalk from 'chalk';
import figlet from 'figlet';

export const clearView = () => {
	console.clear();
	console.log(chalk.blue(figlet.textSync('TypeWallet')));
	console.log();
};

export const waitForEnter = () =>
	new Promise<void>(resolve => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question('', () => {
			rl.close();
			resolve();
		});
	});
