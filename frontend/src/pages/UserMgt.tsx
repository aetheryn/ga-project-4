import { useContext, useState } from "react";
import UserContext from "../context/user";
import { User } from "../classes/user";
import UserSideCard from "../components/UserSideCard";

function UserMgt(): JSX.Element {
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    username: "",
    hash: "",
    full_name: "",
    date_of_birth: new Date(),
    contact: 0,
    address: "",
    role: "",
    pending_approval: false,
  });
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const userCtx = useContext(UserContext);

  function handleUserSelect(user: User) {
    setSelectedUser(user);
    setShowUserDetails(true);
  }

  function formatDisplayedRole(string: string): string | undefined {
    if (string === "DOCTOR") {
      return "Doctor";
    } else if (string === "PATIENT") {
      return "Patient";
    }
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "left" }}>List of Users</h1>
        <table className="user-list" style={{ textAlign: "left" }}>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>

          {userCtx.allUsers.map((user: User) => {
            return (
              <tr
                className="user-table-row"
                onClick={() => handleUserSelect(user)}
              >
                <td> {user.full_name}</td>
                <td> {formatDisplayedRole(user.role)}</td>
              </tr>
            );
          })}
        </table>
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
