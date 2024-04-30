import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { Button } from "@mui/material";
import { Record } from "../classes/record";
import useFetch from "../hooks/useFetch";
import { User } from "../classes/user";
import RecordModal from "./RecordModal";

interface RecordCardProps {
  record: Record;
  getAllRecords: () => void;
}

function RecordCard(props: RecordCardProps): JSX.Element {
  const { record, getAllRecords } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
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
  }, []);

  return (
    <>
      {showModal && (
        <RecordModal
          record={record}
          selectedUser={selectedUser}
          setShowModal={setShowModal}
          getAllRecords={getAllRecords}
        ></RecordModal>
      )}
      <Card
        onClick={() => setShowModal(true)}
        style={{
          display: "block",
          margin: "1rem 0 0 0",
          borderRadius: "20px",
        }}
      >
        <CardContent style={{ display: "block" }}>
          <div className="title">{selectedUser.full_name}</div>
          <div className="description">A: {record.assessment}</div>
          <div className="description">P: {record.plan}</div>
        </CardContent>
      </Card>
    </>
  );
}

export default RecordCard;
