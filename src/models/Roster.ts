import { Card } from "@prisma/client"

export default interface Roster {
	starters: {
		pg: Card | null;
		sg: Card | null;
		sf: Card | null;
		pf: Card | null;
		c: Card | null;
	},
	bench: {
		pg: Card | null;
		sg: Card | null;
		sf: Card | null;
		pf: Card | null;
		c: Card | null;
	},
};