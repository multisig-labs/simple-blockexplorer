import {FC, useEffect, useState} from 'react';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

const PaginationUnbounded: FC<{onChange: (page: number) => void; disableLeft: boolean; disableRight: boolean}> = ({
  onChange,
  disableRight,
  disableLeft,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => onChange(page), [page]);

  return (
    <div className="flex flex-row gap-2">
      <button onClick={() => setPage(page - 1)} disabled={page == 1 || disableLeft}>
        <FiChevronLeft size={24} />
      </button>
      <div>{page}</div>
      <button onClick={() => setPage(page + 1)} disabled={disableRight}>
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default PaginationUnbounded;
