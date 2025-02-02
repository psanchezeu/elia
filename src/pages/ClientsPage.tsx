import { useState, useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { Client } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Upload, Search } from 'lucide-react';
import { toast } from 'sonner';

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'razonSocial',
    header: 'Razón Social',
  },
  {
    accessorKey: 'actividadPrincipal',
    header: 'Actividad Principal',
  },
  {
    accessorKey: 'paginaWeb',
    header: 'Página Web',
    cell: ({ row }) => (
      <a
        href={row.original.paginaWeb}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {row.original.paginaWeb}
      </a>
    ),
  },
  {
    accessorKey: 'ventas',
    header: 'Ventas',
    cell: ({ row }) => 
      new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
      }).format(row.original.ventas),
  },
  {
    accessorKey: 'municipio',
    header: 'Municipio',
  },
  {
    accessorKey: 'direccion',
    header: 'Dirección',
  },
  {
    accessorKey: 'codigoPostal',
    header: 'Código Postal',
  },
  {
    accessorKey: 'telefono',
    header: 'Teléfono',
  },
  {
    accessorKey: 'email',
    header: 'Correo Electrónico',
  },
  {
    accessorKey: 'nif',
    header: 'NIF',
  },
  {
    accessorKey: 'empleados',
    header: 'Empleados',
  },
  {
    accessorKey: 'personaContacto',
    header: 'Persona de Contacto',
  },
];

export function ClientsPage() {
  const [data, setData] = useState<Client[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(header => header.trim());
      
      const clients: Client[] = rows.slice(1).map((row, index) => {
        const values = row.split(',').map(value => value.trim());
        const client: any = {
          id: (index + 1).toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        headers.forEach((header, i) => {
          const value = values[i] || '';
          switch (header.toLowerCase()) {
            case 'razón social':
              client.razonSocial = value;
              break;
            case 'actividad principal':
              client.actividadPrincipal = value;
              break;
            case 'página web':
              client.paginaWeb = value;
              break;
            case 'ventas':
              client.ventas = parseFloat(value) || 0;
              break;
            case 'municipio':
              client.municipio = value;
              break;
            case 'dirección':
              client.direccion = value;
              break;
            case 'código postal':
              client.codigoPostal = value;
              break;
            case 'teléfono':
              client.telefono = value;
              break;
            case 'correo electrónico':
              client.email = value;
              break;
            case 'nif':
              client.nif = value;
              break;
            case 'empleados':
              client.empleados = parseInt(value) || 0;
              break;
            case 'persona contacto':
              client.personaContacto = value;
              break;
          }
        });

        return client as Client;
      });

      setData(clients);
      toast.success(`Se han importado ${clients.length} clientes correctamente`);
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      toast.error('Error al procesar el archivo. Por favor, verifica el formato.');
    }

    // Limpiar el input para permitir cargar el mismo archivo nuevamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button 
            onClick={handleImportClick}
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="mr-2 h-4 w-4" />
            Importar Clientes
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-lg border shadow-sm overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}