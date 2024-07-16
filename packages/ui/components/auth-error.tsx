'use client';

import { useSearchParams } from 'next/navigation';

import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../shadcn/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../shadcn/card';

const errors: Record<string, string> = {
	Configuration: 'サーバー側の設定に問題があります',
	AccessDenied: 'アクセスが拒否されました',
	Verification: 'リンクの有効期限が切れています',
	Default: '不明',
};

export function AuthError() {
	const error = useSearchParams().get('error') ?? 'Default';

	return (
		<Card className='rounded-md shadow-md'>
			<CardHeader>
				<CardTitle>認証エラー</CardTitle>
			</CardHeader>
			<CardContent>
				<Alert variant='destructive'>
					<CircleAlert className='h-4 w-4' />
					<AlertTitle>認証中にエラーが発生しました</AlertTitle>
					<AlertDescription>
						原因：{errors[error] ?? errors.Default}
					</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	);
}
