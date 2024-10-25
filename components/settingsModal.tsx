import {NumberInput, Text, ActionIcon, Modal, Stack, TextInput, Button, Title} from '@mantine/core';
import {IconSettings} from '@tabler/icons';
import {FC, useState} from 'react';
import {useClientContext} from '../context/client.context';
import KnownAddressesTable from './knownAddressesTable';

const SettingsModal: FC = () => {
  const {client, updateClient} = useClientContext();
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rpcUrlInput, setRpcUrlInput] = useState('');
  const [chainIdInput, setChainIdInput] = useState(1);

  async function handleConnect() {
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
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<div className="text-2xl font-semibold font-sans">Settings</div>}
        size="xl"
      >
        <div className="flex flex-col gap-4">
          {hasError && (
            <div className="text-red-600 font-sans">Could not connect to host OR the chain ID is wrong.</div>
          )}
          <div>
            <div className="font-bold font-sans">RPC URL</div>
            <div className="text-xs">Current: {client.URL}</div>
          </div>
          <input
            placeholder="http://localhost:8545"
            value={rpcUrlInput}
            onChange={event => setRpcUrlInput(event.currentTarget.value)}
            className="border-primary-50 border-[1px] text-sm rounded-full px-2 py-1"
          />
          <div className="w-full">
            <div className="font-bold font-sans">Chain ID</div>
            <div className="text-xs">Current: {client.chainId}</div>
          </div>
          <input
            disabled
            placeholder={client.chainId.toString()}
            className="border-primary-50 border-[1px] text-grey text-sm rounded-full px-2 py-1"
          />
          <button className="primary-button" onClick={handleConnect}>
            Connect
          </button>

          <Title order={5}>Known Addresses</Title>
          <KnownAddressesTable />
        </div>
      </Modal>
      <ActionIcon disabled={opened} onClick={() => setOpened(true)}>
        <IconSettings stroke={1.2} size={24} color="#5D53CF" />
      </ActionIcon>
    </>
  );
};

export default SettingsModal;
