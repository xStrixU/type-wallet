export const getOrdinalSuffix = (value: number) => {
	const suffixes = ['th', 'st', 'nd', 'rd'];

	return value + (suffixes[(((value + 90) % 100) - 10) % 10] || suffixes[0]);
};
