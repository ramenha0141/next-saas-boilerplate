import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

export interface AmazonProfile {
	email: string;
	name: string;
	user_id: string;
}

export function Amazon(
	options: OAuthUserConfig<AmazonProfile>,
): OAuthConfig<AmazonProfile> {
	return {
		id: 'amazon',
		name: 'Amazon',
		type: 'oauth',
		authorization: {
			url: 'https://apac.account.amazon.com/ap/oa',
			params: { scope: 'profile advertising::campaign_management' },
		},
		token: 'https://api.amazon.co.jp/auth/o2/token',
		userinfo: 'https://api.amazon.com/user/profile',
		profile: profile => ({
			email: profile.email,
			name: profile.name,
		}),
		// @ts-expect-error
		options,
	};
}
