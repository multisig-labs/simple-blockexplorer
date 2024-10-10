import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import {useClientContext} from '../context/client.context';

interface RpcWrapperProps {
  children: React.ReactNode;
}

const RpcWrapper: React.FC<RpcWrapperProps> = ({children}) => {
  const router = useRouter();
  const [lastRpc, setLastRpc] = useState<string | null>(null);

  const {updateClient} = useClientContext();
  const {rpc} = router.query;

  useEffect(() => {
    const update = async () => {
      if (rpc && rpc !== lastRpc) {
        const success = await updateClient(rpc as string);
        console.log({success});
        if (success) {
          setLastRpc(rpc as string); // Only update lastRpc if successful
        }
      }
    };

    if (rpc) {
      console.log('rpc', rpc);
      update();
    }
  }, [updateClient, rpc, lastRpc]);

  return <div>{children}</div>;
};

export default RpcWrapper;
