import { Card } from "@mui/material";
import { Record } from "../classes/record";
import { useEffect, useState } from "react";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";

interface SideCardProps {
  selectedRecord: Record;
}

function ConsSideCard({ selectedRecord }: SideCardProps): JSX.Element {
  const [doctor, setDoctor] = useState<User>({
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
  const fetchData = useFetch();

  async function getDoctorDetails() {
    try {
      const response: any = await fetchData(
        "/users/" + selectedRecord.doctor_id,
        "POST",
        undefined,
        undefined
      );

      if (response.ok) {
        setDoctor(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorDetails();
  }, []);

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
          backgroundColor: "transparent",
          color: "#383838",
          boxShadow: "none",
        }}
      >
        <div className="user-details">
          <div className="user-heading">Your constulation record on:</div>
          <div>{selectedRecord.created_at.toString().slice(0, 10)}</div>
          <br />
          <div className="user-heading">Your quantitative observations:</div>
          <div>{selectedRecord.objective}</div>
          <br />
          <div className="user-heading">Your treatment plan:</div>
          <div>{selectedRecord.plan}</div>
          <br />
          <div className="user-heading">Your doctor:</div>
          <div>{doctor.full_name}</div>
        </div>
      </Card>
    </div>
  );
}

export default ConsSideCard;
