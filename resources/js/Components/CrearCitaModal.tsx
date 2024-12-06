import React from 'react';
import { useForm } from '@inertiajs/react';

interface CreateCitaModalProps {
  onClose: () => void;
  profesionales: Array<{ id: number; nombre: string }>;  // Definir el tipo de los profesionales
}

const CreateCitaModal: React.FC<CreateCitaModalProps> = ({ onClose, profesionales }) => {
  const { data, setData, post, processing, errors } = useForm({
    fecha_hora: '',
    descripcion: '',
    profesional_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enviar el formulario al backend
    post(route('citas.store'), {
      onSuccess: () => {
        onClose();  // Cerrar la modal después de enviar correctamente
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-xl mb-4">Crear Cita</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fecha_hora" className="block">Fecha y Hora</label>
            <input
              type="datetime-local"
              id="fecha_hora"
              name="fecha_hora"
              value={data.fecha_hora}
              onChange={(e) => setData('fecha_hora', e.target.value)}
              className="w-full border p-2"
              required
            />
            {errors.fecha_hora && <span className="text-red-500">{errors.fecha_hora}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="block">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={data.descripcion}
              onChange={(e) => setData('descripcion', e.target.value)}
              className="w-full border p-2"
              required
            ></textarea>
            {errors.descripcion && <span className="text-red-500">{errors.descripcion}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="profesional_id" className="block">Profesional</label>
            <select
              id="profesional_id"
              name="profesional_id"
              value={data.profesional_id}
              onChange={(e) => setData('profesional_id', e.target.value)}
              className="w-full border p-2"
              required
            >
              <option value="">Seleccione un profesional</option>
              {/* Verificar si profesionales tiene elementos antes de llamar a map */}
              {profesionales && profesionales.length > 0 ? (
                profesionales.map((profesional) => (
                  <option key={profesional.id} value={profesional.id}>
                    {profesional.nombre}
                  </option>
                ))
              ) : (
                <option value="">No hay profesionales disponibles</option>
              )}
            </select>
            {errors.profesional_id && <span className="text-red-500">{errors.profesional_id}</span>}
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ms-2">Cancelar</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 ms-2" disabled={processing}>Crear Cita</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCitaModal;
