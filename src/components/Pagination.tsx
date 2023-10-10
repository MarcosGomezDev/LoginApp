interface Props {
  userPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalUsers: number;
}

export const Pagination: React.FC<Props> = ({
  userPerPage,
  currentPage,
  setCurrentPage,
  totalUsers,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onSelectPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <button className="pag-previous" onClick={onPreviousPage}>
          Anterior
        </button>
        <ul className="pagination-list">
          {pageNumbers.map((noPage) => (
            <li key={noPage}>
              <a
                className={`pagination-link ${
                  noPage === currentPage ? "is-current" : ""
                }`}
                onClick={() => onSelectPage(noPage)}
              >
                {noPage}
              </a>
            </li>
          ))}
        </ul>
        <button className="pag-next" onClick={onNextPage}>
          Siguiente
        </button>
      </nav>
    </div>
  );
};
