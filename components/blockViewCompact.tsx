import Link from 'next/link';
import {FC} from 'react';
import {BlockType} from '../types/blockchain';
import {timeElapsedAsString, truncateHex} from '../utilities';
import ClipboardCopyButton from './copiableString';

const BlockViewCompactTable: FC<{blocks: BlockType[]; isShowAll?: boolean}> = ({blocks, isShowAll = true}) => {
  return (
    <div className="w-full flex flex-col justify-center main-table py-4">
      <div className="w-full text-center font-bold text-xl">Blocks</div>
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <table className="main-table  my-4">
          <thead className="table-header">
            <tr>
              <th>
                <div className="table-header-cell">Block</div>
              </th>
              <th>
                <div className="table-header-cell">Hash</div>
              </th>
              <th>
                <div className="table-header-cell">Miner</div>
              </th>
              <th>
                <div className="table-header-cell">Timestamp</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((b, i) => (
              <BlockViewCompactRow key={i} block={b} />
            ))}
          </tbody>
        </table>
      </div>
      {isShowAll && (
        <div className="text-lg text-primary-600 text-center font-bold">
          <Link href={'/block/all'}>See all Blocks</Link>
        </div>
      )}
    </div>
  );
};

const BlockViewCompactRow: FC<{block: BlockType}> = ({block}) => {
  return (
    <tr className="border-t">
      <td className="table-content">
        <div className="bg-primary-50 rounded-lg py-2 px-3 my-2">
          <Link href={'/block/' + block.number}>{block.number}</Link>
        </div>
      </td>
      <td>
        <div className="table-hash-link justify-center">
          <Link href={'/block/' + block.hash}>{truncateHex(block.hash)}</Link>
          <ClipboardCopyButton str={block.hash} />
        </div>
      </td>
      <td>
        <div className="table-hash-link justify-center">
          <Link href={'/address/' + block.miner} passHref>
            {truncateHex(block.miner)}
          </Link>
          <ClipboardCopyButton str={block.miner} />
        </div>
      </td>
      <td>
        <div className="table-content">{timeElapsedAsString(block.timestamp) + ' ago'}</div>
      </td>
    </tr>
  );
};

export default BlockViewCompactTable;
