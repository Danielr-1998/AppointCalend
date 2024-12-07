import React from 'react';
import { useTable, useFilters, usePagination } from 'react-table';
import { usePage, useForm } from '@inertiajs/react'; // Usamos useForm para hacer la petición PUT
import { Cita } from '@/types/Cita';

// Filtro por columna (por defecto)
const DefaultColumnFilter = ({ column: { filterValue, setFilter } }: any) => (
  <input
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder={`Buscar...`}
    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

// Filtro para fecha (por defecto)
const DateColumnFilter = ({ column: { filterValue, setFilter } }: any) => (
  <input
    type="date"
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
    placeholder="Filtrar por fecha"
    className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

const ListCitas: React.FC = () => {
  const { citas } = usePage().props as { citas: Cita[] }; // Aseguramos que citas es un array de Cita

  // Usamos useForm para realizar la solicitud PUT
  const { put } = useForm();

  // Función para actualizar el estado de la cita utilizando Inertia (a través de useForm)
  const handleEstadoChange = (id: number, estado: string) => {
    console.log("estado", estado);
    
    // Usamos useForm.put para hacer la solicitud PUT
    put(`/citas/${id}/estado/${estado}`, {
      onSuccess: () => {
        console.log('Estado actualizado correctamente');
      },
      onError: (error) => {
        console.error('Error al actualizar estado:', error);
      }
    });
  };
  

  // Definir las columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'Fecha y Hora',
        accessor: 'fecha_hora',
        Cell: ({ value }: any) => new Date(value).toLocaleString(), // Formato de fecha
        Filter: DateColumnFilter, // Filtro para la columna de fecha
      },
      {
        Header: 'Descripción',
        accessor: 'descripcion',
        Filter: DefaultColumnFilter, // Filtro para la columna
      },
      {
        Header: 'Profesional',
        accessor: 'profesional.nombre', // Asegúrate de que el nombre del profesional esté bien accesible
        Filter: DefaultColumnFilter, // Filtro para la columna
      },
      {
        Header: 'Estado',
        accessor: 'estado', // Asumiendo que el campo estado está en la cita
        Filter: DefaultColumnFilter, // Filtro para la columna
        Cell: ({ value }: any) => (
          <span className={`px-2 py-1 rounded-md text-xs ${getEstadoClass(value)}`}>
            {value}
          </span>
        ),
      },
      {
        Header: 'Acciones',
        Cell: ({ row }: any) => {
          const { id, estado } = row.original; // Accedemos a los datos de la cita
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEstadoChange(id, 'atendida')}
                className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
              >
                Atendida
              </button>
              <button
                onClick={() => handleEstadoChange(id, 'cancelada')}
                className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
              >
                Cancelada
              </button>
              <button
                onClick={() => handleEstadoChange(id, 'reprogramada')}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600"
              >
                Reprogramada
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  // Función para devolver clases según el estado
  const getEstadoClass = (estado: string) => {
    switch (estado) {
      case 'atendida':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      case 'reprogramada':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Usamos react-table para configurar la tabla
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageSize,
    state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: citas,
      initialState: { pageIndex: 0 }, // Estado inicial de la página
    },
    useFilters, // Para filtros
    usePagination // Para paginación
  );

  return (
    <div>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-300">
        <table className="min-w-full" {...getTableProps()}>
          <thead className="bg-gray-200">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                    {/* Renderizamos el filtro de cada columna */}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 border border-gray-300 rounded-l-md hover:bg-gray-300 disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-4 py-2 bg-gray-200 text-sm font-medium text-gray-700 border border-gray-300 rounded-r-md hover:bg-gray-300 disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>

        {/* Paginación de página */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Página {currentPageIndex + 1} de {pageCount}
          </span>
          <select
            value={currentPageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700"
          >
            {[5, 10, 20, 30].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize} filas
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ListCitas;
