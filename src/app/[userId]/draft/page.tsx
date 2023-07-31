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
import isCurrentTeamAndRound from '@/lib/draft/isCurrentTeamAndRound';

export default function Draft() {
	// displayed data
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
	const [myTeam, setMyTeam] = useState<Team>(new Team('MyTeam'));
	const [teams, setTeams] = useState<Team[]>([
		new Team('Lakers'),
		myTeam,
		new Team('Heat'),
	]);

	const [draftIndex, setDraftIndex] = useState(0);
	const [teamDraftOrder, setTeamDraftOrder] = useState<Array<Array<Team>>>(() => {
		const tempTeamDraftOrder: Array<Array<Team>> = [];

		for(let i = 0; i < 10; i++) {
			const round: Array<Team> = [];
			for(const team of teams) {
				round.push(team);
			}
			tempTeamDraftOrder.push(round);
		}

		return tempTeamDraftOrder;
	});

	// filters
  const [searchInput, setSearchInput] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

	// states
  const [isLoading, setIsLoading] = useState(false);
	const [teamPicking, setTeamPicking] = useState(teamDraftOrder[0][0]); // first round, first team 

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

	// update teams + draft order
	function handleSetTeams(teams: Team[]) {
		// get curr team picking
		for(let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
			for(let team_i = 0; team_i < teamDraftOrder[round_i].length; team_i++) {
				if(isCurrentTeamAndRound(round_i, team_i, draftIndex+1, 3)) {
					console.log(teamDraftOrder[round_i][team_i].name);
					setTeamPicking(teamDraftOrder[round_i][team_i]);
				}
			}
		}
		setDraftIndex(draftIndex+1);
		setTeams(teams);
	}

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/5 pt-2 pl-3">
					<PickOrder teamDraftOrder={teamDraftOrder} draftIndex={draftIndex} />
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
							setTeams={handleSetTeams}
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
