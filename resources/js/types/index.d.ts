// resources/js/types/index.d.ts

import { Cita } from './Cita';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    citas: Cita[]; // Aseguramos que `citas` esté presente en los props de la página
};
