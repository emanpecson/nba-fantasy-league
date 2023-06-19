'use client';

import { useEffect, useState } from 'react';
import Player from '@/models/player';
// import { Card } from '@prisma/client';

export default function PlayerTable() {
	const [searchInput, setSearchInput] = useState('');
	const [players, setPlayers] = useState<Player>([]);
	const [searchBy, setSearchBy] = useState('name');

	async function search(searchBy: string, searchInput: string) {
		const res = await fetch(`/api/card?searchBy=${searchBy}&searchInput=${searchInput}`, { method: 'GET' });
		// const cards = (await res.json() as Response).cards;
		const { cards } = await res.json();
		console.log('filtered cards:', cards);
		setPlayers(cards);
	}

	// http://localhost:3000/648555798csa10853dd4bc253/draft
	useEffect(() => {
		const getPlayers = async () => {
			const res = await fetch('/api/card', { method: 'GET' });
			const { cards } = await res.json();
			setPlayers(cards);
		};
		getPlayers();
	}, []);

	return (
		<div>
			<div>
				<label htmlFor="searchInput">Search Player:</label>
				<input className="text-black" type="text" onChange={(ev) => { setSearchInput(ev.target.value) }} value={searchInput} />
				<button onClick={(ev) => { search('name', searchInput) }}>Submit</button>
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
							<tr key={player.id}>
								<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">{player.name}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.fantasyPpg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.ppg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.apg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.rpg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.fgPct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.fg3Pct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.ftPct}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.spg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.bpg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.tpg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.mpg}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.age}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.team}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.position}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.height}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.weight}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.lastAttended}</td>
								<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{player.country}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
