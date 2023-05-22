import Link from "next/link"

export default function Menu({ params }) {
	return(
		<div>
			<div>
				{ params.userId }
			</div>
			<div>
				<Link href={`/${params.userId}/menu/loadLeague`}>Load League</Link>
			</div>
			<div>
				<Link href={`/${params.userId}/menu/newLeague`}>New League</Link>
			</div>
		</div>
	)
}