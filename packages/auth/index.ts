import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { type NextAuthConfig, type NextAuthResult } from 'next-auth';
import Google from 'next-auth/providers/google';

import { db } from '@repo/db';

export const authConfig: NextAuthConfig = {
	// @ts-ignore
	adapter: DrizzleAdapter(db),
	providers: [Google],
	secret: process.env.AUTH_SECRET,
};

const result = NextAuth(authConfig);

export const {
	handlers: { GET, POST },
} = result;

/* なぜか型エラーが出るので型を明示的に指定 */
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;
