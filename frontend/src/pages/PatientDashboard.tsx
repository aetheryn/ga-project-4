import { Card, CardContent } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Record } from "../classes/record";
import ConsSideCard from "../components/ConsSideCard";

function PatientDashboard(): JSX.Element {
  const [patientRecords, setPatientRecords] = useState<Record[]>([]);
  const [showSideCard, setShowSideCard] = useState<boolean>(false);
  const [selectedRecord, setShowRecord] = useState<Record>({
    id: 0,
    doctor_id: 0,
    patient_id: 0,
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    created_at: new Date(),
  });
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  async function getPatientRecords() {
    try {
      const response: any = await fetchData(
        "/details/patient/" + userCtx.loggedInUser?.id,
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

  function handleSelect(record: Record): void {
    setShowSideCard(true);
    setShowRecord(record);
  }

  useEffect(() => {
    getPatientRecords();
  }, []);

  return (
    <div className="card-container">
      {patientRecords.map((record) => {
        return (
          <div className="cols-sm">
            <Card
              className="card"
              style={{
                display: "block",
                margin: "1rem 0 0 0",
                padding: "0.5rem",
                borderRadius: "20px",
              }}
            >
              <CardContent
                className="card-content"
                style={{ display: "block" }}
                onClick={() => handleSelect(record)}
              >
                <label>Consultation details on:</label>
                <div className="title">
                  {record.created_at.toString().slice(0, 10)}
                </div>

                <label>Your quantitative observations:</label>
                <div className="description">{record.objective}</div>

                <label>Your treatment plan: </label>
                <div className="description">{record.plan}</div>
              </CardContent>
            </Card>
          </div>
        );
      })}
      {showSideCard && (
        <ConsSideCard selectedRecord={selectedRecord}></ConsSideCard>
      )}
    </div>
  );
}

export default PatientDashboard;
