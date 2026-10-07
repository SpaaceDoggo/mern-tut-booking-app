type Props = {
  page: number;
  pages: number;
  onChangePage: (page: number) => void;
};

function Pagination({ page, pages, onChangePage }: Props) {


  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: pages }).map((_, i) => (
        <div
          className={`border border-slate-300 rounded-sm px-2 py-1 cursor-pointer ${page === i + 1 ? "bg-blue-500" : ""}`}
          onClick={() => onChangePage(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
