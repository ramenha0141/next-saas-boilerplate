import { auth, signIn } from '@repo/auth';
import { Button } from '@repo/ui/shadcn/button';

import { ThemeToggle } from './_components/theme-toggle';

export default async function Home() {
	const session = await auth();

	return (
		<div>
			<ThemeToggle />

			<form
				action={async () => {
					'use server';

					await signIn();
				}}
			>
				<Button>SignIn</Button>
			</form>

			<pre>{JSON.stringify(session, null, 4)}</pre>
		</div>
	);
}
