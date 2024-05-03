import styles from "./LeftBar.module.css";
import { NavLink } from "react-router-dom";
import UserContext from "../context/user";
import { useContext } from "react";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";

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
            <SpaceDashboardOutlinedIcon />
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
                <PeopleAltOutlinedIcon />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/appointments"
              >
                <CalendarMonthOutlinedIcon />
                Appointments
              </NavLink>
            </li>
          </>
        )}

        {userCtx.loggedInUser.role === "PATIENT" && (
          <>
            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/booking"
              >
                <EditCalendarOutlinedIcon />
                Book Now
              </NavLink>
            </li>

            <li>
              <NavLink
                className={(navData) => (navData.isActive ? styles.active : "")}
                to="/appointments"
              >
                <CalendarMonthOutlinedIcon />
                Appointments
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/profile"
          >
            <AccountBoxOutlinedIcon />
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
