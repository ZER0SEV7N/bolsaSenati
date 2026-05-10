import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

// T: Es el tipo de dato que representa cada fila de la tabla
export interface ColumnProps<T> {
  key: string;
  header: string;
  className?: string;
  cellClassName?: string;
  render?: (row: T) => ReactNode;
}

// Props para el componente genérico de tabla
interface GenericTableProps<T> {
  columns: ColumnProps<T>[];
  data: T[];
}

export function GenericTable<T>({ columns, data }: GenericTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className={column.className}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={`${rowIndex}-${column.key}`}
                  className={column.cellClassName}
                >
                  {column.render
                    ? column.render(row)
                    : (row[column.key as keyof T] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center h-24">
              No hay resultados.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
