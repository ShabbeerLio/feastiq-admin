import react from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
import Host from "../Components/Host/Host";

const ContextState = (props) => {
  const notesData = [];

  const [notes, setNotes] = useState(notesData);

  // Get all gochar
  const getDetails = async () => {
    const response = await fetch(`${Host}/admindetail/all`, {
      method: "GET",
    });
    const json = await response.json();
    // console.log(json, "json");
    setNotes(json);
  };

   // Edit Plan
  const editPlan = async (id, updatedplan) => {
    try {
      const response = await fetch(`${Host}/plan/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(updatedplan),
      });

      if (!response.ok) throw new Error("Failed to update Plan");
      const updatedClient = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedClient.client : note))
      );
      await getDetails();
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getDetails,
        editPlan
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default ContextState;
