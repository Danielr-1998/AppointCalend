import React from "react";
import Sidebar from "../Components/Sidebar"; // Importamos el Sidebar

const DefaultLayout = ({ children, title }) => {
  const isLoginPage = title === "Login";
  const isRegisterPage = title === "Register";

  return (
    <div className="flex min-h-screen"> {/* Asegura que el contenedor ocupe toda la altura */}
      {/* Sidebar - Solo mostrar si no estamos en login o registro */}
      {!isLoginPage && !isRegisterPage && <Sidebar />}

      {/* Contenido principal */}
      <div className="flex-1 ml-64 p-6"> {/* Asegura el margen de 64px para el contenido */}
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
