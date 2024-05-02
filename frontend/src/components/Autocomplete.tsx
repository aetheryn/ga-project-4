import { SyntheticEvent, useContext, useEffect } from "react";
import { useState } from "react";
import { User } from "../classes/user";
import UserContext from "../context/user";

interface AutocompleteProps {
  allPatients: User[];
  setAllPatients: (arg: User[]) => void;
  inputValue: string;
  setInputValue: (arg: string) => void;
  getUserId: (arg: string) => void;
}

function Autocomplete(props: AutocompleteProps): JSX.Element {
  const { allPatients, setAllPatients, inputValue, setInputValue, getUserId } =
    props;

  const [suggestions, setSuggestions] = useState<User[] | [string]>([]);
  const userCtx = useContext(UserContext);

  function getPatients(): void {
    const tempArray: User[] = [...userCtx.allUsers];
    const listOfPatients: User[] = tempArray.filter(
      (user) => user.role === "PATIENT"
    );
    setAllPatients(listOfPatients);
  }

  function handleInputChange(event: SyntheticEvent) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const value = inputElement.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = allPatients.filter((suggestion) =>
        suggestion["full_name"].toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(
        filteredSuggestions.length > 0
          ? filteredSuggestions
          : ["No matches found"]
      );
    } else {
      setSuggestions([]);
    }
  }

  function handleSuggestionClick(value: User): void {
    setInputValue(value["full_name"]);
    getUserId(value["full_name"]);
    setSuggestions([]);
  }

  useEffect(() => {
    getPatients();
  }, []);

  // Event handlers and other methods will go here

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        className="record-form-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list" id="autocomplete-list" role="listbox">
          {suggestions.map((suggestion, index) =>
            typeof suggestion !== "string" ? (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                role="option"
                // Additional props
              >
                {suggestion.full_name}
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
