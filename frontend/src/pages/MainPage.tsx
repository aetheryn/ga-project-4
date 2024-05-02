import { useEffect, useState } from "react";
import RecordCard from "../components/RecordCard";
import { Record } from "../classes/record";
import useFetch from "../hooks/useFetch";
import RecordForm from "../components/RecordForm";

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
    <div className="container">
      {showForm && (
        <>
          <RecordForm
            getAllRecords={getAllRecords}
            setShowForm={setShowForm}
          ></RecordForm>
        </>
      )}

      {!showForm && (
        <div className="row" style={{ display: "grid" }}>
          <button
            className="button"
            onClick={() => {
              setShowForm(true);
            }}
            style={{ justifySelf: "flex-end" }}
          >
            + New Record
          </button>
          <div className="card-container">
            {allRecords.map((record) => {
              return (
                <div>
                  <RecordCard
                    record={record}
                    getAllRecords={getAllRecords}
                    allRecords={allRecords}
                  ></RecordCard>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
