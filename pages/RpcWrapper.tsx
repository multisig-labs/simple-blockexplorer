import {useRouter} from 'next/router';
import React, {useEffect} from 'react';
import {useClientContext} from '../context/client.context';

interface RpcWrapperProps {
  children: React.ReactNode;
}

const RpcWrapper: React.FC<RpcWrapperProps> = ({children}) => {
  const router = useRouter();

  const {updateClient} = useClientContext();
  const {rpc} = router.query;

  useEffect(() => {
    const update = async () => {
      const success = await updateClient(rpc as string);
      console.log({success});
    };

    console.log(rpc);
    if (rpc) update();
  }, [updateClient, rpc]);

  return <div>{children}</div>;
};

export default RpcWrapper;
