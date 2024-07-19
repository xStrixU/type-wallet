export const bufferToBits = (buffer: Buffer) =>
	[...buffer].map(byte => byte.toString(2).padStart(8, '0')).join('');

export const bitsToBuffer = (bits: string) => {
	const bytes = Array.from({ length: bits.length / 8 }).map((_, i) =>
		Number.parseInt(bits.slice(i * 8, (i + 1) * 8), 2),
	);

	return Buffer.from(bytes);
};
