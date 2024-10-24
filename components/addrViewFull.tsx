import {formatEther} from 'ethers/lib/utils';
import {FC, ReactNode} from 'react';
import constants from '../constants';
import {AddrType} from '../types/blockchain';
import {addressToKnownAddress} from '../utilities';
import CodeView from './codeView';
import ClipboardCopyButton from './copiableString';

import {FiChevronLeft} from 'react-icons/fi';
import {BackButton} from './backButton';

const AddrViewFull: FC<{addr: AddrType}> = ({addr}) => {
  let data: [string, ReactNode][] = [
    [
      'Name',
      <div className="table-hash-link">
        {addressToKnownAddress(addr.address)}
        <ClipboardCopyButton str={addr.address} />
      </div>,
    ],
    [
      'Address',
      <div className="table-hash-link">
        {addr.address}
        <ClipboardCopyButton str={addr.address} />
      </div>,
    ],
    ['Balance', formatEther(addr.balance).toLocaleString() + ' ' + constants.symbolEth],
    ['Nonce', addr.nonce],
  ];

  return (
    <div>
      <BackButton />
      <div className="white-card">
        <div className="white-card-title">Address</div>
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
                <tr key={vals[0]} className="border-t">
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
        <div className="white-card-title">Code</div>
        <CodeView code={addr.code} />
      </div>
    </div>
  );
};

export default AddrViewFull;
