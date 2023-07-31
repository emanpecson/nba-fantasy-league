import { Card } from '@prisma/client';
import { useEffect, useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import CardModal from './CardModal';
import Roster from '@/models/Roster';
import Team from '@/models/Team';

export default function DraftTable({
  playerCards,
  isLoading,
	teams,
	setTeams,
	teamPicking,
}: {
  playerCards: Card[];
  isLoading: boolean;
	teams: Team[];
	setTeams: (teams: Team[]) => void;
	teamPicking: Team;
}) {
	// card that the modal will display details for
  const [cardProfile, setCardProfile] = useState<Card | null>(null);
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);

	// update active roster to curr team picking
	const [activeRoster, setActiveRoster] = useState<Roster | null>(null);
	useEffect(() => {
		for(const team of teams) {
			if(team.name === teamPicking.name) {
				console.log(`DraftTable.tsx: activeRoster = ${team.roster}`)
				setActiveRoster(team.roster);
			}
		}
	}, [teams])

	/*
		when card modal updates the roster, this function will trigger
		and set the roster for the appropriate team and trigger the
		setTeams function in the parent
	*/
	function setRosterForPickingTeam(roster: Roster) {
		setActiveRoster(roster);

		// copy teams
		const teamsTemp = [...teams];

		// set roster for team
		for(const team of teams) {
			if(team.name === teamPicking.name) {
				team.setRoster(roster);
			}
		}

		// update teams back up to parent (draft/page.tsx)
		setTeams(teamsTemp);
	}

  function handleRowClick(card: Card) {
    setCardProfile(card);
    setCardModalIsOpen(true);
  }

	// helper function to disable card if it already takes any one team's roster spot
	function isAvailableCard(card: Card) {
		for(const team of teams) {
			for(const rosterSpot of Object.values(team.roster.starters)) {
				if(rosterSpot && rosterSpot.id === card.id)
					return false;
			}
			for(const rosterSpot of Object.values(team.roster.bench)) {
				if(rosterSpot && rosterSpot.id === card.id)
					return false;
			}
		}
		return true;
	}

	// ALTERNATIVE METHOD: replace the entire table and make up some shape for skeleton loader
	const loadingRows: JSX.Element[] = [];
	for (let i = 0; i < 6; i++) {
		loadingRows.push(
			<tr key={i} className="justify-items-center">
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
				<td className="h-14 w-6"><div className="container mx-auto animate-pulse rounded-full bg-[#f5f5f5] h-5 w-5/6"></div></td>
			</tr>
		);
	}

  return (
    <div className="pt-4">
      <div className="px-4 sm:px-6 lg:px-8 h-96 overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 h-full">
          <div className="inline-block min-w-full py-2 align-middle h-full">
						{ playerCards.length > 0 &&
							<table className="min-w-full divide-y divide-gray-300 relative">
								<thead>
									<tr>
										<th className="sticky top-0 bg-white opacity-90 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Name</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fantasy</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Points</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Assists</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rebounds</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Steals</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Blocks</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Turnovers</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Team</th>
										<th className="sticky top-0 bg-white opacity-90 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Position</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{!isLoading &&
										playerCards.map((card: Card) => (
											<tr
												key={card.id}
												onClick={() => handleRowClick(card)}
												className={!isAvailableCard(card) ? 'pointer-events-none bg-gray-200' : 'cursor-pointer bg-white hover:bg-gray-50'}
											>
												<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{card.name}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.fantasyPpg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.ppg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.apg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.rpg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.spg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.bpg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.tpg}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.team ? card.team : 'N/A'}</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{card.position}</td>
											</tr>
										))
									}
									{isLoading && loadingRows}
								</tbody>
							</table>
						}
						{ playerCards.length == 0 &&
							<div className="h-full">
								<div className="h-full flex justify-center items-center">
									<div className="flex bg-yellow-100 space-x-2 items-center justify-center rounded-full w-32 h-10 font-semibold text-yellow-700">
										<ExclamationTriangleIcon className="h-6 w-6" />
										<p>No data</p>
									</div>
								</div>
							</div>
						}
          </div>
        </div>
      </div>
      <CardModal
        card={cardProfile} 
        cardModalIsOpen={cardModalIsOpen}
        setCardModalIsOpen={setCardModalIsOpen}
        roster={activeRoster}
        setRoster={setRosterForPickingTeam}
      />
    </div>
  );
}
