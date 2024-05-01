import { Card, CardContent } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { Record } from "../classes/record";

function PatientDashboard(): JSX.Element {
  const [patientRecords, setPatientRecords] = useState<Record[]>([]);
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

  useEffect(() => {
    getPatientRecords();
  }, []);

  return (
    <div style={{ display: "grid" }}>
      {patientRecords.map((record) => {
        return (
          <div className="cols-sm">
            <Card
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
              >
                <div className="title">
                  Consultation details on:{" "}
                  {record.created_at.toString().slice(0, 10)}
                </div>
                <div className="description">O: {record.objective}</div>
                <div className="description">P: {record.plan}</div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default PatientDashboard;
