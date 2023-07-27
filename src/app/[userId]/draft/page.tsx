'use client';

import { useEffect, useState } from 'react';
import { Card } from '@prisma/client';
import Team from '@/models/Team';
import PickOrder from '@/components/draft/PickOrder';
import DraftTable from '@/components/draft/DraftTable';
import RosterView from '@/components/draft/roster/RosterView';
import DraftSearch from '@/components/draft/DraftSearch';
import TeamCombobox from '@/components/draft/TeamCombobox';
import PositionSelect from '@/components/draft/PositionSelect';

export default function Draft() {
	// displayed data
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
	const [myTeam, setMyTeam] = useState<Team>(new Team('MyTeam'));
	const [teams, setTeams] = useState<Team[]>([
		new Team('Lakers'),
		myTeam,
		new Team('Heat'),
	]);

	// filters
  const [searchInput, setSearchInput] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

	// states
  const [isLoading, setIsLoading] = useState(false);
	const [teamPicking, setTeamPicking] = useState('MyTeam');
	const [round, setRound] = useState(1);

	// test log
	useEffect(() => {
		console.log('teams:', teams);
	}, [teams]);

  useEffect(() => {
    const handleFilter = async () => {
      setIsLoading(true);

      const res = await fetch(
        `/api/card?searchInput=${searchInput}&team=${teamFilter}&position=${positionFilter}`,
        { method: 'GET' }
      );
      const { cards } = await res.json();
      console.log('filtered cards:', cards);
      setPlayerCards(cards);

      setIsLoading(false);
    };
    handleFilter();
  }, [teamFilter, positionFilter, searchInput]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/5 pt-2 pl-3">
					<PickOrder teams={teams} teamPicking={teamPicking} round={round} />
				</div>

        <div className="basis-4/5 px-3">
          <div className="flex flex-row space-x-1.5">
            <div className="basis-3/5">
              <DraftSearch setSearchInput={setSearchInput} />
            </div>
            <div className="basis-1/5">
              <TeamCombobox setTeam={setTeamFilter} />
            </div>
            <div className="basis-1/5">
              <PositionSelect setPosition={setPositionFilter} />
            </div>
          </div>

					<div>
						<DraftTable
							playerCards={playerCards}
							isLoading={isLoading}
							teams={teams}
							setTeams={setTeams}
							teamPicking={teamPicking}
						/>
					</div>

					<div>
          	<RosterView roster={myTeam.roster} />
					</div>
        </div>
      </div>
    </div>
  );
}
