import React from "react";
import { Link } from "@inertiajs/inertia-react"; // Importamos Inertia Link

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white h-full fixed top-0 left-0 w-64 p-6"> {/* Sidebar fijo a la izquierda */}
      <div className="logo text-2xl font-bold mb-6">Mi App</div>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/citas" className="block p-2 hover:bg-gray-700 rounded">
            Citas
          </Link>
        </li>
        <li>
          <Link href="/profile" className="block p-2 hover:bg-gray-700 rounded">
            Perfil
          </Link>
        </li>
        <li>
          <form method="POST" action="/logout">
            <button
              type="submit"
              className="w-full p-2 text-left hover:bg-gray-700 rounded text-white"
            >
              Cerrar sesión
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
