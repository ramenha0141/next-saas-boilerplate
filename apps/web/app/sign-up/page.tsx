import Link from 'next/link';

import { SignUp } from '@repo/ui/components/sign-up';

export default function Page() {
	return (
		<div className='w-screen h-screen container flex justify-center items-center'>
			<div className='max-w-[400px] w-full'>
				<Link href='/' className='text-link text-sm hover:underline'>
					←トップに戻る
				</Link>
				<SignUp />
			</div>
		</div>
	);
}
