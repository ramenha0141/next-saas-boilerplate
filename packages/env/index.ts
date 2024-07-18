import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		AUTH_SECRET: z.string(),
		AUTH_GOOGLE_ID: z.string(),
		AUTH_GOOGLE_SECRET: z.string(),
		DATABASE_URL: z.string().url(),
	},

	clientPrefix: 'NEXT_PUBLIC_',

	client: {},

	runtimeEnv: process.env,

	emptyStringAsUndefined: true,
});
