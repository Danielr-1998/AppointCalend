// resources/js/Pages/Citas/Calendar.tsx
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar: React.FC = () => {
    const { citas } = usePage().props;  // Se asume que las citas se pasan desde el backend
    const [view, setView] = useState('dayGridMonth');  // Vista por defecto es el mes

    // Mapea las citas para que FullCalendar las entienda
    const events = citas.map((cita: any) => ({
        title: cita.descripcion,
        start: cita.fecha_hora,
        end: cita.fecha_hora, // Puedes ajustar esto si tienes una duración
        description: cita.descripcion,
    }));

    useEffect(() => {
        // Aquí puedes manejar cualquier lógica adicional si es necesario
    }, [citas]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl ">Vista de Citas</h1>
                <div>
                    <button
                        onClick={() => setView('dayGridMonth')}
                        className="btn btn-primary"
                    >
                        Mes
                    </button>
                    <button
                        onClick={() => setView('timeGridWeek')}
                        className="btn btn-primary ms-2"
                    >
                        Semana
                    </button>
                    <button
                        onClick={() => setView('timeGridDay')}
                        className="btn btn-primary ms-2"
                    >
                        Día
                    </button>
                </div>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={view}
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                editable={true}
                droppable={true}
            />
        </div>
    );
};

export default Calendar;
