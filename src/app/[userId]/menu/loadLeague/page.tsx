'use client';

import useLoadData from '@/hooks/useLoadData';
import LeagueExtended from '@/models/LeagueExtended';
import { useRouter } from 'next/navigation';

export default function LoadLeague({ params }: { params: { userId: string } }) {
  const { leagues, leaguesAreLoading }: { leagues: LeagueExtended[]; leaguesAreLoading: boolean } =
    useLoadData(`/api/league?userId=${params.userId}`, 'leagues', 'leaguesAreLoading');
  const router = useRouter();

  console.log('leagues:', leagues);

  function routeToLeague(leagueId: string) {
    router.push(`/${params.userId}/${leagueId}/home`);
  }

  return (
    <div>
      {leaguesAreLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {leagues
              ? leagues.map((league: LeagueExtended) => (
                  <tr
                    key={league.id}
                    onClick={() => routeToLeague(league.id)}
                    className="hover:bg-gray-100">
                    <td>{league.name}</td>
                    <td>{league.id}</td>
                  </tr>
                ))
              : 'no league data available'}
          </tbody>
        </table>
      )}
    </div>
  );
}
