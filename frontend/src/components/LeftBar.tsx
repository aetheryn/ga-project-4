import styles from "./LeftBar.module.css";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";
import { useContext } from "react";

function LeftBar(): JSX.Element {
  const userCtx = useContext(UserContext);

  function handleLogout(): void {
    userCtx.setLoggedInUser();
    userCtx.setAccessToken("");
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.navlinks}>
        <h1>MedTrack</h1>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/main"
          >
            Dashboard
          </NavLink>
        </li>

        {userCtx.loggedInUser.role === "DOCTOR" && (
          <>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/users"
              >
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/appointments"
              >
                Appointments
              </NavLink>
            </li>
          </>
        )}

        {userCtx.loggedInUser.role === "PATIENT" && (
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? styles.active : "")}
              to="/booking"
            >
              Book an Appointment
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
      </div>

      <a className={styles.logout} onClick={handleLogout}>
        Logout
      </a>
    </div>
  );
}

export default LeftBar;
