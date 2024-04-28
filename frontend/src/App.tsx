import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import UserContext from "./context/user";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, accessToken, setAccessToken }}
    >
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="login" element={<LoginPage></LoginPage>} />
        <Route path="main" element={<MainPage></MainPage>} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
