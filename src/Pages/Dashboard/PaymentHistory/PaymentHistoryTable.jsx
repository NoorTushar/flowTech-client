import {
   useReactTable,
   getCoreRowModel,
   flexRender,
   getPaginationRowModel,
   getSortedRowModel,
   getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const PaymentHistoryTable = ({ payments }) => {
   const data = useMemo(() => payments, [payments]);
   const [sorting, setSorting] = useState([]);
   const [filtering, setFiltering] = useState("");
   // Added pagination state to manage page index and page size
   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

   const columns = [
      {
         header: "Month",
         accessorKey: "month",
      },
      {
         header: "Year",
         accessorKey: "year",
      },
      {
         header: "Amount",
         accessorKey: "salary",
      },
      {
         header: "Pay Date",
         accessorKey: "date",
         cell: (info) => {
            const date = new Date(info.getValue());
            return date.toLocaleDateString();
         },
      },
   ];

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),

      // Added pagination to the table state
      state: {
         sorting: sorting,
         globalFilter: filtering,
         pagination: pagination,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,

      // Added handler to change pagination state
      onPaginationChange: setPagination,
   });

   console.log(table.getHeaderGroups());

   return (
      <div>
         <div className="flex items-center gap-2 mb-6">
            <p className="text-white">Filter:</p>
            <input
               type="text"
               placeholder="Filter anything"
               className="rounded-none p-2 bg-ourLighterBlack text-white outline-none"
               value={filtering}
               onChange={(e) => setFiltering(e.target.value)}
            />
         </div>
         <div className="overflow-x-auto">
            <table className="table border">
               <thead className="text-ourPrimary bg-ourLighterBlack">
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id} className="*:p-6">
                        {headerGroup.headers.map((header) => (
                           <th
                              className=""
                              key={header.id}
                              onClick={header.column.getToggleSortingHandler()}
                           >
                              {flexRender(
                                 header.column.columnDef.header,
                                 header.getContext()
                              )}
                              {
                                 { asc: "🔼", desc: "🔽" }[
                                    header.column.getIsSorted() ?? null
                                 ]
                              }
                           </th>
                        ))}
                     </tr>
                  ))}
               </thead>
               <tbody className="bg-ourLighterBlack">
                  {table.getRowModel().rows.map((row) => (
                     <tr key={row.id} className="text-ourAsh *:px-6 *:py-3">
                        {row.getVisibleCells().map((cell) => (
                           <td className="" key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {/* Pagination Buttons */}
         <div className="flex items-center gap-2 flex-wrap text-ourAsh my-4">
            <button
               onClick={() => table.setPageIndex(0)}
               className="p-2 relative group overflow-hidden  bg-transparent text-ourPrimary inline-block custom-next border-ourPrimary border hover:border-white"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
               <span className="relative group-hover:text-ourPrimary">
                  FIRST PAGE
               </span>
            </button>
            <button
               disabled={!table.getCanPreviousPage()}
               onClick={() => table.previousPage()}
               className="p-2 relative group overflow-hidden  bg-transparent text-ourPrimary inline-block custom-next border-ourPrimary border hover:border-white"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
               <span className="relative group-hover:text-ourPrimary">
                  <GrFormPreviousLink className="text-2xl" />
               </span>
            </button>
            {/* Next Page Button */}
            <button
               disabled={!table.getCanNextPage()}
               onClick={() => table.nextPage()}
               className="p-2  relative group overflow-hidden  bg-transparent text-ourPrimary inline-block custom-next border-ourPrimary border hover:border-white"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
               <span className="relative group-hover:text-ourPrimary">
                  <GrFormNextLink className="text-2xl" />
               </span>
            </button>

            <button
               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               className="p-2 relative group overflow-hidden  bg-transparent text-ourPrimary inline-block custom-next border-ourPrimary border hover:border-white"
            >
               <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-white group-hover:h-full opacity-90"></span>
               <span className="relative group-hover:text-ourPrimary">
                  Last PAGE
               </span>
            </button>
            {/* Pagination Status and Page Size Selector */}
            <div className="flex items-center flex-wrap gap-2">
               <h2>
                  Page:{" "}
                  <span className="text-ourPrimary ">
                     {table.getState().pagination.pageIndex + 1} of{" "}
                     {table.getPageCount()}
                  </span>{" "}
               </h2>
               <h3>
                  | Go to page:{" "}
                  <input
                     type="text"
                     defaultValue={table.getState().pagination.pageIndex + 1}
                     onChange={(e) => {
                        const page = e.target.value
                           ? Number(e.target.value) - 1
                           : 0;
                        table.setPageIndex(page);
                     }}
                     style={{ width: "60px" }}
                     className="rounded-none p-2 bg-ourLighterBlack text-white outline-none"
                  />
               </h3>
               <select
                  className="rounded-none p-2 bg-ourLighterBlack text-ourAsh outline-none"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                     table.setPageSize(Number(e.target.value));
                  }}
               >
                  {[5, 10, 20, 50].map((pageSize) => (
                     <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   );
};

PaymentHistoryTable.propTypes = {
   payments: PropTypes.array.isRequired,
};

export default PaymentHistoryTable;
