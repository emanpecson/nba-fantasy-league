import Link from 'next/link';

export default function Home() {
  return (
    <div>
		<div>
			<Link href='/login'>
				go to login page
			</Link>
		</div>
		<div>
			<Link href='/signup'>
				go to signup page
			</Link>
		</div>
	</div>
  )
}
