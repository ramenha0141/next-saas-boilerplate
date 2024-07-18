'use client';

import type * as React from 'react';

import { ConfirmDialogProvider } from '@repo/ui/confirm-dialog';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConfirmDialogProvider
			defaultOptions={{ cancelButton: { variant: 'outline' } }}
		>
			{children}
		</ConfirmDialogProvider>
	);
}
