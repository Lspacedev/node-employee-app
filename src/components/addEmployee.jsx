import { useState } from "react";
import Form from "./Form";

function AddEmployee({ count, handleAddEmployees }) {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="Add">
      <div className="Add-div">
        <div onClick={toggleClicked}>Add Employee</div>
      </div>
      {clicked && (
        <Form
          handleAddEmployees={handleAddEmployees}
          toggleClicked={toggleClicked}
          count={count}
        />
      )}
    </div>
  );
}

export default AddEmployee;
