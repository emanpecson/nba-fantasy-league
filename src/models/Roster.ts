import { Card } from "@prisma/client"

export default class Roster {
	starters: {
		pg: Card | null,
		sg: Card | null,
		sf: Card | null,
		pf: Card | null,
		c: Card | null,
	}
	bench: {
		pg: Card | null,
		sg: Card | null,
		sf: Card | null,
		pf: Card | null,
		c: Card | null,
	}

	constructor() {
		this.starters = {
			pg: null,
			sg: null,
			sf: null,
			pf: null,
			c: null,
		}
		this.bench = {
			pg: null,
			sg: null,
			sf: null,
			pf: null,
			c: null,
		}
	}

	getStarters() {
		return this.starters;
	}

	getBench() {
		return this.bench;
	}

	setStarters(starters: {
		pg: Card | null,
		sg: Card | null,
		sf: Card | null,
		pf: Card | null,
		c: Card | null,
	}) {
		this.starters = starters;
	}

	setBench(bench: {
		pg: Card | null,
		sg: Card | null,
		sf: Card | null,
		pf: Card | null,
		c: Card | null,
	}) {
		this.bench = bench;
	}
}
