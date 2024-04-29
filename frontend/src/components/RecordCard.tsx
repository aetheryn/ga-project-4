import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { Button } from "@mui/material";
import { Record } from "../interfaces/record";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/user";
import RecordModal from "./RecordModal";
import UserContext from "../context/user";

interface RecordCardProps {
  record: Record;
  getAllRecords: () => void;
}

function RecordCard(props: RecordCardProps): JSX.Element {
  const { record, getAllRecords } = props;
  const [selectedRecordId, setSelectedRecordId] = useState<Record["id"] | null>(
    null
  );
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
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  function handleUserSelect(user: User): void {
    setSelectedUser(user);
  }

  // function handleClick(): void {
  //   console.log("Button clicked.");
  //   setSelectedRecord(true);
  // }

  async function handleDelete() {
    try {
      const response: any = await fetchData(
        "/details/" + record.id,
        "DELETE",
        undefined,
        userCtx.accessToken
      );

      if (response.ok) {
        getAllRecords();
      }
    } catch (error: any) {
      console.error(error.message);
    }
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
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            zIndex: "10",
          }}
        >
          &#x2715;
        </button>
      </Card>
    </>
  );
}

export default RecordCard;
