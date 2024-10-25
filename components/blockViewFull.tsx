import Link from 'next/link';
import {FC} from 'react';
import constants from '../constants';
import {BlockType, TxType} from '../types/blockchain';
import {addressToKnownAddress, timeElapsedAsString, truncateHex} from '../utilities';
import ClipboardCopyButton from './copiableString';
import {BackButton} from './backButton';

const BlockViewFull: FC<{block: BlockType}> = ({block}) => {
  let data: [string, any][] = [
    ['Hash', <div key={block.hash}>{block.hash}</div>],
    ['Number', block.number],
    ['Timestamp', `${block.timestamp.toLocaleString()} (${timeElapsedAsString(block.timestamp)} ago)`],
    ['Size', block.size],
    [
      'Parent Hash',
      <div className="table-hash-link" key={block.parentHash}>
        <Link href={'/block/' + block.parentHash}>{block.parentHash}</Link>
        <ClipboardCopyButton str={block.parentHash} />
      </div>,
    ],
    ['Difficulty', block.difficulty.toString()],
    [
      'Miner',
      <div className="table-hash-link" key={block.miner}>
        <Link href={'/address/' + block.miner}>{block.miner}</Link>
        <ClipboardCopyButton str={block.miner} />
      </div>,
    ],
    ['Gas Limit', block.gasLimit.toString() + ' ' + constants.symbolGwei],
    ['Gas Used', block.gasUsed.toString() + ' ' + constants.symbolGwei],
    ['Base Fee / Gas', block.baseFeePerGas.toString() + ' ' + constants.symbolGwei],
    ['Nonce', block.nonce],
    ['Transactions', block.transactions.length],
  ];
  return (
    <div>
      <BackButton />
      <div className="white-card">
        <div className="white-card-title">Block</div>
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(vals => (
                <tr key={vals[0]} className="border-b">
                  <td>
                    <b>{vals[0]}</b>
                  </td>
                  <td>{vals[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="white-card mt-8">
        <div className="white-card-title">Transactions within the block</div>
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th>
                  <div className="table-header-cell">Hash</div>
                </th>
                <th>
                  <div className="table-header-cell">From</div>
                </th>
                <th>
                  <div className="table-header-cell">To</div>
                </th>
                <th>
                  <div className="table-header-cell">Block</div>
                </th>
                <th>
                  <div className="table-header-cell">Timestamp</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {block.transactions.map((tx, i) => (
                <BlockTxViewCompactRow key={i} tx={tx} block={block} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BlockTxViewCompactRow: FC<{tx: TxType; block: BlockType}> = ({tx, block}) => {
  return (
    <tr className="border-t">
      <td>
        <div className="table-hash-link justify-center">
          <Link href={'/transaction/' + tx.hash}>{truncateHex(tx.hash)}</Link>
          <ClipboardCopyButton str={tx.hash} />
        </div>
      </td>
      <td>
        <div className="table-hash-link justify-center">
          <Link href={'/address/' + tx.from}>{addressToKnownAddress(tx.from, true)}</Link>
          <ClipboardCopyButton str={tx.from} />
        </div>
      </td>
      <td>
        {tx.to ? (
          <div className="table-hash-link justify-center">
            <Link href={'/address/' + tx.to}>{addressToKnownAddress(tx.to, true)}</Link>
            <ClipboardCopyButton str={tx.to} />
          </div>
        ) : (
          <div className="table-content">📝 Creation</div>
        )}
      </td>
      <td>
        <div className="flex justify-center items-center">
          <div className="bg-primary-50 rounded-lg py-2 px-3 my-2">
            <Link href={'/block/' + tx.blockNumber}>{tx.blockNumber}</Link>
          </div>
        </div>
      </td>
      <td>
        <div className="flex justify-center items-center my-2">{block?.timestamp?.toLocaleString() || '-'}</div>
      </td>
    </tr>
  );
};

export default BlockViewFull;
