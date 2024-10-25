import {FC, useEffect, useState} from 'react';
import {useClientContext} from '../context/client.context';
import KnownAddressesTable from './knownAddressesTable';
import {IoSettingsOutline} from 'react-icons/io5';

const SettingsModal: FC = () => {
  const {client, updateClient} = useClientContext();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rpcUrlInput, setRpcUrlInput] = useState('');
  const [chainIdInput, setChainIdInput] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleConnect(e: React.MouseEvent<HTMLButtonElement>) {
    e?.preventDefault();
    setHasError(false);
    setIsLoading(true);
    const success = await updateClient(rpcUrlInput);
    setIsLoading(false);
    if (!success) {
      setHasError(true);
    }
  }
  return (
    <>
      <button
        className="ml-2"
        onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement)?.showModal()}
      >
        <IoSettingsOutline />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-full lg:w-[650px] max-w-[90%]">
          <form method="dialog">
            <div className="text-2xl font-semibold font-sans mb-4">Settings</div>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex flex-col gap-4">
            {hasError && (
              <div className="text-red-600 font-sans">Could not connect to host OR the chain ID is wrong.</div>
            )}
            <div>
              <div className="font-bold font-sans">RPC URL</div>
              <div className="text-xs">Current: {isMounted ? client.URL : 'Loading...'}</div>
            </div>
            <input
              placeholder="http://localhost:8545"
              value={rpcUrlInput}
              onChange={event => setRpcUrlInput(event.currentTarget.value)}
              className="border-primary-50 border-[1px] text-sm rounded-full px-2 py-1"
            />
            <div className="w-full">
              <div className="font-bold font-sans">Chain ID</div>
              <div className="text-xs">Current: {isMounted ? client.chainId : 'Loading...'}</div>
            </div>
            <input
              disabled
              onChange={event => setChainIdInput(Number(event.currentTarget.value))}
              placeholder={client.chainId.toString()}
              className="border-primary-50 border-[1px] text-grey text-sm rounded-full px-2 py-1"
            />
            <button className="primary-button" onClick={handleConnect} disabled={isLoading}>
              Connect
            </button>
            <div className="font-bold">Known Addresses</div>
            <KnownAddressesTable />
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SettingsModal;
