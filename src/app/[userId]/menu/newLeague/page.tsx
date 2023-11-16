'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import CommonButton from '@/components/CommonButton';

// the configs are contingent to whether the user selects:
// fantasy or simulation mode
export default function NewLeague({ params }: { params: { userId: string } }) {
  const [ftsyMode, setFtsyMode] = useState(false);
  const [simMode, setSimMode] = useState(false);
  const [isHandlingData, setIsHandlingData] = useState(false);
  const router = useRouter();
  // const params = useParams();

  const { register, handleSubmit } = useForm();

  // const showFtsyConfigs = () => {
  //   setSimMode(false);
  //   setFtsyMode(true);
  // };

  // const showSimConfigs = () => {
  //   setFtsyMode(false);
  //   setSimMode(true);
  // };

  async function handleButton(formData: { leagueName: string; teamName: string; mode: string }) {
    setIsHandlingData(true);
    console.log('data:', formData);

    // post league
    console.log('posting league', params);
    const leagueRes = await fetch('/api/league', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.leagueName,
        mode: formData.mode,
        userId: params.userId,
      }),
    });

    const { data: league } = await leagueRes.json();

    // post team
    console.log('posting team');
    const teamRes = await fetch('/api/team', {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        name: formData.teamName,
        leagueId: league.id,
      }),
    });

    console.log(await teamRes.json());

    setIsHandlingData(false);

    // route
    router.push(`${params.userId}/${league.id}/draft`);
  }

  return (
    <div>
      {/* <p>Select Mode</p>
				<div>
        <button
          type="button"
          onClick={showFtsyConfigs}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Fantasy
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={showSimConfigs}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Simulation
        </button>
      </div>
      {ftsyMode && 'ftsy mode'}
      {simMode && 'sim mode'} */}

      <form
        onSubmit={handleSubmit((data: any) => {
          handleButton(data);
        })}>
        <div className="pb-4">
          <label htmlFor="leagueName" className="flex pl-2.5 pb-1 text-md">
            League name
          </label>
          <input
            id="leagueName"
            type="text"
            className="relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
            placeholder="My Fantasy League"
            {...register('leagueName', { required: true, minLength: 8, maxLength: 64 })}
          />
        </div>
        <div className="pb-4">
          <label htmlFor="leagueName" className="flex pl-2.5 pb-1 text-md">
            Team name
          </label>
          <input
            id="teamName"
            type="text"
            className="relative block w-full rounded-lg border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
            placeholder="My Team"
            {...register('teamName', { required: true, minLength: 8, maxLength: 64 })}
          />
        </div>
        <div className="pb-4">
          <fieldset>
            <label className="flex pl-2.5 pb-1 text-md">Select mode</label>
            <div className="flex space-x-3">
              <div className="flex space-x-1 place-items-center">
                <input
                  type="radio"
                  id="fantasy"
                  value="fantasy"
                  {...register('mode', { required: true })}
                />
                <label htmlFor="fantasy">Fantasy</label>
              </div>

              <div className="flex space-x-1 place-items-center">
                <input
                  type="radio"
                  id="simulation"
                  value="simulation"
                  {...register('mode', { required: true })}
                />
                <label htmlFor="simulation">Simulation</label>
              </div>
            </div>
          </fieldset>
        </div>

        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-4 border border-gray-300 rounded-md shadow-md"
          type="submit">
          Submit
        </button>
      </form>

      {/* <button onClick={handleButton}>team draft route</button> */}
    </div>

    /*
			leagueName + mode -> League { name, mode }
			teamName -> Team { name } of a League { teams[] }

			then in the draft, we will either modify the existing league or
			not post all the data until after the draft
		*/
  );
}
