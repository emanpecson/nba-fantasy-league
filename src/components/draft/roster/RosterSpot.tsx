import { Card } from "@prisma/client";

export default function RosterSpot({
	card,
	position,
}: {
	card: Card | null,
	position: string,
}) {
	return (
		<div className="h-32 rounded-lg bg-white">
			<div className="p-3">
				<p className="italic">{ position }</p>
				<div>
					{ card ?
						<div>
							<p className="font-semibold pb-2">{card.name}</p>
							<p>{card.ppg}p, {card.apg}a, {card.rpg}r</p>
							<p>{card.height}, {card.weight}</p>
						</div>
						:
						<div>
							<p className="text-gray-400">Empty</p>
						</div>
					}
				</div>
			</div>
		</div>
	)
}