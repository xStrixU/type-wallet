export const validatePassword = (password: string) => {
	if (password.length >= 5) {
		return true;
	}

	return 'Password must be at least 5 characters long';
};
