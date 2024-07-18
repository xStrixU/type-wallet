import chalk from 'chalk';
import figlet from 'figlet';

export const clearView = () => {
	console.clear();
	console.log(chalk.blue(figlet.textSync('TypeWallet')));
	console.log();
};
