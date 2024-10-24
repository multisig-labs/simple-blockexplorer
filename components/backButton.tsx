import Link from 'next/link';
import {FiChevronLeft} from 'react-icons/fi';

export const BackButton = ({path}: {path: string}) => {
  return (
    <div className="-mt-8 mb-2 hover:cursor-pointer">
      <Link href={path} className="link mt-10 flex flex-row items-center !no-underline ">
        <div className="flex flex-row items-center">
          <FiChevronLeft size={20} />
          Back
        </div>
      </Link>
    </div>
  );
};
