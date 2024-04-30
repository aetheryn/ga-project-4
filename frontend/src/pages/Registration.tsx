import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Navigate } from "react-router-dom";

function Registration(): JSX.Element {
  return (
    <>
      <TextField fullWidth id="username" label="Username" variant="standard" />

      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        variant="standard"
      />

      <TextField
        fullWidth
        id="full-name"
        label="Full Name"
        variant="standard"
      />

      <TextField
        fullWidth
        id="date-of-birth"
        label="Date of Birth"
        variant="standard"
      />

      <TextField fullWidth id="contact" label="Contact" variant="standard" />

      <TextField
        fullWidth
        multiline
        maxRows={2}
        id="address"
        label="Address"
        variant="standard"
      />

      <Select fullWidth label="Role">
        <MenuItem value={"DOCTOR"}>Doctor</MenuItem>
        <MenuItem value={"PATIENT"}>Patient</MenuItem>
      </Select>

      <Button>Return</Button>
    </>
  );
}

export default Registration;
