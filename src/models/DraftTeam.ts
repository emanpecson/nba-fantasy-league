import Roster from "./Roster";

export default class DraftTeam {
	name: string;
	roster: Roster;

	constructor(name: string) {
		this.name = name;
		this.roster = new Roster();
	}

	setRoster(roster: Roster) {
		this.roster = roster;
	}
}
