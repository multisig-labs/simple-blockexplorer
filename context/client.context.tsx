import axios from 'axios';
import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {RPCClient} from '../api/rpc';

type ClientContextType = {
  client: RPCClient;
  updateClient: (rpcUrl: string) => Promise<boolean>;
};
const defaults: ClientContextType = {
  client: new RPCClient('http://localhost:8545', 31337), // default client
  updateClient: async (rpcUrl: string) => false, // dummy function
};
const ClientContext = createContext<ClientContextType>(defaults);

export const ClientContextWrapper: FC<{children: ReactNode}> = ({children}) => {
  const [client, setClient] = useState<RPCClient>(defaults.client);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function updateClient(rpcUrl: string): Promise<boolean> {
    try {
      const res = await axios.post(rpcUrl, {
        jsonrpc: '2.0',
        method: 'net_version',
        params: [],
        id: 1,
      });

      // Ensure the result exists and is a valid integer
      const responseChainId = parseInt(res?.data?.result, 10);
      if (isNaN(responseChainId)) {
        throw new Error(`Invalid chain ID received: ${res?.data?.result}`);
      }

      setClient(new RPCClient(rpcUrl, responseChainId));
      return true;
    } catch (err) {
      console.error(`Failed to update client for ${rpcUrl}:`, err);
      return false;
    }
  }

  return (
    <ClientContext.Provider
      value={{
        client,
        updateClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export function useClientContext() {
  return useContext(ClientContext);
}
