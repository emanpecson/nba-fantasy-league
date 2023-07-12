import { Card } from "@prisma/client";

export default function RosterSpot({
	card,
	position,
}: {
	card: Card | null,
	position: string,
}) {
	return (
		<div className="h-24 rounded-md bg-blue-50">
			<p className="font-semibold">{ position }</p>
			<div>
				{ card ?
					<div>
						{ card.name }
					</div>
					:
					<div>
						<p className="text-gray-400">Empty</p>
					</div>
				}
			</div>
		</div>
	)
}