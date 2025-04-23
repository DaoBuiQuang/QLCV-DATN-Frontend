import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import "./App.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="App">
      {/* <AuthProvider> */}
      <ToastContainer />
      <AppRoutes />
      {/* </AuthProvider> */}
    </div>
  );
}

