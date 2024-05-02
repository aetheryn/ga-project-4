import { SyntheticEvent, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Record } from "../classes/record";
import useFetch from "../hooks/useFetch";
import { User } from "../classes/user";
import RecordModal from "./RecordModal";
import DeleteAlert from "./DeleteAlert";

interface RecordCardProps {
  record: Record;
  allRecords: Record[];
  getAllRecords: () => void;
}

function RecordCard(props: RecordCardProps): JSX.Element {
  const { record, allRecords, getAllRecords } = props;
  const [showRecord, setShowRecord] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
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

  function handleUserSelect(user: User): void {
    setSelectedUser(user);
  }

  function handleClick(event: SyntheticEvent) {
    const elements = document.getElementsByClassName("card-content");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("isActive");
      setShowRecord(false);
    }

    const selectElement = event.currentTarget as HTMLDivElement;
    selectElement.classList.add("isActive");

    if (selectElement.classList.contains("isActive")) {
      setShowRecord(true);
    } else setShowRecord(false);
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
  }, [allRecords]);

  return (
    <>
      {showRecord && (
        <RecordModal
          record={record}
          selectedUser={selectedUser}
          setShowRecord={setShowRecord}
          getAllRecords={getAllRecords}
        ></RecordModal>
      )}

      {showAlert && (
        <DeleteAlert
          record={record}
          setShowAlert={setShowAlert}
          getAllRecords={getAllRecords}
        ></DeleteAlert>
      )}
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
          onClick={(event) => handleClick(event)}
        >
          <label>Patient</label>
          <div className="title">{selectedUser.full_name}</div>

          <label>Assessment</label>
          <div className="description">{record.assessment}</div>

          <label>Plan</label>
          <div className="description">{record.plan}</div>
        </CardContent>

        <button
          onClick={() => {
            setShowAlert(true);
          }}
          className="delete-button"
        >
          &#x2715;
        </button>
      </Card>
    </>
  );
}

export default RecordCard;
