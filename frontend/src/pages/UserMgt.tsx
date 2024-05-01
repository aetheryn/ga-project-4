import { SyntheticEvent, useContext, useState } from "react";
import UserContext from "../context/user";
import { User } from "../classes/user";
import { Card } from "@mui/material";
import UserSideCard from "../components/UserSideCard";

function UserMgt(): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const userCtx = useContext(UserContext);

  function handleUserSelect(user: User) {
    console.log(user.full_name);
    setSelectedUser(user);
    setShowUserDetails(true);
  }

  return (
    <>
      <div className="container">
        {userCtx.allUsers.map((user: User) => {
          return (
            <div
              style={{ display: "block", margin: "1rem", borderRadius: "20px" }}
              onClick={() => handleUserSelect(user)}
            >
              <h1> {user.username}</h1>
            </div>
          );
        })}
      </div>
      {showUserDetails && (
        <div>
          <UserSideCard selectedUser={selectedUser}></UserSideCard>
        </div>
      )}
    </>
  );
}

export default UserMgt;
