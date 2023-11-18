'use client';

import useLoadData from '@/hooks/useLoadData';
import useDateTime from '@/hooks/useDateTime';
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
    <div className="px-6 pb-6">
      <div className="text-xl pb-12 font-medium">Select a league</div>

      {leaguesAreLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="divide-y divide-gray-300 min-w-full rounded-lg">
          <thead>
            <tr>
              <th className="pb-3 font-semibold text-sm text-left pl-1">League</th>
              <th className="pb-3 font-semibold text-sm">Team</th>
              <th className="pb-3 font-semibold text-sm">Mode</th>
              <th className="pb-3 font-semibold text-sm">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {leagues && leagues.length > 0
              ? leagues.map((league: LeagueExtended) => (
                  <tr
                    key={league.id}
                    onClick={() => routeToLeague(league.id)}
                    className="hover:bg-stone-100 cursor-pointer">
                    <td className="py-3 text-left pl-1 font-medium">{league.name}</td>
                    <td className="py-3">
                      {league.teams.length > 0 ? league.teams[0].name : 'N/A'}
                    </td>
                    <td className="py-3">{league.mode}</td>
                    <td className="py-3">{useDateTime(new Date(league.createdAt))}</td>
                  </tr>
                ))
              : 'no league data available'}
          </tbody>
        </table>
      )}
    </div>
  );
}
