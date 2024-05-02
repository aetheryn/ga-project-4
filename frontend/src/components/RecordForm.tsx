import { useContext, useEffect, useRef } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import { useState } from "react";
import { User } from "../classes/user";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

interface FormProps {
  getAllRecords: () => void;
  setShowForm: (arg: boolean) => void;
}

function RecordForm(props: FormProps): JSX.Element {
  const { getAllRecords, setShowForm } = props;
  const [allPatients, setAllPatients] = useState<User[]>([]);
  const [userId, setUserId] = useState<User["id"]>(0);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const nameRef = useRef<HTMLInputElement>(
    document.querySelector("#patient-name")
  );
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

  function getPatients() {
    const tempArray: User[] = [...userCtx.allUsers];
    const listOfPatients: User[] = tempArray.filter(
      (user) => user.role === "PATIENT"
    );
    setAllPatients(listOfPatients);
  }

  async function getUserId() {
    try {
      const response: any = await fetchData(
        "/users",
        "POST",
        { fullName: nameRef.current?.value },
        undefined
      );

      if (response.ok) {
        setUserId(response.data.id);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  }

  async function createDetails() {
    try {
      const response: any = await fetchData(
        "/details",
        "PUT",
        {
          doctorId: userCtx.loggedInUser.id,
          patientId: userId,
          subjective: subjRef.current?.value,
          objective: objRef.current?.value,
          assessment: assRef.current?.value,
          plan: planRef.current?.value,
        },
        userCtx.accessToken
      );

      if (response.ok) {
        getAllRecords();
        setShowForm(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <form className="record-form">
      <Autocomplete
        freeSolo
        id="patient-name"
        options={allPatients.map((user) => user.full_name)}
        renderInput={(params) => (
          <TextField {...params} label="Patient Name" inputRef={nameRef} />
        )}
        onSelect={getUserId}
      />

      <label>Subjective</label>
      <textarea
        required
        id="subjective"
        ref={subjRef}
        className="record-form-input"
        rows={4}
        style={{ resize: "none" }}
      ></textarea>

      <label>Objective</label>
      <textarea
        required
        id="objective"
        ref={objRef}
        className="record-form-input"
        rows={4}
        style={{ resize: "none" }}
      ></textarea>

      <label>Assessment</label>
      <textarea
        required
        id="assessment"
        ref={assRef}
        className="record-form-input"
        rows={4}
        style={{ resize: "none" }}
      ></textarea>

      <label>Plan</label>
      <textarea
        required
        id="plan"
        ref={planRef}
        className="record-form-input"
        rows={4}
        style={{ resize: "none" }}
      ></textarea>

      <button className="button" onClick={() => createDetails()}>
        Create
      </button>

      <button
        className="button"
        onClick={() => {
          setShowForm(false);
        }}
        style={{ marginTop: "0.5rem" }}
      >
        Cancel
      </button>
    </form>
  );
}

export default RecordForm;
