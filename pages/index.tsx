import {Anchor, Loader, SimpleGrid, Stack, Title} from '@mantine/core';
import type {NextPage} from 'next';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {BlockType, TxType} from '../types/blockchain';
import BlockViewCompactTable from '../components/blockViewCompact';
import TxViewCompactTable from '../components/txViewCompact';
import Link from 'next/link';
import {useClientContext} from '../context/client.context';

const Home: NextPage = () => {
  const {client, updateClient} = useClientContext();
  const [error, setError] = useState<any>();
  const [latestBlocks, setLatestBlocks] = useState<BlockType[]>();
  const [latestTxs, setLatestTxs] = useState<TxType[]>();

  // console.log(latestTxs);
  useEffect(() => {
    Promise.all([client.getLatestBlocks(10, 0), client.getLatestTxs(10, 0)])
      .then(results => {
        setLatestBlocks(results[0]);
        setLatestTxs(results[1]);
      })
      .catch(setError);
  }, [client]);

  if (error) console.log('Something went wrong:', error);
  return (
    <Layout>
      {latestBlocks == undefined || latestTxs == undefined ? (
        <div className="flex h-[80vh] flex-col items-center justify-center">
          <div className="text-2xl font-bold">Loading...</div>
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-24 mx-24">
          <div className="flex flex-col justify-center gap-8">
            <BlockViewCompactTable blocks={latestBlocks} />
          </div>
          <div className="flex flex-col gap-8">
            <TxViewCompactTable txs={latestTxs} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
