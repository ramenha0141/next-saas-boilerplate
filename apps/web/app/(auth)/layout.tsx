import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-screen h-screen container flex justify-center items-center'>
			<div className='max-w-[400px] w-full'>
				<Link href='/' className='text-link text-sm hover:underline'>
					←トップに戻る
				</Link>
				{children}
			</div>
		</div>
	);
}
