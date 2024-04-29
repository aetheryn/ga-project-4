import { useEffect, useState } from "react";
import RecordCard from "../components/RecordCard";
import { Record } from "../interfaces/record";
import useFetch from "../hooks/useFetch";
import { User } from "../interfaces/user";

function MainPage(): JSX.Element {
  const [allRecords, setAllRecords] = useState<Record[]>([]);
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

  async function getAllRecords() {
    try {
      const response: any = await fetchData(
        "/details",
        "GET",
        undefined,
        undefined
      );

      if (response.ok) {
        setAllRecords(response.data);
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
      {allRecords.map((record) => {
        return (
          <div className="cols-sm">
            <RecordCard
              record={record}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              getAllRecords={getAllRecords}
            ></RecordCard>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
