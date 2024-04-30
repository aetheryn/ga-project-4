import styles from "./LeftBar.module.css";
import { NavLink } from "react-router-dom";

function LeftBar(): JSX.Element {
  return (
    <div className={styles.navbar}>
      <div className={styles.navlinks}>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/main"
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            className={(navData) => (navData.isActive ? styles.active : "")}
            to="/users"
          >
            Users
          </NavLink>
        </li>
      </div>
    </div>
  );
}

export default LeftBar;
