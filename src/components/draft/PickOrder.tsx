import Team from "@/models/Team";

export default function PickOrder({
	teamDraftOrder,
	teamPicking,
	round,
}: {
	teamDraftOrder: Array<Array<Team>>,
	teamPicking: string,
	round: number,
}) {
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}

	const rounds: JSX.Element[] = [];
	for(let i = 0; i < teamDraftOrder.length; i++) {
		rounds.push(
			<ul className="divide-y">
				<p className="py-3 font-semibold flex justify-center">Round { i+1 }</p>
				{
					teamDraftOrder[i].map((team: Team) => (
						<li className={classNames("p-4 flex", team.name === teamPicking && i+1 === round ? 'bg-blue-100' : '')}>{ team.name }</li>
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
