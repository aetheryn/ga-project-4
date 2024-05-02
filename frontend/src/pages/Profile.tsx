import UserContext from "../context/user";
import { useContext, useState, useRef } from "react";
import styles from "../components/Profile.module.css";
import useFetch from "../hooks/useFetch";
import { User } from "../classes/user";

function Profile(): JSX.Element {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const usernameRef = useRef<HTMLInputElement>(
    document.querySelector("#username")
  );
  const contactRef = useRef<HTMLInputElement>(
    document.querySelector("#contact")
  );
  const addressRef = useRef<HTMLInputElement>(
    document.querySelector("#address")
  );

  function handleClick(): void {
    updateParticulars();
  }

  async function updateParticulars(): Promise<void> {
    try {
      const response: any = await fetchData(
        "/users/" + userCtx.loggedInUser.id,
        "PATCH",
        {
          username: usernameRef.current?.value,
          contact: contactRef.current?.value,
          address: addressRef.current?.value,
        },
        userCtx.accessToken
      );
      if (response.ok) {
        userCtx.setLoggedInUser((prevUser: User) => {
          return {
            ...prevUser,
            username: usernameRef.current?.value,
            contact: contactRef.current?.value,
            address: addressRef.current?.value,
          };
        });
        setIsUpdating(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
    console.log("Particulars updated.");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Profile Information</h1>
      <div className={styles.profileInfo}>
        <div className={styles.row}>
          <label className={styles.label}>Full Name</label>
          <span className={styles.info}>{userCtx.loggedInUser.fullName}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Username</label>
          {!isUpdating && (
            <span className={styles.info}>{userCtx.loggedInUser.username}</span>
          )}
          {isUpdating && (
            <input
              id="username"
              className="user-input"
              defaultValue={userCtx.loggedInUser.username}
              ref={usernameRef}
            ></input>
          )}
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Date of Birth</label>
          <span className={styles.info}>
            {userCtx.loggedInUser.dateOfBirth.toString().slice(0, 10)}
          </span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Contact</label>
          {!isUpdating && (
            <span className={styles.info}>{userCtx.loggedInUser.contact}</span>
          )}
          {isUpdating && (
            <input
              id="contact"
              className="user-input"
              defaultValue={userCtx.loggedInUser.contact}
              ref={contactRef}
            ></input>
          )}
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Address</label>
          {!isUpdating && (
            <span className={styles.info}>{userCtx.loggedInUser.address}</span>
          )}
          {isUpdating && (
            <input
              id="address"
              className="user-input"
              defaultValue={userCtx.loggedInUser.address}
              ref={addressRef}
            ></input>
          )}
        </div>
      </div>

      {!isUpdating && (
        <button className="button" onClick={() => setIsUpdating(true)}>
          Update
        </button>
      )}

      {isUpdating && (
        <>
          <button className="button" onClick={handleClick}>
            Save
          </button>
          <button className="button" onClick={() => setIsUpdating(false)}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default Profile;
