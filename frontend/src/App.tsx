import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import { useEffect, useState } from "react";
// import { User } from "./interfaces/user";
// import useFetch from "./hooks/useFetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="login" element={<LoginPage></LoginPage>} />
    </Routes>
  );
}

export default App;
