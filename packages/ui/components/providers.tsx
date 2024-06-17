'use client';

import { ThemeProvider } from 'next-themes';
// biome-ignore lint/style/useImportType: React import
import * as React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
