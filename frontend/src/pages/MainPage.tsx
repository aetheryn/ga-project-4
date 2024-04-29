import { useEffect, useState } from "react";
import RecordCard from "../components/RecordCard";
import { Record } from "../interfaces/record";
import useFetch from "../hooks/useFetch";
import RecordForm from "../components/RecordForm";
import { Button } from "@mui/material";

function MainPage(): JSX.Element {
  const [allRecords, setAllRecords] = useState<Record[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const fetchData = useFetch();

  async function getAllRecords() {
    try {
      const response: any = await fetchData(
        "/details",
        "GET",
        undefined,
        undefined
      );

      if (response.ok) {
        const tempArray = [...response.data];
        setAllRecords(tempArray.sort((a, b) => b.id - a.id));
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getAllRecords();
  }, []);

  return (
    <div>
      {showForm && (
        <>
          <RecordForm
            getAllRecords={getAllRecords}
            setShowForm={setShowForm}
          ></RecordForm>
          <Button
            onClick={() => {
              setShowForm(false);
            }}
          >
            Cancel
          </Button>
        </>
      )}

      {!showForm && (
        <>
          <Button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create New Entry
          </Button>
          {allRecords.map((record) => {
            return (
              <div className="cols-sm">
                <RecordCard
                  record={record}
                  getAllRecords={getAllRecords}
                ></RecordCard>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default MainPage;
