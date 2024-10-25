import Layout from '../components/layout';
import Head from 'next/head';
import {NextPage} from 'next';

const Custom404: NextPage = () => {
  return (
    <div className="h-full w-full">
      <Head>
        <title>404</title>
      </Head>
      <Layout>
        <div className="flex w-full h-[80vh] justify-center items-center">
          <h1 className="text-2xl">Did you get lost?</h1>
        </div>
      </Layout>
    </div>
  );
};

export default Custom404;
