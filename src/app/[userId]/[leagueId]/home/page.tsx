'use client'

import useLoadData from "@/hooks/useLoadData"
import LeagueExtended from "@/models/LeagueExtended";
import { useState } from "react";

export default function Home({ params }: { params: { userId: string, leagueId: string } }) {
	const [league, setLeague] = useState<LeagueExtended>();

	useLoadData((data) => { setLeague(data) }, `/api/league?id=${params.leagueId}`);
	console.log('league:', league);

	return (
		<div>
			Home
			<div>user: { params.userId }</div>
			<div>league: { params.leagueId }</div>
			{ league && 
				<div>league name: { league?.name }</div>
			}
		</div>
	)
}
