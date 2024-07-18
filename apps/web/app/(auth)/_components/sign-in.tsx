'use client';

import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/webauthn';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/shadcn/card';
import { Input } from '@repo/ui/shadcn/input';
import { Label } from '@repo/ui/shadcn/label';

export function SignIn() {
	const callbackUrl = useSearchParams().get('callbackUrl') ?? '/';

	const [loading, setLoading] = useState<'google' | 'passkey' | 'email' | null>(
		null,
	);
	const [email, setEmail] = useState('');

	function signInWithGoogle() {
		if (loading) return;

		setLoading('google');
		signIn('google', { callbackUrl });
	}

	function signInWithPasskey() {
		if (loading) return;

		setLoading('passkey');
		signIn('passkey', { action: 'authenticate', callbackUrl }).catch(() => {
			setLoading(null);
			toast.error('パスキーでのサインインがキャンセルされました');
		});
	}

	function signInWithEmail() {
		if (loading) return;

		setLoading('email');
		signIn('resend', { email, callbackUrl });
	}

	return (
		<>
			<Card className='rounded-md shadow-md'>
				<CardHeader>
					<CardTitle>サインイン</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<Button type='button' variant='outline' onClick={signInWithGoogle}>
							{loading === 'google' ? (
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='0.98em'
									height='1em'
									viewBox='0 0 256 262'
									className='mr-2 h-5 w-5'
								>
									<title>Google Logo</title>
									<path
										fill='#4285f4'
										d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'
									/>
									<path
										fill='#34a853'
										d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'
									/>
									<path
										fill='#fbbc05'
										d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z'
									/>
									<path
										fill='#eb4335'
										d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'
									/>
								</svg>
							)}
							Googleでサインイン
						</Button>

						<Button type='button' variant='outline' onClick={signInWithPasskey}>
							{loading === 'passkey' ? (
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='1em'
									height='1em'
									viewBox='0 0 24 24'
									className='mr-2 h-5 w-5'
								>
									<title>Passkey Logo</title>
									<path
										fill='currentColor'
										d='M3 20v-2.8q0-.85.438-1.562T4.6 14.55q1.55-.775 3.15-1.162T11 13q.5 0 1 .038t1 .112q-.1 1.45.525 2.738T15.35 18v2zm16 3l-1.5-1.5v-4.65q-1.1-.325-1.8-1.237T15 13.5q0-1.45 1.025-2.475T18.5 10t2.475 1.025T22 13.5q0 1.125-.638 2t-1.612 1.25L21 18l-1.5 1.5L21 21zm-8-11q-1.65 0-2.825-1.175T7 8t1.175-2.825T11 4t2.825 1.175T15 8t-1.175 2.825T11 12m7.5 2q.425 0 .713-.288T19.5 13t-.288-.712T18.5 12t-.712.288T17.5 13t.288.713t.712.287'
									/>
								</svg>
							)}
							パスキーでサインイン
						</Button>

						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<span className='w-full border-t' />
							</div>
							<div className='relative flex justify-center text-sm uppercase'>
								<span className='bg-background text-muted-foreground px-2'>
									または
								</span>
							</div>
						</div>

						<form
							onSubmit={e => {
								e.preventDefault();

								signInWithEmail();
							}}
						>
							<div className='grid gap-2'>
								<Label htmlFor='email'>メールアドレス</Label>
								<Input
									id='email'
									type='email'
									autoFocus
									placeholder='email@example.com'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
								<Button type='submit'>ログイン</Button>
							</div>
						</form>

						<p className='text-sm'>
							アカウントをお持ちでない場合、
							<Link href='/sign-up' className='text-link hover:underline'>
								アカウントを作成
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>

			<div
				className={cn(
					'fixed h-screen w-screen inset-0 bg-black/25 pointer-events-none transition-opacity opacity-0',
					loading === 'passkey' && 'opacity-100 pointer-events-auto',
				)}
			/>
		</>
	);
}
