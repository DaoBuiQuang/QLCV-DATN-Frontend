import React, { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./components/AuthContext/AuthContext.js";
import "./App.css";

export default function App() {
  return (
    <div className="App">
            {/* <AuthProvider> */}
                <AppRoutes />
            {/* </AuthProvider> */}
    
           
        </div>
  );
}

