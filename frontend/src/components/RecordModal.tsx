import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { Record } from "../classes/record";
import { User } from "../classes/user";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, TextField } from "@mui/material";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface ModalProps {
  record: Record;
  selectedUser: User;
  setShowRecord: (arg: boolean) => void;
  getAllRecords: () => void;
}

function Overlay(props: ModalProps): JSX.Element {
  const { record, selectedUser, setShowRecord, getAllRecords } = props;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<User>({
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

  const subjRef = useRef<HTMLTextAreaElement>(
    document.querySelector("#subjective")
  );
  const objRef = useRef<HTMLTextAreaElement>(
    document.querySelector("#objective")
  );
  const assRef = useRef<HTMLTextAreaElement>(
    document.querySelector("#assessment")
  );
  const planRef = useRef<HTMLTextAreaElement>(document.querySelector("#plan"));

  const fetchData = useFetch();

  const userCtx = useContext(UserContext);

  async function updateDetails(): Promise<void> {
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
        setIsUpdating(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
    console.log("Detail updated.");
  }

  async function getDoctorDetails() {
    try {
      const response: any = await fetchData(
        "/users/" + record.doctor_id,
        "POST",
        undefined,
        undefined
      );

      if (response.ok) {
        setDoctor(response.data);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <h6 className={styles.name}>Record for {selectedUser.full_name}</h6>
          <div className={styles.details}>
            <label>Subjective</label>
            {!isUpdating && <div>{record.subjective}</div>}
            {isUpdating && (
              <textarea
                required
                id="subjective"
                ref={subjRef}
                className={styles.forminput}
                rows={4}
                style={{ resize: "none" }}
                defaultValue={record.subjective}
              ></textarea>
            )}

            <label>Objective</label>
            {!isUpdating && <div>{record.objective}</div>}
            {isUpdating && (
              <textarea
                required
                id="objective"
                ref={objRef}
                className={styles.forminput}
                rows={4}
                style={{ resize: "none" }}
                defaultValue={record.objective}
              ></textarea>
            )}

            <label>Assessment</label>
            {!isUpdating && <div>{record.assessment}</div>}
            {isUpdating && (
              <textarea
                required
                id="assessment"
                ref={assRef}
                className={styles.forminput}
                rows={4}
                style={{ resize: "none" }}
                defaultValue={record.assessment}
              ></textarea>
            )}

            <label>Plan</label>
            {!isUpdating && <div>{record.plan}</div>}
            {isUpdating && (
              <textarea
                required
                id="plan"
                ref={planRef}
                className={styles.forminput}
                rows={4}
                style={{ resize: "none" }}
                defaultValue={record.plan}
              ></textarea>
            )}

            {!isUpdating && (
              <>
                <label>Consultation</label>
                <div>
                  {record.created_at.toString().slice(0, 10)} by{" "}
                  {doctor.full_name}
                </div>
              </>
            )}
          </div>

          {!isUpdating && userCtx.loggedInUser.id === record.doctor_id && (
            <button
              className={styles.button}
              onClick={() => setIsUpdating(true)}
            >
              Update
            </button>
          )}

          {!isUpdating && (
            <button
              className={`${styles.button} ${styles.return}`}
              onClick={() => setShowRecord(false)}
            >
              &#x2190;
            </button>
          )}

          {isUpdating && (
            <>
              <button onClick={() => updateDetails()} className={styles.button}>
                Save
              </button>
              <button
                className={`${styles.button} ${styles.return}`}
                onClick={() => setIsUpdating(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RecordModal({
  record,
  selectedUser,
  setShowRecord,
  getAllRecords,
}: ModalProps): JSX.Element {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          record={record}
          selectedUser={selectedUser}
          setShowRecord={setShowRecord}
          getAllRecords={getAllRecords}
        ></Overlay>,
        document.querySelector("#modal-root")!
      )}
    </>
  );
}

export default RecordModal;
