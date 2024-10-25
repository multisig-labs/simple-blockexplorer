import type {NextPage} from 'next';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {BlockType, TxType} from '../types/blockchain';
import BlockViewCompactTable from '../components/blockViewCompact';
import TxViewCompactTable from '../components/txViewCompact';
import {useClientContext} from '../context/client.context';
import {Loader} from '../components/Loader';

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
        <Loader />
      ) : (
        <div className=" grid grid-cols-1 gap-8 lg:gap-16 ">
          <div className="flex flex-col justify-center">
            <BlockViewCompactTable blocks={latestBlocks} />
          </div>
          <div className="flex flex-col">
            <TxViewCompactTable txs={latestTxs} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
