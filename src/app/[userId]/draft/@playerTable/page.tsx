'use client';

import { getPlayerCards } from "@/lib/card/getPlayerCards"
import { useEffect, useState } from 'react';
import Player from '@/models/player';

export default function PlayerTable() {
	const [players, setPlayers] = useState<Player>([]);
	const [searchInput, setSearchInput] = useState('');

	// http://localhost:3000/647d06d5b25f3d8c887d4169/draft
	useEffect(() => {
		const getPlayers = async () => {
			const res = await getPlayerCards();
			setPlayers(res.cards);
		};
		getPlayers();
	}, []);

	return (
		<div>
			<div>
				<input className="text-black" type="text" value={searchInput} onChange={(event) => { setSearchInput(event.target.value) }} />
				input: { searchInput }
			</div>

			<div className="bg-gray-900 mx-auto max-w-7x1 bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 sm:flex sm:items-center sm_flex-auto">
				<table className="min-w-full divide-y divide-gray-700">
					<thead>
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Name</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Fantasy Points</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Points</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Assists</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Rebounds</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">FG%</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">3P%</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">FT%</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Steals</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Blocks</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Turnovers</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Minutes</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Age</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Team</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Position</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Height</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Weight</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Last Attended</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Country</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-800">
						{ players.map((player: Player) => (
							<tr key={player._id}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{player.name}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.ftsy_pts}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.pts}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.ast}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.reb}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.fg_pct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.fg3_pct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.ft_pct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.stl}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.blk}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.tov}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.min}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.age}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.team}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.pos}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.height}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.weight}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.last_attended}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
