import Link from 'next/link';
import type {FC} from 'react';
import type {TxType} from '../types/blockchain';
import {addressToKnownAddress, truncateHex} from '../utilities';
import ClipboardCopyButton from './copiableString';

const TxViewCompactTable: FC<{txs: TxType[]; isShowAll?: boolean}> = ({txs, isShowAll = true}) => {
  return (
    <div className="w-full flex flex-col justify-center main-table py-4 my-4">
      <div className="w-full text-center font-bold text-xl">Transactions</div>
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <table className="main-table my-4">
          <thead className="table-header">
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
                <div className="table-header-cell">Time</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {txs.map((b, i) => (
              <TxViewCompactRow key={i} tx={b} />
            ))}
          </tbody>
        </table>
      </div>
      {isShowAll && (
        <div className="text-lg text-primary-600 text-center font-bold">
          <Link href={'/transaction/all'} passHref>
            See all Transactions
          </Link>
        </div>
      )}
    </div>
  );
};

const TxViewCompactRow: FC<{tx: TxType}> = ({tx}) => {
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
        <div className="flex justify-center items-center my-2">{tx.timestamp?.toLocaleString() || '-'}</div>
      </td>
    </tr>
  );
};

export default TxViewCompactTable;
