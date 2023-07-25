import Team from "@/models/Team";

export default function PickOrder({
	teams,
}: {
	teams: Team[]
}) {
	const rounds: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    rounds.push(
			<ul className="divide-y">
				<p className="py-3 font-semibold flex justify-center">Round { i }</p>
				{
					teams.map((team) => (
						<li className="p-4 flex">{ team.name }</li>
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
