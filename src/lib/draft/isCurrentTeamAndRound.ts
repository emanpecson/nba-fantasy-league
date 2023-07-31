export default function isCurrentTeamAndRound(currRound_i: number, currTeam_i: number, draft_i: number, teamsPerRound: number) {
	const draftIndexRound_i = Math.floor(draft_i / teamsPerRound);
	const draftIndexTeam_i = draft_i % teamsPerRound;

	return currRound_i === draftIndexRound_i && currTeam_i === draftIndexTeam_i;
}
