import { SessionProvider, auth } from '@repo/auth';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session?.user) redirect('/sign-in');

	return <SessionProvider session={session}>{children}</SessionProvider>;
}
