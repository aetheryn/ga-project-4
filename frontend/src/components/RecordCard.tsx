import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { Button } from "@mui/material";
import { Record } from "../interfaces/record";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/user";
import RecordModal from "./RecordModal";

interface RecordCardProps {
  record: Record;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  getAllRecords: () => void;
}

function RecordCard(props: RecordCardProps): JSX.Element {
  const { record, selectedUser, setSelectedUser, getAllRecords } = props;
  const [selectedRecordId, setSelectedRecordId] = useState<Record["id"] | null>(
    null
  );
  const fetchData = useFetch();

  function handleUserSelect(user: User): void {
    setSelectedUser(user);
  }

  // function handleClick(): void {
  //   console.log("Button clicked.");
  //   setSelectedRecord(true);
  // }

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
    <>
      {selectedRecordId === record.id && (
        <RecordModal
          record={record}
          selectedUser={selectedUser}
          setSelectedRecordId={setSelectedRecordId}
          getAllRecords={getAllRecords}
        ></RecordModal>
      )}
      <Card onClick={() => setSelectedRecordId(record.id)}>
        <CardContent style={{ display: "flex", gap: "2rem" }}>
          <h1>{selectedUser.full_name}</h1>
          <p>{record.subjective}</p>
          <p>{record.objective}</p>
          <p>{record.assessment}</p>
          <p>{record.plan}</p>
        </CardContent>
      </Card>
    </>
  );
}

export default RecordCard;
