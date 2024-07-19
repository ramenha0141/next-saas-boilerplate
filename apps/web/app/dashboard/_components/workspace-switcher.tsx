'use client';

import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@repo/ui/lib/utils';
import { Button, buttonVariants } from '@repo/ui/shadcn/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@repo/ui/shadcn/popover';

export function WorkspaceSwitcher() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					<Button className='h-8 px-2' variant={isOpen ? 'secondary' : 'ghost'}>
						<div className='flex items-center space-x-3 pr-2'>
							<div className='flex items-center space-x-3'>
								<span className='inline-block truncate text-sm font-medium max-w-[120px]'>
									workspace
								</span>
							</div>
						</div>
						<ChevronsUpDown className='size-4 text-muted-foreground' />
					</Button>
				</PopoverTrigger>
				<PopoverContent align='start' className='max-w-60 p-2'>
					<div className='grid gap-1'>
						<Link
							className={cn(
								buttonVariants({ variant: 'ghost' }),
								'relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground',
							)}
							href='#'
						>
							<span
								className={`flex-1 truncate text-sm ${
									true ? 'font-medium text-foreground' : 'font-normal'
								}`}
							>
								workspace
							</span>
						</Link>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
