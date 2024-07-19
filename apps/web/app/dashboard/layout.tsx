import { BuildingIcon, LayoutPanelLeftIcon, SettingsIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

import { SessionProvider, auth } from '@repo/auth';

import { DashboardSidebar, type SidebarSection } from './_components/sidebar';

const sections: SidebarSection[] = [
	{
		title: 'ダッシュボード',
		items: [
			{
				title: 'ホーム',
				icon: <LayoutPanelLeftIcon className='size-5' />,
				href: '/dashboard',
			},
		],
	},
	{
		title: '設定',
		items: [
			{
				title: 'ワークスペース設定',
				icon: <BuildingIcon className='size-5' />,
				href: '/dashboard/settings',
			},
			{
				title: 'アカウント設定',
				icon: <SettingsIcon className='size-5' />,
				href: '/dashboard/account',
			},
		],
	},
];

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session?.user) redirect('/sign-in');

	return (
		<SessionProvider session={session}>
			<div className='flex h-screen'>
				<DashboardSidebar sections={sections} />
				<main>{children}</main>
			</div>
		</SessionProvider>
	);
}
