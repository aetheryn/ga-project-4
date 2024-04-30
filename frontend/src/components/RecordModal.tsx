import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { Record } from "../classes/record";
import { User } from "../classes/user";
import { useContext, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface ModalProps {
  record: Record;
  selectedUser: User;
  setShowRecordModal: (arg: boolean) => void;
  getAllRecords: () => void;
}

function Overlay(props: ModalProps): JSX.Element {
  const { record, selectedUser, setShowRecordModal, getAllRecords } = props;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const subjRef = useRef<HTMLInputElement>(
    document.querySelector("#subjective")
  );
  const objRef = useRef<HTMLInputElement>(document.querySelector("#objective"));
  const assRef = useRef<HTMLInputElement>(
    document.querySelector("#assessment")
  );
  const planRef = useRef<HTMLInputElement>(document.querySelector("#plan"));

  const fetchData = useFetch();

  const userCtx = useContext(UserContext);

  async function updateDetails() {
    try {
      const response: any = await fetchData(
        "/details/" + record.id,
        "PATCH",
        {
          patientId: selectedUser.id,
          subjective: subjRef.current?.value,
          objective: objRef.current?.value,
          assessment: assRef.current?.value,
          plan: planRef.current?.value,
        },
        userCtx.accessToken
      );
      if (response.ok) {
        getAllRecords();
      }
    } catch (error: any) {
      console.error(error.message);
    }
    console.log("Detail updated.");
    setIsUpdating(false);
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div>
          <h1>{selectedUser.full_name}</h1>
        </div>
        {!isUpdating && (
          <>
            <div>
              <p>{record.subjective}</p>
              <p>{record.objective}</p>
              <p>{record.assessment}</p>
              <p>{record.plan}</p>
            </div>

            <Button className="col-md-6" onClick={() => setIsUpdating(true)}>
              Update
            </Button>

            <Button
              className="return"
              onClick={() => setShowRecordModal(false)}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            >
              &#x2190;
            </Button>
          </>
        )}

        {isUpdating && (
          <form>
            <TextField
              fullWidth
              id="subjective"
              label="Subjective"
              multiline
              maxRows={8}
              variant="outlined"
              inputRef={subjRef}
              defaultValue={record.subjective}
            ></TextField>

            <TextField
              fullWidth
              id="objective"
              label="Objective"
              multiline
              maxRows={8}
              variant="outlined"
              inputRef={objRef}
              defaultValue={record.objective}
            ></TextField>

            <TextField
              fullWidth
              id="assessment"
              label="Assessment"
              multiline
              maxRows={8}
              variant="outlined"
              inputRef={assRef}
              defaultValue={record.assessment}
            ></TextField>

            <TextField
              fullWidth
              id="plan"
              label="Plan"
              multiline
              maxRows={8}
              variant="outlined"
              inputRef={planRef}
              defaultValue={record.plan}
            ></TextField>

            <Button onClick={() => updateDetails()} className="col-md-3">
              Save
            </Button>
            <Button className="col-md-3" onClick={() => setIsUpdating(false)}>
              Cancel
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

function RecordModal({
  record,
  selectedUser,
  setShowRecordModal,
  getAllRecords,
}: ModalProps): JSX.Element {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          record={record}
          selectedUser={selectedUser}
          setShowRecordModal={setShowRecordModal}
          getAllRecords={getAllRecords}
        ></Overlay>,
        document.querySelector("#modal-root")!
      )}
    </>
  );
}

export default RecordModal;
