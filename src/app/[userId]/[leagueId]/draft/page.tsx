'use client';

import { useEffect, useState } from 'react';
import { Card, League, Player, Team } from '@prisma/client';
import { useParams } from 'next/navigation';
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
import useLoadData from '@/hooks/useLoadData';

export default function Draft() {
  const params = useParams();

  // displayed data
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [cpuPlayerCards, setCpuPlayerCards] = useState<Card[]>([]);
  const [teams, setTeams] = useState<DraftTeam[]>([]);
  const [cardPicks, setCardPicks] = useState<Card[]>([]);
  const [userDraftTeam, setUserDraftTeam] = useState<DraftTeam>();
  const [userTeam, setUserTeam] = useState<Team | null>(null);

  // get user's team
  // const { userTeam, isLoadingUserTeam } = useLoadData(
  //   `/api/team?userId=${params.userId}&leagueId=${params.leagueId}`,
  //   'userTeam',
  //   'isLoadingUserTeam'
  // );

  const [teamDraftOrder, setTeamDraftOrder] = useState<DraftTeam[][]>([]);

  useEffect(() => {
    console.log('useEffect: fetch user team');
    const fetchUserTeam = async () => {
      try {
        const res = await fetch(`/api/team?userId=${params.userId}&leagueId=${params.leagueId}`, {
          method: 'GET',
        });
        const { data } = await res.json();
        setUserTeam(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserTeam();
  }, [params.userId, params.leagueId]);

  // ^ this load SHOULD trigger the bottom useEffect

  useEffect(() => {
    console.log('useEffect: setup draft order');
    if (userTeam) {
      const tempUserDraftTeam = new DraftTeam(userTeam.name, true);
      const tempTeams = [
        tempUserDraftTeam,
        new DraftTeam('Warriors', false),
        new DraftTeam('Wolves', false),
        new DraftTeam('Lakers', false),
        new DraftTeam('Heat', false),
        new DraftTeam('Nuggets', false),
        new DraftTeam('Blazers', false),
        new DraftTeam('Pelicans', false),
      ];

      setTeams(tempTeams);

      setUserDraftTeam(tempUserDraftTeam);

      // set team draft order
      const tempTeamDraftOrder: DraftTeam[][] = [];
      for (let i = 0; i < 10; i++) {
        const seed = `${i + 100}`;
        const rng = seedrandom(seed);
        const comparator = () => {
          return rng() - 0.5;
        };

        const reorderedTeams = [...tempTeams].sort(comparator);

        const round: DraftTeam[] = [];
        for (const team of reorderedTeams) {
          round.push(team);
        }
        tempTeamDraftOrder.push(round);
      }

      setTeamDraftOrder(tempTeamDraftOrder);
      setTeamPicking(tempTeamDraftOrder[0][0]);

      // test logs
      console.log('team draft order:', tempTeamDraftOrder);
    }
  }, [userTeam]);

  let count = 0;
  const [loadedPlayersCount, setLoadedPlayersCount] = useState(count);
  useEffect(() => {
    console.log('count change:', loadedPlayersCount);
    setLoadedPlayersCount(count);
  }, [count]);
  const totalPlayersToLoad = teams.length * 10; // each team has 10 players

  // filters
  const [searchInput, setSearchInput] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  // states
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [teamPicking, setTeamPicking] = useState<DraftTeam>(); // first round, first team
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

  /*
		todo:
			we gotta update the post to instead be a 'PUT'
			on the existing params.leagueId
	*/

  // post in db + route to new page
  async function finishDraft(teams: DraftTeam[]) {
    console.log('draft finished');
    setDraftFinished(true);
    setIsOpenWrapupModal(true);
    setIsLoadingWrapup(true);

    try {
      const postPlayer = async (card: Card, isStarter: boolean, team: Team) => {
        const res = await fetch('/api/player', {
          method: 'POST',
          body: JSON.stringify({
            isStarter,
            fantasyTeamId: team.id,
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

      // post all teams (w/ league id)
      for (const team of teams) {
        // post players for user team
        if (team.isUser) {
          console.log('posting user team:', team.name);

          for (const rosterSpot of Object.values(team.roster.starters)) {
            await postPlayer(rosterSpot as Card, true, userTeam as Team);
          }
          for (const rosterSpot of Object.values(team.roster.bench)) {
            await postPlayer(rosterSpot as Card, false, userTeam as Team);
          }
        }

        // post cpu teams + players
        else {
          console.log('posting cpu team:', team.name);

          const res = await fetch('/api/team', {
            method: 'POST',
            body: JSON.stringify({
              userId: null,
              name: team.name,
              leagueId: params.leagueId,
            } as Team),
          });
          const { data } = await res.json();
          const cpuTeam: Team = data;

          if (!cpuTeam) throw Error(`Unable to post team: ${team.name}`);

          // post all players (associated w/ team + card)
          for (const rosterSpot of Object.values(team.roster.starters)) {
            await postPlayer(rosterSpot as Card, true, cpuTeam);
          }
          for (const rosterSpot of Object.values(team.roster.bench)) {
            await postPlayer(rosterSpot as Card, false, cpuTeam);
          }
        }
      }

      // route to league home page
      setLeagueHomeRoute(`${params.userId}/${params.leagueId}/home`);
    } catch (error) {
      console.error(error);
    }
    setIsLoadingWrapup(false);
  }

  // update teams + draft order
  async function handleSetTeams(teams: DraftTeam[]) {
    console.log('setting teams:', teams);
    setTeams(teams);

    // set curr team picking
    for (let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
      for (let team_i = 0; team_i < teamDraftOrder[round_i].length; team_i++) {
        if (isCurrentTeamAndRound(round_i, team_i, draftIndex + 1, teams.length)) {
          setTeamPicking(teamDraftOrder[round_i][team_i]);
        }
      }
    }

    if (!draftFinished && draftIndex + 1 >= teamDraftOrder.length * teamDraftOrder[0].length)
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
  async function cpuSelect(teamPicking: DraftTeam) {
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
    if (teamPicking && !teamPicking.isUser && !draftFinished) {
      setTimeout(() => {
        cpuSelect(teamPicking);
      }, 500);
    }
  }, [teams]);

  return (
    <div>
      {userTeam && teamPicking && (
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

            <div>{userDraftTeam && <RosterView roster={userDraftTeam.roster} />}</div>
          </div>
        </div>
      )}
      {(!userTeam || !teamPicking) && <p>Loading user team</p>}
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
