export default function Home({ params }: { params: { userId: string, leagueId: string } }) {
	return (
		<div>
			Home
			<div>user: { params.userId }</div>
			<div>league: { params.leagueId }</div>
		</div>
	)
}
