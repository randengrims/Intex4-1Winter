interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    const generatePageNumbers = () => {
      const pages: (number | string)[] = [];
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1); // Always show first page
  
        if (currentPage > 2) pages.push('...');
  
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = start; i <= end; i++) pages.push(i);
  
        if (currentPage < totalPages - 1) pages.push('...');
  
        pages.push(totalPages); // Always show last page
      }
  
      return pages;
    };
  
    return (
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex gap-2 mb-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
  
          {generatePageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                disabled={page === currentPage}
                className={page === currentPage ? 'font-bold underline' : ''}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`}>...</span>
            )
          )}
  
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
  
        <label>
          Results per Page:
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="ml-2"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    );
  };
  
  export default Pagination;
  