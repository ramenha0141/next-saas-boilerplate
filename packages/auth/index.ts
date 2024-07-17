import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type NextAuthConfig, type NextAuthResult } from 'next-auth';
import Google from 'next-auth/providers/google';
import Passkey from 'next-auth/providers/passkey';
import { cache } from 'react';

import { prisma } from '@repo/db';
import { env } from '@repo/env';

export const authConfig: NextAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: env.AUTH_GOOGLE_ID,
			clientSecret: env.AUTH_GOOGLE_SECRET,
		}),
		Passkey,
	],
	secret: env.AUTH_SECRET,
	pages: {
		signIn: '/sign-in',
		error: '/auth-error',
	},
	experimental: {
		enableWebAuthn: true,
	},
	logger: {
		warn: code => {
			if (!code.includes('experimental-webauthn')) {
				console.warn(code);
			}
		},
	},
};

const authResult = NextAuth(authConfig);

export const { GET, POST } = authResult.handlers;
export const auth: NextAuthResult['auth'] = cache(authResult.auth);
export const signIn: NextAuthResult['signIn'] = authResult.signIn;
export const signOut: NextAuthResult['signOut'] = authResult.signOut;

export * from 'next-auth/react';
