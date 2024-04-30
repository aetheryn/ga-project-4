import { useContext } from "react";
import UserContext from "../context/user";
import { Record } from "../classes/record";
import styles from "./Modal.module.css";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";

interface ModalProps {
  record: Record;
  setShowAlert: (arg: boolean) => void;
  getAllRecords: () => void;
}

function Overlay(props: ModalProps): JSX.Element {
  const { record, setShowAlert, getAllRecords } = props;
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

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
        setShowAlert(false);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p>Confirm delete?</p>
        <button onClick={handleDelete}>Yes</button>
        <button
          onClick={() => {
            setShowAlert(false);
          }}
        ></button>
      </div>
    </div>
  );
}

function DeleteAlert({
  record,
  setShowAlert,
  getAllRecords,
}: ModalProps): JSX.Element {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          record={record}
          setShowAlert={setShowAlert}
          getAllRecords={getAllRecords}
        ></Overlay>,
        document.querySelector("#modal-root")!
      )}
    </>
  );
}

export default DeleteAlert;
