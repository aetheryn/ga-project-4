import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
