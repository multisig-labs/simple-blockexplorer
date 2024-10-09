import axios from 'axios';
import {createContext, FC, ReactNode, useContext, useState} from 'react';
import {RPCClient} from '../api/rpc';
import {getCookie, setCookie} from 'cookies-next';

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
  const rpcUrlCookie = getCookie('rpcUrl')?.toString();
  const rpcUrlChainId = Number(getCookie('rpcChainId'));

  const cookieRpcClient = rpcUrlCookie ? new RPCClient(rpcUrlCookie, rpcUrlChainId) : null;
  const [client, setClient] = useState<RPCClient>(cookieRpcClient || defaults.client);

  async function updateClient(rpcUrl: string): Promise<boolean> {
    const fetchChainId = async (url: string) => {
      const res = await axios.post(url, {
        jsonrpc: '2.0',
        method: 'net_version',
        params: [],
        id: 1,
      });
      const responseChainId = parseInt(res?.data?.result, 10);
      if (isNaN(responseChainId)) throw new Error(`Invalid chain ID: ${res?.data?.result}`);
      return responseChainId;
    };

    try {
      const responseChainId = await fetchChainId(rpcUrl);
      if (rpcUrl !== rpcUrlCookie || !rpcUrlChainId) {
        setCookie('rpcUrl', rpcUrl);
        setCookie('rpcChainId', responseChainId);
      }
      setClient(new RPCClient(rpcUrl, responseChainId));
      return true;
    } catch (err) {
      console.error(`Failed to update client for ${rpcUrl}:`, err);

      return false;
    }
  }

  return <ClientContext.Provider value={{client, updateClient}}>{children}</ClientContext.Provider>;
};

export function useClientContext() {
  return useContext(ClientContext);
}
