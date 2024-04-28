import { SyntheticEvent, useState } from "react";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/user";

function LoginPage() {
  const fetchUsers = useFetch();
  const [username, setUsername] = useState<User["username"]>("");
  const [password, setPassword] = useState<string>("");

  //   async function getAllUsers() {
  //     try {
  //       const response: any = await fetchUsers(
  //         "/users",
  //         "GET",
  //         undefined,
  //         undefined
  //       );

  //       if (response.ok) console.log(response);
  //     } catch (error: any) {
  //       if (error.name !== "AbortError") {
  //         console.error(error.message);
  //       }
  //     }
  //   }

  async function handleLogin(event: SyntheticEvent) {
    event.preventDefault();

    console.log("logging in");
    try {
      const response: any = await fetchUsers(
        "/auth/login",
        "POST",
        { username: username, password: password },
        undefined
      );

      if (response.ok) {
        console.log(`${username} is successfully logged in.`);
        console.log(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <>
      <form id="loginpage" onSubmit={handleLogin}>
        <input
          placeholder="Enter username"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          placeholder="Enter password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>

      {/* <button onClick={getAllUsers}>aa</button> */}
    </>
  );
}

export default LoginPage;
