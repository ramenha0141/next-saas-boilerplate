import '@repo/tailwind-config/globals.css';

import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import { cn } from '@repo/ui/lib/utils';
import { Toaster } from '@repo/ui/shadcn/sonner';

import { Providers } from './_components/providers';

export const metadata: Metadata = {
	title: 'Next.js SaaS Boilerplate',
	description: 'ramenha0141/next-saas-boilerplate',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ja'>
			<body
				className={cn(
					GeistSans.variable,
					'bg-background-dimmed font-sans antialiased',
				)}
			>
				<Providers>
					<div className='flex flex-col min-h-screen'>{children}</div>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
