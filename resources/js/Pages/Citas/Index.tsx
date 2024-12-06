import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import ListCitas from './ListCitas';   // El componente para mostrar las citas en lista
import Calendar from '@/Components/Calendar';    // El componente para mostrar el calendario
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateCitaModal from '@/Components/CrearCitaModal'; // Importamos la modal de crear cita

const Index: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');  // Estado para alternar entre lista y calendario
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar la visibilidad de la modal
  const { citas, profesionales } = usePage().props;  // Asegúrate de que 'profesionales' se pase correctamente desde el backend

  // Verificar si `profesionales` es un arreglo antes de pasarlo al modal
  const safeProfesionales = Array.isArray(profesionales) ? profesionales : [];

  return (
    <AuthenticatedLayout>
      <div className="flex">
        {/* Sidebar */}
        {/* Contenido principal */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold leading-tight text-gray-800">Citas</h1>
            <div>
              {/* Botón para ver la lista */}
              <button
                onClick={() => setViewMode('list')}  // Cambiar a la vista de lista
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Ver Lista
              </button>
              {/* Botón para ver el calendario */}
              <button
                onClick={() => setViewMode('calendar')}  // Cambiar a la vista de calendario
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ms-2"
              >
                Ver Calendario
              </button>
              {/* Botón para crear una nueva cita */}
              <button
                onClick={() => setIsModalOpen(true)}  // Mostrar la modal para crear cita
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ms-2"
              >
                Crear Cita
              </button>
            </div>
          </div>

          {/* Dependiendo del estado 'viewMode', mostramos el componente correspondiente */}
          {viewMode === 'calendar' ? <Calendar citas={citas} /> : <ListCitas citas={citas} />}
        </div>
      </div>

      {/* Mostrar modal si isModalOpen es true */}
      {isModalOpen && <CreateCitaModal onClose={() => setIsModalOpen(false)} profesionales={safeProfesionales} />}
    </AuthenticatedLayout>
  );
};

export default Index;
