import { useState } from "react";

type PaginationProp = {
  onPageChanged: Function;
  totalRecords: number;
  pageSize: number;
  pageLimit: number;
};

export const Pagination = (props: PaginationProp) => {
  const { totalRecords, pageLimit, pageSize } = props;
  const [currentPage, setCurrentPage] = useState(1);
  // Tổng số page (làm tròn lên)
  const totalPages = Math.ceil(totalRecords / pageSize);

  // Trang bắt đầu và trang kết thúc khi hiển thị
  let startPageIndex = Math.max(currentPage - pageLimit, 1);
  let endPageIndex = Math.min(currentPage + pageLimit, totalPages);

  const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  };

  const pages = range(startPageIndex, endPageIndex);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    props.onPageChanged(pageNumber);
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={"page-item" + (currentPage === 1 ? " disabled" : "")}>
          <button
            className="page-link"
            tabIndex={-1}
            onClick={() => handleClick(currentPage - 1)}
          >
            Trước
          </button>
        </li>
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              className={`page-item ${currentPage === page ? " active" : ""}`}
            >
              <button className="page-link" onClick={() => handleClick(page)}>
                {page}
              </button>
            </li>
          );
        })}
        <li
          className={
            "page-item" + (currentPage === totalPages ? " disabled" : "")
          }
        >
          <button className="page-link" onClick={() => handleClick(totalPages)}>
            Sau
          </button>
        </li>
      </ul>
    </nav>
  );
};
