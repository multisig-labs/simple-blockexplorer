import {useState, type FC} from 'react';
import {BiCopy, BiSolidCopy} from 'react-icons/bi';

const ClipboardCopyButton: FC<{
  str: string;
}> = ({str}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };
  return (
    <button onClick={() => copyToClipboard(str)} className="p-1 bg-transparent border-none focus:outline-none">
      {copied ? (
        <BiSolidCopy size={20} className="text-primary-600 cursor-wait" />
      ) : (
        <BiCopy className="cursor-pointer text-grey-200" size={20} />
      )}
    </button>
  );
};

export default ClipboardCopyButton;
