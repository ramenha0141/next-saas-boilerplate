'use client';

import { ThemeProvider } from 'next-themes';
import type * as React from 'react';

import { ConfirmDialogProvider } from '../confirm-dialog';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<ConfirmDialogProvider
				defaultOptions={{ cancelButton: { variant: 'outline' } }}
			>
				{children}
			</ConfirmDialogProvider>
		</ThemeProvider>
	);
}
