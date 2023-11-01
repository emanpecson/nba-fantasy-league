import Team from '@/models/DraftTeam';
import isCurrentTeamAndRound from '@/util/draft/isCurrentTeamAndRound';
import { Card } from '@prisma/client';

export default function PickOrder({
  teamDraftOrder,
  draftIndex,
  cardPicks,
  totalPicks,
  teams,
}: {
  teamDraftOrder: Array<Array<Team>>;
  draftIndex: number;
  cardPicks: Card[];
  totalPicks: number;
  teams: Team[];
}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  function displayCardPick(card: Card) {
    const firstInitial = card.name[0];
    const lastNameIndex = card.name.indexOf(' ');
    const lastName = card.name.substring(lastNameIndex + 1);

    return `${firstInitial}. ${lastName}`;
  }

  const rounds: JSX.Element[] = [];
  let i = 0;
  for (let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
    rounds.push(
      <ul className="divide-y">
        <p className="py-3 font-semibold flex justify-center">Round {round_i + 1}</p>
        {teamDraftOrder[round_i].map((team: Team, team_i: number) => (
          // highlight if it is the curr team picking
          <li
            className={classNames(
              'p-4 flex justify-between',
              isCurrentTeamAndRound(round_i, team_i, draftIndex, teams.length)
                ? 'bg-blue-100 font-semibold'
                : ''
            )}>
            <p>{team.name}</p>
            <p className="text-xs">
              {i < totalPicks && cardPicks[i] ? `(${i + 1}) ${displayCardPick(cardPicks[i])}` : ''}
            </p>
            <div className="hidden">{i++ /* update index */}</div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="bg-white rounded-lg drop-shadow-lg">
      <div className="divide-y divide-gray-400 h-[48rem] overflow-auto">{rounds}</div>
    </div>
  );
}
