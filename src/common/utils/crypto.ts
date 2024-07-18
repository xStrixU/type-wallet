import crypto from 'node:crypto';

export const randomBytes = (size: number) => crypto.randomBytes(size);

export const sha256 = (buffer: Buffer) =>
	crypto.createHash('sha256').update(buffer).digest();

interface PBKDF2Input {
	password: string;
	salt: string;
	iterations: number;
	keylen: number;
	digest: string;
}

export const pbkdf2 = ({
	password,
	salt,
	iterations,
	keylen,
	digest,
}: PBKDF2Input) =>
	new Promise<Buffer>((resolve, reject) => {
		crypto.pbkdf2(
			password,
			salt,
			iterations,
			keylen,
			digest,
			(error, derivedKey) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(derivedKey);
			},
		);
	});
