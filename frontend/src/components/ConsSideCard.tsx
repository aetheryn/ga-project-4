import { Card } from "@mui/material";
import { Record } from "../classes/record";

interface SideCardProps {
  selectedRecord: Record;
}

function ConsSideCard({ selectedRecord }: SideCardProps): JSX.Element {
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
        </div>
      </Card>
    </div>
  );
}

export default ConsSideCard;
