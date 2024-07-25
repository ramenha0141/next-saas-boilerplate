'use client';

import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/webauthn';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@repo/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/shadcn/card';

export function SignIn() {
	const callbackUrl = useSearchParams().get('callbackUrl') ?? '/';

	const [isLoading, setIsLoading] = useState(false);

	function signInWithAmazon() {
		if (isLoading) return;

		setIsLoading(true);
		signIn('amazon', { callbackUrl });
	}

	return (
		<>
			<Card className='rounded-md shadow-md'>
				<CardHeader>
					<CardTitle>サインイン</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<Button type='button' variant='outline' onClick={signInWithAmazon}>
							{isLoading ? (
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='1em'
									height='1em'
									viewBox='0 0 24 24'
									className='mr-2 h-5 w-5'
								>
									<title>Amazon Logo</title>
									<path
										fill='currentColor'
										d='M21.997 18.23c0 .727-.405 2.127-1.315 2.896c-.182.14-.364.061-.284-.143c.265-.648.871-2.147.587-2.492c-.201-.262-1.031-.242-1.739-.182c-.323.041-.607.06-.827.105c-.204.016-.245-.163-.041-.303a3.1 3.1 0 0 1 .87-.428c1.15-.344 2.479-.137 2.67.083c.036.042.079.16.079.463m-1.922 1.294a7 7 0 0 1-.829.55c-2.122 1.275-4.871 1.943-7.258 1.943c-3.843 0-7.28-1.417-9.888-3.788c-.224-.182-.039-.446.223-.303c2.81 1.64 6.288 2.632 9.888 2.632c2.266 0 4.708-.424 7.035-1.336c.163-.061.345-.144.504-.202c.367-.165.69.242.325.504m-6.17-11.03c0-1.041.042-1.654-.303-2.18c-.306-.433-.833-.693-1.569-.652c-.798.044-1.655.567-1.873 1.526c-.043.22-.171.436-.437.483l-2.435-.31c-.174-.04-.439-.173-.352-.521C7.459 4.088 9.81 3.129 12.034 3h.522c1.22 0 2.788.349 3.791 1.264c1.217 1.136 1.087 2.662 1.087 4.32v3.927c0 1.178.478 1.7.958 2.314c.13.219.175.477-.044.655a78 78 0 0 1-1.917 1.654c-.175.133-.489.147-.61.045c-.77-.645-.958-1.003-1.435-1.658c-.83.871-1.527 1.352-2.356 1.613a7 7 0 0 1-1.784.216c-2.09 0-3.745-1.303-3.745-3.88c0-2.049 1.09-3.442 2.7-4.101c1.61-.66 3.95-.87 4.704-.874m-.477 5.192c.52-.872.477-1.586.477-3.185c-.652 0-1.306.045-1.871.178c-1.045.303-1.875.96-1.875 2.355c0 1.09.568 1.832 1.526 1.832q.198 0 .348-.045c.67-.186 1.088-.522 1.395-1.135'
									/>
								</svg>
							)}
							Amazonでサインイン
						</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
