import Roster from "@/models/Roster";
import RosterSpot from "./RosterSpot";

export default function RosterView({ roster }: { roster: Roster }) {
	return (
		<div className="columns-2 bg-green-100">
			<div className="basis-1/2">
				<p className="font-semibold">Starters</p>
				<div className="columns-5">
					<RosterSpot card={roster.starters.pg} position='PG' />
					<RosterSpot card={roster.starters.sg} position='SG' />
					<RosterSpot card={roster.starters.sf} position='SF' />
					<RosterSpot card={roster.starters.pf} position='PF' />
					<RosterSpot card={roster.starters.c} position='C' />
				</div>
			</div>
			<div className="basis-1/2">
				<p className="font-semibold">Bench</p>
				<div className="columns-5">
					<RosterSpot card={roster.bench.pg} position='PG' />
					<RosterSpot card={roster.bench.sg} position='SG' />
					<RosterSpot card={roster.bench.sf} position='SF' />
					<RosterSpot card={roster.bench.pf} position='PF' />
					<RosterSpot card={roster.bench.c} position='C' />
				</div>
			</div>
		</div>
	);
}