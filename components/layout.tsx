import type {FC, ReactNode} from 'react';
import Header from './header';
import {Footer} from './footer';

const Layout: FC<{
  children: ReactNode;
}> = ({children}) => {
  return (
    <div className="flex flex-col h-full w-full justify-center">
      <Header />
      <div className="w-full min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
