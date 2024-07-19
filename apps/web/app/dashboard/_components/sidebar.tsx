'use client';

import { PanelLeftClose, PanelRightClose } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';

import { cn } from '@repo/ui/lib/utils';
import { Button } from '@repo/ui/shadcn/button';
import { ScrollArea } from '@repo/ui/shadcn/scroll-area';

import { WorkspaceSwitcher } from './workspace-switcher';

export interface SidebarSection {
	title: string;
	items: SidebarItem[];
}

export interface SidebarItem {
	title: string;
	icon: React.ReactNode;
	href: string;
}

export function DashboardSidebar({
	sections,
}: {
	sections: SidebarSection[];
}) {
	const path = usePathname();
	const [isExpanded, setIsExpanded] = useState(true);

	return (
		<div className='sticky top-0 h-full border-r'>
			<aside className={cn(isExpanded ? 'w-[260px]' : 'w-[68px]')}>
				<div className='grid gap-2'>
					<div className='flex h-[60px] items-center p-4'>
						{isExpanded && <WorkspaceSwitcher />}

						<Button
							variant='ghost'
							size='icon'
							className='ml-auto size-8'
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? (
								<PanelLeftClose size={18} className='stroke-muted-foreground' />
							) : (
								<PanelRightClose
									size={18}
									className='stroke-muted-foreground'
								/>
							)}
						</Button>
					</div>

					<ScrollArea>
						<nav className='grid gap-8 px-4 pt-4'>
							{sections.map(section => (
								<section key={section.title} className='grid gap-0.5'>
									{isExpanded ? (
										<p className='text-xs text-muted-foreground'>
											{section.title}
										</p>
									) : (
										<div className='h-4' />
									)}

									{section.items.map(item => (
										<Fragment key={item.title}>
											{isExpanded ? (
												<Link
													href={item.href}
													className={cn(
														'flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-muted',
														path === item.href
															? 'bg-muted'
															: 'text-muted-foreground hover:text-accent-foreground',
													)}
												>
													{item.icon}
													{item.title}
												</Link>
											) : (
												<Link
													href={item.href}
													className={cn(
														'flex items-center gap-3 rounded-md py-2 text-sm font-medium hover:bg-muted',
														path === item.href
															? 'bg-muted'
															: 'text-muted-foreground hover:text-accent-foreground',
													)}
												>
													<span className='flex size-full items-center justify-center'>
														{item.icon}
													</span>
												</Link>
											)}
										</Fragment>
									))}
								</section>
							))}
						</nav>
					</ScrollArea>
				</div>
			</aside>
		</div>
	);
}
