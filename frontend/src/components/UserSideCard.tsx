import { Card } from "@mui/material";
import { User } from "../classes/user";

interface UserSideCardProps {
  selectedUser: User | undefined;
}

function UserSideCard({ selectedUser }: UserSideCardProps): JSX.Element {
  return (
    <div className="side">
      <Card
        className="user-side-card"
        style={{
          display: "grid",
          margin: "auto",
          padding: "0.5rem",
          borderRadius: "20px",
          width: "80%",
          maxHeight: "50vh",
          backgroundColor: "#f4f3ef",
        }}
      >
        <h1>{selectedUser?.full_name}</h1>

        <div className="user-details">
          <div className="user-heading">Username</div>
          <div>{selectedUser?.username}</div>
          <br />
          <div className="user-heading">Date of Birth</div>
          <div>{selectedUser?.date_of_birth.toString().slice(0, 10)}</div>
          <br />
          <div className="user-heading">Contact</div>
          <div>{selectedUser?.contact}</div>
          <br />
          <div className="user-heading">Address</div>
          <div>{selectedUser?.address}</div>
        </div>
      </Card>
    </div>
  );
}

export default UserSideCard;
