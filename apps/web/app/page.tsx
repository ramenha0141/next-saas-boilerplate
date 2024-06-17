import { auth, signIn } from '@repo/auth';
import { ThemeToggle } from '@repo/ui/components/theme-toggle';
import { Button } from '@repo/ui/shadcn/button';

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
