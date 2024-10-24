import {Box, ScrollArea, Table, Text, Title} from '@mantine/core';
import {formatEther} from 'ethers/lib/utils';
import {FC, ReactNode, useEffect, useState} from 'react';
import constants from '../constants';
import {useClientContext} from '../context/client.context';
import {TxReceiptType, TxType} from '../types/blockchain';
import {addressToKnownAddress} from '../utilities';
import CodeView from './codeView';
import LinkableString from './linkableString';
import {BackButton} from './backButton';
import Link from 'next/link';
import ClipboardCopyButton from './copiableString';

const TxViewFull: FC<{tx: TxType}> = ({tx}) => {
  const {client} = useClientContext();
  const [receipt, setReceipt] = useState<TxReceiptType>();

  useEffect(() => {
    client.getTxReceipt(tx.hash).then(r => setReceipt(r));
  }, [client, tx.hash]);

  console.log(tx);
  let data: [string, ReactNode][] = [
    ['Hash', <Text key="hash">{tx.hash}</Text>],
    [
      'From',
      <div className="table-hash-link">
        <Link href={'/address/' + tx.from}>{addressToKnownAddress(tx.from)}</Link>
        <ClipboardCopyButton str={tx.from} />
      </div>,
    ],
    [
      'To',
      tx.to ? (
        <div className="table-hash-link">
          <Link href={'/address/' + tx.to}>{addressToKnownAddress(tx.to)}</Link>
          <ClipboardCopyButton str={tx.to} />
        </div>
      ) : (
        <i>Contract Creation</i>
      ),
    ],
    ['Value', formatEther(tx.value) + ' ' + constants.symbolEth],
    [
      'Block Hash',
      <div className="table-hash-link">
        <Link href={'/block/' + tx.blockHash}>{tx.blockHash}</Link>
        <ClipboardCopyButton str={tx.blockHash} />
      </div>,
    ],
    [
      'Block Number',
      <div className="table-hash-link">
        <Link href={'/block/' + tx.blockNumber}>{tx.blockNumber}</Link>
      </div>,
    ],
    ['Transaction Index', tx.transactionIndex],
    ['Gas Used', tx.gas.toString() + ' ' + constants.symbolGwei],
    ['Gas Price', tx.gasPrice.toString() + ' ' + constants.symbolWei],
  ];
  let receiptData: [string, ReactNode][] = receipt
    ? [
        ['Status', receipt.status ? 'Success 🟢' : 'Failure 🔴'],
        [
          'Contract Address',
          receipt.contractAddress ? (
            <div className="table-hash-link">
              <Link href={'/address/' + receipt.contractAddress}>{receipt.contractAddress}</Link>
              <ClipboardCopyButton str={receipt.contractAddress} />
            </div>
          ) : (
            'None'
          ),
        ],
        ['Logs', receipt.logs.length],
        // ['Bloom Filter', receipt.logsBloom],
      ]
    : [['Status', 'Pending ⌛']];
  return (
    <>
      <BackButton path="/transaction/all" />
      <div className="white-card">
        <div className="white-card-title">Transaction</div>
        <div className="w-full overflow-x-auto overflow-y-hidden">
          <table className="min-w-full">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.concat(receiptData).map(vals => (
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
        <div className="white-card-title flex flex-row items-center gap-2">
          Transaction Data <ClipboardCopyButton str={tx.input} />
        </div>
        <CodeView code={tx.input} />
      </div>
    </>
  );
};

export default TxViewFull;
