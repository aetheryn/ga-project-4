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
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<User["id"]>(0);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const nameRef = useRef<HTMLInputElement>(
    document.querySelector("#patient-name")
  );
  const subjRef = useRef<HTMLInputElement>(
    document.querySelector("#subjective")
  );
  const objRef = useRef<HTMLInputElement>(document.querySelector("#objective"));
  const assRef = useRef<HTMLInputElement>(
    document.querySelector("#assessment")
  );
  const planRef = useRef<HTMLInputElement>(document.querySelector("#plan"));

  async function getAllUsers() {
    try {
      const response: any = await fetchData(
        "/users",
        "GET",
        undefined,
        undefined
      );

      if (response.ok) {
        const tempArray: User[] = [...response.data];
        const listOfPatients: User[] = tempArray.filter(
          (user) => user.role === "PATIENT"
        );
        setAllUsers(listOfPatients);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
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
    getAllUsers();
  }, []);

  return (
    <form>
      <Autocomplete
        freeSolo
        id="patient-name"
        options={allUsers.map((user) => user.full_name)}
        renderInput={(params) => (
          <TextField {...params} label="Patient Name" inputRef={nameRef} />
        )}
        onSelect={getUserId}
      />

      <TextField
        required
        fullWidth
        id="subjective"
        label="Subjective"
        multiline
        maxRows={8}
        variant="outlined"
        inputRef={subjRef}
      ></TextField>

      <TextField
        required
        fullWidth
        id="objective"
        label="Objective"
        multiline
        maxRows={8}
        variant="outlined"
        inputRef={objRef}
      ></TextField>

      <TextField
        required
        fullWidth
        id="assessment"
        label="Assessment"
        multiline
        maxRows={8}
        variant="outlined"
        inputRef={assRef}
      ></TextField>

      <TextField
        required
        fullWidth
        id="plan"
        label="Plan"
        multiline
        maxRows={8}
        variant="outlined"
        inputRef={planRef}
      ></TextField>

      <Button onClick={() => createDetails()}>Create</Button>
    </form>
  );
}

export default RecordForm;
