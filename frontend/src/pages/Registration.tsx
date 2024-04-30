import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

function Registration(): JSX.Element {
  const fetchData = useFetch();
  const [role, setRole] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(
    document.querySelector("#username")
  );
  const passwordRef = useRef<HTMLInputElement>(
    document.querySelector("#password")
  );
  const fullNameRef = useRef<HTMLInputElement>(
    document.querySelector("#full-name")
  );
  const dateOfBirthRef = useRef<HTMLInputElement>(
    document.querySelector("#date-of-birth")
  );
  const contactRef = useRef<HTMLInputElement>(
    document.querySelector("#contact")
  );
  const addressRef = useRef<HTMLTextAreaElement>(
    document.querySelector("#address")
  );

  function handleSelect(event: SyntheticEvent) {
    const selectElement = event.currentTarget as HTMLInputElement;
    setRole(selectElement.value);
  }

  function getCurrentDate(): void {
    let today = new Date().toISOString().slice(0, 10);
    setCurrentDate(today);
  }

  async function handleRegister(event: SyntheticEvent) {
    try {
      event.preventDefault();
      const response: any = await fetchData(
        "/auth/register",
        "PUT",
        {
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
          fullName: fullNameRef.current?.value,
          dateOfBirth: dateOfBirthRef.current?.value,
          contact: contactRef.current?.value,
          address: addressRef.current?.value,
          role: role,
        },
        userCtx.accessToken
      );

      if (response.ok) {
        setIsUserRegistered(true);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function backToLogin(event: SyntheticEvent): void {
    event.preventDefault();
    navigate("/login");
  }

  useEffect(() => {
    getCurrentDate();
  }, []);

  return (
    <div className="centered">
      <h1>MedTrack</h1>
      {!isUserRegistered && (
        <form className="auth">
          <label>Username</label>
          <input
            id="username"
            ref={usernameRef}
            className="auth-input"
            required
            placeholder="Your username (no spaces allowed)"
          ></input>

          <label>Password</label>
          <input
            id="password"
            required
            ref={passwordRef}
            className="auth-input"
            type="password"
            placeholder="Your password"
          ></input>

          <label>Full Name</label>
          <input
            id="full-name"
            required
            ref={fullNameRef}
            className="auth-input"
            placeholder="Your full name"
          ></input>

          <label>Date of Birth</label>
          <input
            id="date-of-birth"
            ref={dateOfBirthRef}
            className="auth-input"
            type="date"
            max={currentDate}
          ></input>

          <label>Contact</label>
          <input
            id="contact"
            ref={contactRef}
            className="auth-input"
            type="number"
            placeholder="Your contact number (8 digits)"
          ></input>

          <label>Address</label>
          <textarea
            id="address"
            ref={addressRef}
            className="auth-input"
            rows={2}
            style={{ resize: "none" }}
            placeholder="Your address"
          ></textarea>

          <label>Role</label>
          <select
            className="auth-input"
            id="role"
            onChange={(event) => handleSelect(event)}
          >
            <option disabled selected>
              Select Role
            </option>
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>

          <button
            className="button auth-button"
            onClick={(event) => handleRegister(event)}
          >
            Register
          </button>
        </form>
      )}

      {isUserRegistered && <div>User registered.</div>}

      <button
        className="button auth-button"
        onClick={(event) => backToLogin(event)}
      >
        &#x2190; Back to Login
      </button>
    </div>
  );
}

export default Registration;
