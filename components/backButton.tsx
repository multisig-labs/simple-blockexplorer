import Link from 'next/link';
import {useRouter} from 'next/router';
import {FiChevronLeft} from 'react-icons/fi';

export const BackButton = () => {
  const router = useRouter();

  return (
    <div className="-mt-8 mb-2 hover:cursor-pointer">
      <button onClick={router.back} className="button mt-10 flex flex-row items-center !no-underline ">
        <div className="flex flex-row items-center">
          <FiChevronLeft size={20} />
          Back
        </div>
      </button>
    </div>
  );
};
