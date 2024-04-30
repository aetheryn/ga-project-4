import { useContext } from "react";
import UserContext from "../context/user";
import { User } from "../classes/user";
import { Card } from "@mui/material";

function UserMgt(): JSX.Element {
  const userCtx = useContext(UserContext);
  return (
    <>
      {userCtx.allUsers.map((user: User) => {
        return (
          <Card
            style={{ display: "block", margin: "1rem", borderRadius: "20px" }}
          >
            {user.username}
          </Card>
        );
      })}
    </>
  );
}

export default UserMgt;
