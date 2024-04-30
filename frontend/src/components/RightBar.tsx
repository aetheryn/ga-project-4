import styles from "./RightBar.module.css";

import UserContext from "../context/user";
import { useContext } from "react";

function RightBar(): JSX.Element {
  const userCtx = useContext(UserContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.profile}>{userCtx.loggedInUser.username}</div>
    </div>
  );
}

export default RightBar;
