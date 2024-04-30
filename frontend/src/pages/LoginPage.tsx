import { SyntheticEvent, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { User } from "../classes/user";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function LoginPage(): JSX.Element {
  const fetchUsers = useFetch();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [username, setUsername] = useState<User["username"]>("");
  const [password, setPassword] = useState<string>("");

  function handleClick(): void {
    navigate("/register");
  }

  async function handleLogin(event: SyntheticEvent) {
    event.preventDefault();
    try {
      const response: any = await fetchUsers(
        "/auth/login",
        "POST",
        { username: username, password: password },
        undefined
      );

      if (response.ok) {
        console.log(`${username} is successfully logged in.`);

        userCtx.setAccessToken(response.data.access);
        const decoded = jwtDecode(response.data.access);
        userCtx.setLoggedInUser(decoded);

        navigate("/main");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className="centered">
      <h1>MedTrack</h1>
      <form onSubmit={handleLogin} className="auth">
        <label>Username</label>
        <input
          className="login-input"
          placeholder="Enter username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label>Password</label>
        <input
          className="login-input"
          placeholder="Enter password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button className="button login-button" type="submit">
          Login
        </button>
      </form>

      <a className="register" onClick={handleClick}>
        Not a user yet? Register here.
      </a>
    </div>
  );
}

export default LoginPage;
