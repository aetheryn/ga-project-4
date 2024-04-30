import { SyntheticEvent, useContext, useRef, useState } from "react";
import { Button } from "@mui/material";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Navigate } from "react-router-dom";

function Registration(): JSX.Element {
  const fetchData = useFetch();
  const [role, setRole] = useState<string>("");
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const userCtx = useContext(UserContext);

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

  async function handleRegister() {
    try {
      //   console.log(`{
      //         username: ${usernameRef.current?.value},
      //         password: ${passwordRef.current?.value},
      //         fullName: ${fullNameRef.current?.value},
      //         dateOfBirth: ${dateOfBirthRef.current?.value},
      //         contact: ${contactRef.current?.value},
      //         address: ${addressRef.current?.value},
      //         role: ${role},
      //       }`);
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

      console.log(response);

      if (response.ok) {
        setIsUserRegistered(true);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <>
      <form>
        <label>Username</label>
        <input id="username" ref={usernameRef} className="fullwidth"></input>
        <label>Password</label>
        <input
          id="password"
          ref={passwordRef}
          className="fullwidth"
          type="password"
        ></input>

        <label>Full Name</label>
        <input id="full-name" ref={fullNameRef} className="fullwidth"></input>

        <label>Date of Birth</label>
        <input
          id="date-of-birth"
          ref={dateOfBirthRef}
          className="fullwidth"
          type="date"
        ></input>

        <label>Contact</label>
        <input id="contact" ref={contactRef} className="fullwidth"></input>

        <label>Address</label>
        <textarea
          id="address"
          ref={addressRef}
          className="fullwidth"
          rows={2}
        ></textarea>

        <label>
          Role
          <select
            className="fullwidth"
            id="role"
            onChange={(event) => handleSelect(event)}
          >
            <option value="DOCTOR">Doctor</option>
            <option value="PATIENT">Patient</option>
          </select>
        </label>

        <Button onClick={() => handleRegister()}>Register</Button>
        <Button onClick={() => setIsUserRegistered(true)}>Return</Button>
      </form>

      {isUserRegistered && <Navigate to="/main" />}
    </>
  );
}

export default Registration;
