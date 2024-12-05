import React from "react";
import Sidebar from "../Components/Sidebar"; // Importamos el Sidebar

const DefaultLayout = ({ children, title }) => {
  const isLoginPage = title === "Login";
  const isRegisterPage = title === "Register";

  return (
    <div className="flex">
      {/* Sidebar - Solo mostrar si no estamos en login o registro */}
      {!isLoginPage && !isRegisterPage && <Sidebar />}

      {/* Content Area */}
      <div className="flex-1 ml-64 p-6">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
