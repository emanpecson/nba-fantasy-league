import Link from 'next/link';


export default function Home() {
	return (
		<div className="box">
			<div>
				<Link href='/login'>
					Login
				</Link>
			</div>
			<div>
				<Link href='/signup'>
					Signup
				</Link>
			</div>
		</div>
	)
}
