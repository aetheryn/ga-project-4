import { useEffect, useState } from "react";
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
  const [showRecordModal, setShowRecordModal] = useState<boolean>(false);
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
      {showRecordModal && (
        <RecordModal
          record={record}
          selectedUser={selectedUser}
          setShowRecordModal={setShowRecordModal}
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
        style={{
          display: "block",
          margin: "1rem 0 0 0",
          padding: "0.5rem",
          borderRadius: "20px",
        }}
      >
        <CardContent
          style={{ display: "block" }}
          onClick={() => setShowRecordModal(true)}
        >
          <div className="title">{selectedUser.full_name}</div>
          <div className="description">A: {record.assessment}</div>
          <div className="description">P: {record.plan}</div>
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
