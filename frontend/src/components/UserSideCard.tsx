import { Card } from "@mui/material";
import { Record } from "../classes/record";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";

interface UserSideCardProps {
  selectedUser: User;
}

function UserSideCard({ selectedUser }: UserSideCardProps): JSX.Element {
  const [patientRecords, setPatientRecords] = useState<Record[]>([]);
  const [showRecord, setShowRecord] = useState<boolean>(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  async function getRecords() {
    try {
      const response: any = await fetchData(
        "/details/patient/" + selectedUser?.id,
        "POST",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        setPatientRecords(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getRecords();
  }, [selectedUser]);

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
          backgroundColor: "#d0d9cd",
          color: "#383838",
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

          {patientRecords.length > 0 && (
            <>
              <br />
              <div className="user-heading">Consultation Dates</div>
              {patientRecords.map((record) => {
                return (
                  <>
                    <a onClick={() => setShowRecord(true)}>
                      {record?.created_at.toString().slice(0, 10)}
                    </a>
                  </>
                );
              })}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default UserSideCard;
