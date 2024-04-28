import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Record } from "../interfaces/record";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/user";

interface RecordCardProps {
  record: Record;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
}

function RecordCard(props: RecordCardProps): JSX.Element {
  const fetchData = useFetch();
  const { record, selectedUser, setSelectedUser } = props;

  function handleUserSelect(user: User) {
    setSelectedUser(user);
  }

  async function getPatientParticulars() {
    try {
      const response: any = await fetchData(
        "/users/" + record.patient_id,
        "POST",
        undefined,
        undefined
      );

      if (response.ok) {
        handleUserSelect(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getPatientParticulars();
  }, []);

  return (
    <Card>
      <CardContent style={{ display: "flex", gap: "2rem" }}>
        <h1>{selectedUser.full_name}</h1>
        <p>{record.subjective}</p>
        <p>{record.objective}</p>
        <p>{record.assessment}</p>
        <p>{record.plan}</p>
      </CardContent>
    </Card>
  );
}

export default RecordCard;
