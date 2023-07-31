import Team from "@/models/DraftTeam";
import isCurrentTeamAndRound from "@/lib/draft/isCurrentTeamAndRound";

export default function PickOrder({
	teamDraftOrder,
	draftIndex,
}: {
	teamDraftOrder: Array<Array<Team>>,
	draftIndex: number,
}) {
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}

	const rounds: JSX.Element[] = [];
	for(let round_i = 0; round_i < teamDraftOrder.length; round_i++) {
		rounds.push(
			<ul className="divide-y">
				<p className="py-3 font-semibold flex justify-center">Round { round_i+1 }</p>
				{
					teamDraftOrder[round_i].map((team: Team, team_i: number) => (
						// highlight if it is the curr team picking
						<li className={classNames("p-4 flex", isCurrentTeamAndRound(round_i, team_i, draftIndex, 3) ? 'bg-blue-100 font-semibold' : '')}>{ team.name }</li>
					))
				}
			</ul>
    );
	}

	return (
		<div className="bg-white rounded-lg drop-shadow-lg">
			<div className="divide-y divide-gray-400 h-[48rem] overflow-auto">
				{ rounds }
			</div>
		</div>
	);
}
