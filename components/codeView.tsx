import type {FC} from 'react';
import {ViewType} from './txViewFull';

function hexToUtf8(hex: string) {
  // Remove the leading '0x' if it exists
  if (hex.startsWith('0x')) {
    hex = hex.slice(2);
  }

  // Convert the hex string to bytes
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }

  // Convert bytes to a UTF-8 string
  const utf8String = new TextDecoder().decode(new Uint8Array(bytes));
  return utf8String;
}

const CodeView: FC<{code: string; value?: ViewType | null}> = ({code, value}) => {
  console.log({value});
  if (code == '0x') {
    return <i>No code.</i>;
  } else
    return (
      <div className="h-[200px] w-full p-8 overflow-x-scroll bg-gray-200 rounded-lg">
        <div className="break-all w-full overflow-hidden font-mono ">
          {value === ViewType.hexadecimal ? code : hexToUtf8(code)}
        </div>
      </div>
    );
};

export default CodeView;
