import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="mt-16 h-[100px] max-h-[100px] w-full bg-white px-8 py-8 lg:px-8 xl:px-24">
      <div className="mx-4">
        <div className="flex flex-row items-center justify-between">
          <div className="space-y-8">
            <div className="flex flex-row items-center">
              <div className="text-2xl font-bold flex flex-row">
                <Link href="/">SBE 👓</Link>
              </div>
              <span className="ml-2 text-black">© 2024</span>
            </div>
          </div>
          <Link href="https://gogopool.com">
            <div className="flex items-center text-center text-black hover:cursor-pointer">
              <span className="mr-2">Brought to you by</span>
              <Image alt="ggp balloon" className="inline" src="/balloon.svg" height={18} width={16} />
              <span className="ml-2">GoGoPool</span>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};
