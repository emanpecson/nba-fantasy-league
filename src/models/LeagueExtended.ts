import { League, Team } from '@prisma/client';

export default interface LeagueExtended extends League {
	teams: Team[];
}
