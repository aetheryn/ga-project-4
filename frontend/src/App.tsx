import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PatientDashboard from "./pages/PatientDashboard";
import { useEffect, useState } from "react";
import UserContext from "./context/user";
import Registration from "./pages/Registration";
import { User } from "./classes/user";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import UserMgt from "./pages/UserMgt";
import useFetch from "./hooks/useFetch";
import Appointments from "./pages/Appointments";
import Booking from "./pages/Booking";

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
      {!loggedInUser && (
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<LoginPage></LoginPage>} />
          <Route path="register" element={<Registration></Registration>} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      )}

      {loggedInUser?.role === "DOCTOR" && (
        <>
          <LeftBar></LeftBar>
          <div className="main">
            <Routes>
              <Route path="main" element={<MainPage></MainPage>} />
              <Route path="users" element={<UserMgt></UserMgt>} />
              <Route
                path="appointments"
                element={<Appointments></Appointments>}
              />
              <Route path="*" element={<Navigate replace to="/main" />} />
            </Routes>
          </div>
          <RightBar></RightBar>
        </>
      )}

      {loggedInUser?.role === "PATIENT" && (
        <>
          <LeftBar></LeftBar>
          <div className="main">
            <Routes>
              <Route
                path="main"
                element={<PatientDashboard></PatientDashboard>}
              />
              <Route path="booking" element={<Booking></Booking>} />
              <Route path="*" element={<Navigate replace to="/main" />} />
            </Routes>
          </div>
          <RightBar></RightBar>
        </>
      )}
    </UserContext.Provider>
  );
}

export default App;
