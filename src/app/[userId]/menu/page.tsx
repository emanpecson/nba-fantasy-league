'use client';

import Modal from '@/components/Modal';
import LoadLeague from './loadLeague/page';
import NewLeague from './newLeague/page';
import { useState } from 'react';

export default function Menu({ params }: { params: { userId: string } }) {
  const [isOpenNewLeague, setIsOpenNewLeague] = useState(false);
  const [isOpenLoadLeague, setIsOpenLoadLeague] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setIsOpenLoadLeague(true);
          }}>
          Load League
        </button>

        <Modal
          isOpen={isOpenLoadLeague}
          onClose={() => {
            setIsOpenLoadLeague(false);
          }}>
          <LoadLeague
            params={{
              userId: params.userId,
            }}
          />
        </Modal>
      </div>

      <div>
        <button
          onClick={() => {
            setIsOpenNewLeague(true);
          }}>
          New League
        </button>

        <Modal
          isOpen={isOpenNewLeague}
          onClose={() => {
            setIsOpenNewLeague(false);
          }}>
          <NewLeague />
        </Modal>
      </div>
    </div>
  );
}
