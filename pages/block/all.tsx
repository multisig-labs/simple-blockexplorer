import {Center} from '@mantine/core';
import {NextPage} from 'next';
import {useState} from 'react';
import Layout from '../../components/layout';
import {BlockType} from '../../types/blockchain';
import PaginationUnbounded from '../../components/paginationUnbounded';
import BlockViewCompactTable from '../../components/blockViewCompact';
import {useClientContext} from '../../context/client.context';
import {Loader} from '../../components/Loader';
import Link from 'next/link';
import {FiChevronLeft} from 'react-icons/fi';
import {BackButton} from '../../components/backButton';

const BATCH_SIZE = 15;

const AllBlocks: NextPage = () => {
  const {client} = useClientContext();
  const [blocks, setBlocks] = useState<BlockType[]>();
  const [isLoading, setIsLoading] = useState(true);

  function handlePageChange(page: number) {
    console.log('loading page', page, ':', page * BATCH_SIZE, (page - 1) * BATCH_SIZE);
    setIsLoading(true);
    client.getLatestBlocks(BATCH_SIZE, (page - 1) * BATCH_SIZE).then(blocks => {
      setBlocks(blocks);
      setIsLoading(false);
    });
  }

  return (
    <Layout>
      <BackButton />
      {blocks ? <BlockViewCompactTable blocks={blocks} isShowAll={false} /> : <Loader />}
      <Center my="md">
        <PaginationUnbounded
          onChange={handlePageChange}
          disableLeft={isLoading}
          disableRight={isLoading || (blocks ? blocks.length < BATCH_SIZE : true)}
        />
      </Center>
    </Layout>
  );
};

export default AllBlocks;
