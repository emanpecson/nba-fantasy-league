'use client';

import { useEffect, useState } from 'react';
import DraftTable from '@/components/draft/DraftTable';
import { Card } from '@prisma/client';
import DraftSearch from '@/components/draft/DraftSearch';
import TeamCombobox from '@/components/draft/TeamCombobox';
import PositionSelect from '@/components/draft/PositionSelect';
import RosterView from '@/components/draft/roster/RosterView';
import Roster from '@/models/Roster';
import PickOrder from '@/components/draft/PickOrder';
import Team from '@/models/Team';

export default function Draft() {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roster, setRoster] = useState<Roster>({
    starters: { pg: null, sg: null, sf: null, pf: null, c: null },
    bench: { pg: null, sg: null, sf: null, pf: null, c: null },
  });

	const [teams, setTeams] = useState<Team[]>([
		new Team('Lakers'),
		new Team('MyTeam'),
		new Team('Heat'),
	]);

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
					<PickOrder teams={teams} />
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
							roster={roster}
							setRoster={setRoster}
							teams={teams}
							setTeams={setTeams}
						/>
					</div>

					<div>
          	<RosterView roster={roster} />
					</div>
        </div>
      </div>
    </div>
  );
}
