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
         header: "Salary",
         accessorKey: "salary",
      },
      {
         header: "Demo Date",
         accessorKey: "demoDate(delete)",
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
         <h3>Basic Table</h3>
         <div className="max-w-[600px] mx-auto">
            <input
               type="text"
               className="border rounded-none p-2"
               value={filtering}
               onChange={(e) => setFiltering(e.target.value)}
            />
            <table>
               <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th
                              className="border p-2"
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
               <tbody>
                  {table.getRowModel().rows.map((row) => (
                     <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                           <td className="border p-2" key={cell.id}>
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
            <div>
               <button
                  className="border p-2 border-black"
                  onClick={() => table.setPageIndex(0)}
               >
                  First page
               </button>
               <button
                  className="border p-2 border-black"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
               >
                  Previous page
               </button>
               <button
                  className="border p-2 border-black"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
               >
                  Next page
               </button>
               <button
                  className="border p-2 border-black"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
               >
                  Last page
               </button>

               {/* Pagination Status and Page Size Selector */}
               <div>
                  <span>
                     Page{" "}
                     <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                     </strong>{" "}
                  </span>
                  <span>
                     | Go to page:{" "}
                     <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                           const page = e.target.value
                              ? Number(e.target.value) - 1
                              : 0;
                           table.setPageIndex(page);
                        }}
                        style={{ width: "100px" }}
                     />
                  </span>
                  <select
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
      </div>
   );
};

PaymentHistoryTable.propTypes = {
   payments: PropTypes.array.isRequired,
};

export default PaymentHistoryTable;
