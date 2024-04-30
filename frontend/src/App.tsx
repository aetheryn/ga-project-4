import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";
import UserContext from "./context/user";
import Registration from "./pages/Registration";
import { User } from "./classes/user";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import UserMgt from "./pages/UserMgt";
import useFetch from "./hooks/useFetch";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [accessToken, setAccessToken] = useState<string>("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const fetchData = useFetch();

  async function getAllUsers() {
    try {
      const response: any = await fetchData(
        "/users",
        "GET",
        undefined,
        undefined
      );

      if (response.ok) {
        setAllUsers(response.data);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        accessToken,
        setAccessToken,
        allUsers,
      }}
    >
      {loggedInUser ? <LeftBar></LeftBar> : null}

      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="main" element={<MainPage></MainPage>} />
          <Route
            path="register"
            element={<Registration getAllUsers={getAllUsers}></Registration>}
          />
          <Route path="users" element={<UserMgt></UserMgt>} />
        </Routes>
      </div>

      {loggedInUser?.role === "DOCTOR" ? <RightBar></RightBar> : null}
    </UserContext.Provider>
  );
}

export default App;
