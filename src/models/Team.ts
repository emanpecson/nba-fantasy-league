import Roster from "./Roster";

export default class Team {
	name: string;
	roster: Roster;

	constructor(name: string) {
		this.name = name;
		this.roster = {
			starters: { pg: null, sg: null, sf: null, pf: null, c: null },
			bench: { pg: null, sg: null, sf: null, pf: null, c: null },
		};
	}

	setRoster(roster: Roster) {
		this.roster = roster;
	}
}
