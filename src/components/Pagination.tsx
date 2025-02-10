import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4">
      {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
      )}

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={currentPage === pageNumber ? 'bg-blue-500 text-white' : ''} // Highlight current page
        >
          {pageNumber}
        </Button>
      ))}

      {currentPage < totalPages && (
        <Button onClick={() => onPageChange(currentPage + 1)}>Next</Button>
      )}
    </div>
  );
};

export default Pagination;