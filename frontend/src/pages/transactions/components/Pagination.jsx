import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  totalItems,
  onPageChange, 
  onPageSizeChange 
}) => {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages?.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages?.push(i);
        pages?.push('...');
        pages?.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages?.push(1);
        pages?.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages?.push(i);
      } else {
        pages?.push(1);
        pages?.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages?.push(i);
        pages?.push('...');
        pages?.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full lg:w-auto">
        <span className="text-sm text-muted-foreground font-caption whitespace-nowrap">
          Showing {startItem}-{endItem} of {totalItems}
        </span>
        <div className="w-full sm:w-40">
          <Select
            options={pageSizeOptions}
            value={pageSize?.toString()}
            onChange={(value) => onPageSizeChange(parseInt(value))}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        />

        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-1.5 text-sm text-muted-foreground font-caption">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`
                    px-3 py-1.5 rounded-md text-sm font-caption font-medium transition-all duration-250
                    ${currentPage === page 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="sm:hidden">
          <span className="px-3 py-1.5 text-sm font-caption text-foreground">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        />
      </div>
    </div>
  );
};

export default Pagination;