import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

export const TanstackTable = ({ data, columns, onRowClick, searchParams }) => {
  const filterData = useMemo(() => {
    if (data == [] || !data) {
      return [];
    } else {
      return data.filter((row) => {
        return Object.values(row).some((value) =>
          value.toString().toLowerCase().includes(searchParams.toLowerCase())
        );
      });
    }
  }, [data, searchParams]);

  const table = useReactTable({
    data: filterData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <table className="border w-full">
        <thead className="bg-slate-700 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-5 self-start">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:cursor-pointer hover:opacity-40 border-b"
              onClick={() => onRowClick(row.getValue(row))}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.column.id} className="p-5 self-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <td key={footer.id}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  );
};
