'use client';

import { useEffect, useState } from 'react';
import DraftTable from '@/components/draft/DraftTable';
import { Card } from '@prisma/client';
import DraftSearch from '@/components/draft/DraftSearch';
import TeamCombobox from '@/components/draft/TeamCombobox';
import PositionSelect from '@/components/draft/PositionSelect';

export default function Draft() {
	const [playerCards, setPlayerCards] = useState<Card[]>([]);
	const [searchInput, setSearchInput] = useState('');
	const [team, setTeam] = useState('');
	const [position, setPosition] = useState('');

	useEffect(() => {
		const handleFilter = async () => {
			const res = await fetch(`/api/card?searchInput=${searchInput}&team=${team}&position=${position}`, { method: 'GET' });
			const { cards } = await res.json();
			console.log('filtered cards:', cards);
			setPlayerCards(cards);
		}
		handleFilter();
	}, [team, position, searchInput])

	return (
		<div>
			<div className="flex flex-row">
				<div className="basis-1/5 bg-red-100">
					pick order as list format
				</div>
				<div className="basis-4/5">
					<div className="flex flex-row">
						<div className="basis-3/5">
							<DraftSearch setSearchInput={setSearchInput} />
						</div>
						<div className="basis-1/5">
							<TeamCombobox setTeam={setTeam} />
						</div>
						<div className="basis-1/5">
							<PositionSelect setPosition={setPosition} />
						</div>
					</div>
					<DraftTable playerCards={playerCards} />
				</div>
			</div>
		</div>
	)
}
