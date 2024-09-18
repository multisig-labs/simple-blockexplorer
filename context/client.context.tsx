import axios from 'axios';
import {createContext, FC, ReactNode, useContext, useState} from 'react';
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
  return (
    <ClientContext.Provider
      value={{
        client,
        updateClient: async (rpcUrl: string) => {
          try {
            const res = await axios.post(rpcUrl, {
              jsonrpc: '2.0',
              method: 'net_version',
              params: [],
              id: 1,
            });
            // console.log(res);
            const responseChainId = parseInt(res.data.result);
            setClient(new RPCClient(rpcUrl, responseChainId));
            return true;
          } catch (err) {
            return false;
          }
        },
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export function useClientContext() {
  return useContext(ClientContext);
}
