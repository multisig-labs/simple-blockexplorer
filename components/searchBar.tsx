import {FC, useEffect, useState} from 'react';
import {useClientContext} from '../context/client.context';
import {BiSearch} from 'react-icons/bi';

const SearchBar: FC = () => {
  const {client} = useClientContext();
  const [input, setInput] = useState('');
  const [href, setHref] = useState('');

  // update href dynamically to route the user on click
  useEffect(() => {
    setHref('');
    if (input.slice(0, 2) == '0x') {
      if (input.length == 42) {
        // input is address
        setHref('/address/' + input);
      } else if (input.length == 66) {
        // input is block / tx hash
        client
          .getTxByHash(input)
          .then(() => {
            setHref('/transaction/' + input);
          })
          .catch(() => {
            setHref('/block/' + input);
          });
      }
    } else {
      // input is a block number
      const num = parseInt(input);
      if (!Number.isNaN(num)) setHref('/block/' + num);
    }
  }, [input]);

  const isDisabled = href == '';

  return (
    <div className="relative w-[60%]">
      <input
        placeholder="address / block hash / block height / transaction hash"
        value={input}
        onChange={event => setInput(event.currentTarget.value)}
        className="w-full p-1 pl-2 rounded-full border-primary-50 border-[1px]"
      />
      <BiSearch className="absolute hidden md:block right-[10px] top-[10px]" />
    </div>
  );
};

export default SearchBar;
