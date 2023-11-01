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
import isCurrentTeamAndRound from '@/util/draft/isCurrentTeamAndRound';
import RouteButton from '@/components/RouteButton';
import Modal from '@/components/Modal';
import seedrandom from 'seedrandom';
import Roster from '@/models/Roster';

export default function Draft({ params }: { params: { userId: string } }) {
  // displayed data
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [cpuPlayerCards, setCpuPlayerCards] = useState<Card[]>([]);
  const [myTeam, setMyTeam] = useState<DraftTeam>(new DraftTeam('MyTeam', true));
  const [teams, setTeams] = useState<DraftTeam[]>([
    myTeam,
    new DraftTeam('Warriors', false),
    new DraftTeam('Wolves', false),
    new DraftTeam('Lakers', false),
    new DraftTeam('Heat', false),
    new DraftTeam('Nuggets', false),
    new DraftTeam('Blazers', false),
    new DraftTeam('Pelicans', false),
  ]);
  const [cardPicks, setCardPicks] = useState<Card[]>([]);

  let count = 0;
  const [loadedPlayersCount, setLoadedPlayersCount] = useState(count);
  useEffect(() => {
    console.log('count change:', loadedPlayersCount);
    setLoadedPlayersCount(count);
  }, [count]);
  const totalPlayersToLoad = teams.length * 10; // each team has 10 players

  const teamDraftOrder: DraftTeam[][] = [];
  for (let i = 0; i < 10; i++) {
    const seed = `${i + 100}`;
    const rng = seedrandom(seed);
    const comparator = () => {
      return rng() - 0.5;
    };

    const reorderedTeams = [...teams].sort(comparator);

    const round: Array<DraftTeam> = [];
    for (const team of reorderedTeams) {
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
  const [totalPicks, setTotalPicks] = useState(80);
  const [draftFinished, setDraftFinished] = useState(false);

  async function handleFilter() {
    setIsLoadingTable(true);

    const res = await fetch(
      `/api/card?searchInput=${searchInput}&team=${teamFilter}&position=${positionFilter}`,
      { method: 'GET' }
    );
    const { cards } = await res.json();
    console.log('filtered cards:', cards);
    setPlayerCards(cards);

    setIsLoadingTable(false);
  }

  async function getCpuPlayerCards() {
    const res = await fetch('/api/card', { method: 'GET' });
    const { cards } = await res.json();
    setCpuPlayerCards(cards);
  }

  useEffect(() => {
    handleFilter();
    getCpuPlayerCards();
  }, [teamFilter, positionFilter, searchInput]);

  // post in db + route to new page
  async function finishDraft(teams: DraftTeam[]) {
    console.log('draft finished');
    setDraftFinished(true);
    setIsOpenWrapupModal(true);

    try {
      setIsLoadingWrapup(true);

      // post new league (w/ user id)
      const res = await fetch('/api/league', {
        method: 'POST',
        body: JSON.stringify({
          name: 'tempName',
          mode: 'tempMode',
          userId: params.userId,
        } as League),
      });
      const { data } = await res.json();
      const createdLeague: League = data;

      if (!createdLeague) throw Error('Unable to post league');

      // post all teams (w/ league id)
      for (const team of teams) {
        console.log('posting team:', team.name);
        const res = await fetch('/api/team', {
          method: 'POST',
          body: JSON.stringify({
            isUser: team.name === 'MyRoster' ? true : false,
            name: team.name,
            leagueId: createdLeague.id,
          } as Team),
        });
        const { data } = await res.json();
        const createdTeam: Team = data;

        if (!createdTeam) throw Error(`Unable to post team: ${team.name}`);

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

          if (!createdPlayer) throw Error(`Unable to post player: ${card?.name}`);

          // const count = loadedPlayersCount;
          // setLoadedPlayersCount(count+1);
          count++;
        };

        // post all players (associated w/ team + card)
        for (const rosterSpot of Object.values(team.roster.starters)) {
          await postPlayer(rosterSpot as Card, true);
        }
        for (const rosterSpot of Object.values(team.roster.bench)) {
          await postPlayer(rosterSpot as Card, false);
        }
      }

      // route to league home page
      setLeagueHomeRoute(`${params.userId}/${createdLeague.id}/home`);

      setIsLoadingWrapup(false);
    } catch (error) {
      console.error(error);
    }
  }

  // update teams + draft order
  async function handleSetTeams(teams: DraftTeam[]) {
    setTeams(teams);

    // set curr team picking
    for (let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
      for (let team_i = 0; team_i < teamDraftOrder[round_i].length; team_i++) {
        if (isCurrentTeamAndRound(round_i, team_i, draftIndex + 1, teams.length)) {
          setTeamPicking(teamDraftOrder[round_i][team_i]);
        }
      }
    }

    if (!draftFinished && draftIndex + 1 === teamDraftOrder.length * teamDraftOrder[0].length)
      await finishDraft(teams);

    setDraftIndex(draftIndex + 1);
  }

  function isAvailableCard(card: Card) {
    for (const team of teams) {
      for (const rosterSpot of Object.values(team.roster.starters)) {
        if (rosterSpot && rosterSpot.id === card.id) return false;
      }
      for (const rosterSpot of Object.values(team.roster.bench)) {
        if (rosterSpot && rosterSpot.id === card.id) return false;
      }
    }
    return true;
  }

  function getAvailableRosterSpot(roster: Roster, position: string) {
    // check starters
    if (!roster.starters.pg && position.includes('G')) return { isStarting: true, position: 'pg' };
    if (!roster.starters.sg && position.includes('G')) return { isStarting: true, position: 'sg' };
    if (!roster.starters.sf && position.includes('F')) return { isStarting: true, position: 'sf' };
    if (!roster.starters.pf && position.includes('F')) return { isStarting: true, position: 'pf' };
    if (!roster.starters.c && position.includes('C')) return { isStarting: true, position: 'c' };

    // check bench
    if (!roster.bench.pg && position.includes('G')) return { isStarting: false, position: 'pg' };
    if (!roster.bench.sg && position.includes('G')) return { isStarting: false, position: 'sg' };
    if (!roster.bench.sf && position.includes('F')) return { isStarting: false, position: 'sf' };
    if (!roster.bench.pf && position.includes('F')) return { isStarting: false, position: 'pf' };
    if (!roster.bench.c && position.includes('C')) return { isStarting: false, position: 'c' };

    // otherwise, no valid spot for this position
    return null;
  }

  /*
		if curr teamPicking is a cpu, automate process by auto-selecting next
		best player option
	*/
  async function cpuSelect() {
    const teamsTemp = [...teams];

    for (const card of cpuPlayerCards) {
      const availableRosterSpot = getAvailableRosterSpot(teamPicking.roster, card.position);
      if (isAvailableCard(card) && availableRosterSpot) {
        const rosterTemp = { ...teamPicking.roster } as Roster;

        if (availableRosterSpot.isStarting) {
          rosterTemp.starters[availableRosterSpot.position as keyof typeof rosterTemp.starters] =
            card;
        } else {
          rosterTemp.bench[availableRosterSpot.position as keyof typeof rosterTemp.bench] = card;
        }

        console.log(`${teamPicking.name} picked ${card.name}`);

        teamPicking.setRoster(rosterTemp);

        const tempCardPicks = [...cardPicks, card];
        setCardPicks(tempCardPicks);

        break;
      }
    }

    // after roster set, set team
    handleSetTeams(teamsTemp);
  }

  useEffect(() => {
    if (!teamPicking.isUser) {
      setTimeout(() => {
        cpuSelect();
      }, 500);
    }
  }, [teams]);

  return (
    <div>
      <div className="flex flex-row">
        <div className="basis-1/5 pt-2 pl-3">
          <PickOrder
            teamDraftOrder={teamDraftOrder}
            draftIndex={draftIndex}
            cardPicks={cardPicks}
            totalPicks={totalPicks}
            teams={teams}
          />
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
              cardPicks={cardPicks}
              setCardPicks={setCardPicks}
            />
          </div>

          <div>
            <RosterView roster={myTeam.roster} />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenWrapupModal}
        onClose={() => {
          setIsOpenWrapupModal(false);
        }}>
        {isLoadingWrapup && (
          <div>
            <p>Loading...</p>
            <p>
              {loadedPlayersCount}/{totalPlayersToLoad}
            </p>
          </div>
        )}
        {!isLoadingWrapup && <RouteButton route={leagueHomeRoute}>league home route</RouteButton>}
      </Modal>
    </div>
  );
}
