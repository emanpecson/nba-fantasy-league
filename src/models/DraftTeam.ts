import Roster from "./Roster";

export default class DraftTeam {
	name: string;
	roster: Roster;
	isUser: boolean;

	constructor(name: string, isUser: boolean) {
		this.name = name;
		this.roster = new Roster();
		this.isUser = isUser;
	}

	setRoster(roster: Roster) {
		this.roster = roster;
	}
}
