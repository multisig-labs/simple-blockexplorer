import Link from 'next/link';
import {FC} from 'react';
import SearchBar from './searchBar';
import SettingsModal from './settingsModal';

const Header: FC = () => {
  return (
    <div className="flex flex-row w-full justify-center">
      <div className="flex flex-row w-full justify-between mx-24 my-4">
        <div className="text-2xl font-bold w-[30%] flex flex-row">
          <Link href="/">SBE 👓</Link>
        </div>
        <div className="w-full flex flex-row items-center justify-end">
          <SearchBar />
          <SettingsModal />
        </div>
      </div>
    </div>
  );
};

export default Header;
