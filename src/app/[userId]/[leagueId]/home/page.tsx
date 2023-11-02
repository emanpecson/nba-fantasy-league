'use client';

import useLoadData from '@/hooks/useLoadData';
import LeagueExtended from '@/models/LeagueExtended';

export default function Home({ params }: { params: { userId: string; leagueId: string } }) {
  const { league, leagueIsLoading }: { league: LeagueExtended; leagueIsLoading: boolean } =
    useLoadData(`/api/league?leagueId=${params.leagueId}`, 'league', 'leagueIsLoading');

  return (
    <div>
      Home
      <div>user: {params.userId}</div>
      <div>league: {params.leagueId}</div>
      {league && <div>league name: {league?.name}</div>}
    </div>
  );
}
