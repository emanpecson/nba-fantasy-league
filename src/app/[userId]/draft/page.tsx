'use client';

import { useEffect, useState } from 'react';
import { Card, League, Player, Team } from '@prisma/client';
import DraftTeam from '@/models/DraftTeam';
import PickOrder from '@/components/draft/PickOrder';
import DraftTable from '@/components/draft/DraftTable';
import RosterView from '@/components/draft/roster/RosterView';
import DraftSearch from '@/components/draft/DraftSearch';
import TeamCombobox from '@/components/draft/TeamCombobox';
import PositionSelect from '@/components/draft/PositionSelect';
import isCurrentTeamAndRound from '@/lib/draft/isCurrentTeamAndRound';
import RouteButton from '@/components/RouteButton';
import Modal from '@/components/Modal';

export default function Draft({ params }: { params: { userId: string } }) {
	// displayed data
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
	const [myTeam, setMyTeam] = useState<DraftTeam>(new DraftTeam('MyTeam'));
	const [teams, setTeams] = useState<DraftTeam[]>([
		new DraftTeam('Lakers'),
		myTeam,
		new DraftTeam('Heat'),
	]);

	const teamDraftOrder: DraftTeam[][] = [];
	for(let i = 0; i < 10; i++) {
		const round: Array<DraftTeam> = [];
		for(const team of teams) {
			round.push(team);
		}
		teamDraftOrder.push(round);
	}

	// filters
  const [searchInput, setSearchInput] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

	// states
  const [isLoadingTable, setIsLoadingTable] = useState(false);
	const [teamPicking, setTeamPicking] = useState(teamDraftOrder[0][0]); // first round, first team
	const [draftIndex, setDraftIndex] = useState(0);
	const [leagueHomeRoute, setLeagueHomeRoute] = useState('');
	const [isOpenWrapupModal, setIsOpenWrapupModal] = useState(false);
	const [isLoadingWrapup, setIsLoadingWrapup] = useState(false);

	// test log
	useEffect(() => {
		console.log('teams:', teams);
	}, [teams]);

  useEffect(() => {
    const handleFilter = async () => {
      setIsLoadingTable(true);

      const res = await fetch(
        `/api/card?searchInput=${searchInput}&team=${teamFilter}&position=${positionFilter}`,
        { method: 'GET' }
      );
      const { cards } = await res.json();
      console.log('filtered cards:', cards);
      setPlayerCards(cards);

      setIsLoadingTable(false);
    };
    handleFilter();
  }, [teamFilter, positionFilter, searchInput]);

	// post in db + route to new page
	async function finishDraft(teams: DraftTeam[]) {
		console.log('draft finished');
		setIsOpenWrapupModal(true);

		try {
			setIsLoadingWrapup(true);

			// post new league (w/ user id)
			const res = await fetch('/api/league', {
				method: 'POST',
				body: JSON.stringify({
					name: 'tempName',
					mode: 'tempMode',
					userId: params.userId
				} as League),
			});
			const { data } = await res.json();
			const createdLeague: League = data;

			if(!createdLeague)
				throw Error('Unable to post league');

			// post all teams (w/ league id)
			for(const team of teams) {
				const res = await fetch('/api/team', {
					method: 'POST',
					body: JSON.stringify({
						isUser: team.name === 'MyRoster' ? true : false,
						name: team.name,
						leagueId: createdLeague.id
					} as Team),
				});
				const { data } = await res.json();
				const createdTeam: Team = data;

				if(!createdTeam)
					throw Error(`Unable to post team: ${team.name}`);

				const postPlayer = async (card: Card, isStarter: boolean) => {
					const res = await fetch('/api/player', {
						method: 'POST',
						body: JSON.stringify({
							isStarter,
							fantasyTeamId: createdTeam.id,
							cardId: card?.id,
						} as Player),
					});
					const { data } = await res.json();
					const createdPlayer: Player = data;

					if(!createdPlayer)
						throw Error(`Unable to post player: ${card?.name}`);
				}

				// post all players (associated w/ team + card)
				for(const rosterSpot of Object.values(team.roster.starters)) {
					await postPlayer(rosterSpot as Card, true);
				}
				for(const rosterSpot of Object.values(team.roster.bench)) {
					await postPlayer(rosterSpot as Card, false);
				}
			}

			// route to league home page
			setLeagueHomeRoute(`${params.userId}/${createdLeague.id}/home`);

			setIsLoadingWrapup(false);
		}
		catch(error) {
			console.error(error);
		}
	}

	// update teams + draft order
	async function handleSetTeams(teams: DraftTeam[]) {
		setTeams(teams);

		// set curr team picking
		for(let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
			for(let team_i = 0; team_i < teamDraftOrder[round_i].length; team_i++) {
				if(isCurrentTeamAndRound(round_i, team_i, draftIndex+1, 3)) {
					setTeamPicking(teamDraftOrder[round_i][team_i]);
				}
			}
		}

		if(draftIndex+1 === (teamDraftOrder.length * teamDraftOrder[0].length))
			await finishDraft(teams);

		setDraftIndex(draftIndex+1);
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
							isLoading={isLoadingTable}
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
			<Modal isOpen={isOpenWrapupModal} onClose={() => { setIsOpenWrapupModal(false) }}>
				{ isLoadingWrapup &&
					<p>Loading...</p>
				}
				{ !isLoadingWrapup &&		
					<RouteButton route={leagueHomeRoute}>
						league home route
					</RouteButton>
				}
			</Modal>
    </div>
  );
}
