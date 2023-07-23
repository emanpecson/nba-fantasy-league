export default function PickOrder() {
	const teamPlaceholder = ['Lakers', 'Warriors', 'Thunder'];

	const rounds: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    rounds.push(
			<ul className="divide-y">
				{
					teamPlaceholder.map((team) => (
						<li className="p-4">{team}</li>
					))
				}
			</ul>
    );
  }

	return (
		<div className="bg-white h-full rounded-lg drop-shadow-lg">
			<div className="divide-y divide-gray-400">
				{ rounds }
			</div>
		</div>
	);
}

/*
	algorithm:
		ima have my own team

*/