export default function PickOrder() {
	const teamStack = ['Lakers', 'Warriors', 'Thunder', 'Heat', 'Nuggets', 'My Team'];

	const rounds: JSX.Element[] = [];
  for (let i = 1; i <= 10; i++) {
    rounds.push(
			<ul className="divide-y">
				<p className="py-3 font-semibold flex justify-center">Round { i }</p>
				{
					teamStack.map((team) => (
						<li className="p-4 flex">{ team }</li>
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

/*
	algorithm:
		ima have my own team

		for whatever the bot that is choosing, make it choose:
			a. top player option
			b. if can't place top player option for any roster spots
				then choose by next best for available position
*/