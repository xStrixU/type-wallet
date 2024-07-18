export const bufferToBinary = (buffer: Buffer) =>
	[...buffer].map(byte => byte.toString(2).padStart(8, '0')).join('');
