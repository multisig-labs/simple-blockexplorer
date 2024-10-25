import type {FC} from 'react';
import constants from '../constants';
import ClipboardCopyButton from './copiableString';

const KnownAddressesTable: FC = () => {
  return (
    <table>
      <tbody>
        {Object.keys(constants.knownAddresses).map(key => (
          <tr key={key} className="border-b">
            <td>
              {
                // @ts-ignore
                constants.knownAddresses[key]
              }
            </td>
            <td>
              <div className="flex flex-row items-center gap-2 font-mono">
                {key}
                {/* @ts-ignore */}
                <ClipboardCopyButton str={constants.knownAddresses[key]} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KnownAddressesTable;
