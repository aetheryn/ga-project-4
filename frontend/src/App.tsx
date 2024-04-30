import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import UserContext from "./context/user";
import Registration from "./pages/Registration";
import { User } from "./interfaces/user";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, accessToken, setAccessToken }}
    >
      <LeftBar></LeftBar>

      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="main" element={<MainPage></MainPage>} />
          <Route path="register" element={<Registration></Registration>} />
        </Routes>
      </div>

      {loggedInUser?.role === "DOCTOR" ? <RightBar></RightBar> : null}
    </UserContext.Provider>
  );
}

export default App;
