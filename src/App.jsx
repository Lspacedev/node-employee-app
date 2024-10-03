import "./App.css";

import DisplayEmployees from "./components/displayEmployees";
import { useState } from "react";
import useLocalStorage from "./components/useLocalStorage";
import Sidebar from "./components/sidebar";

function App() {
  const [employees, setEmployees] = useLocalStorage("employees", []);
  const [count, setCount] = useState(0);

  function handleAddEmployees(obj) {
    //find employee
    const filteredEmployee = employees.filter(
      (employee) =>
        employee.id === obj.id ||
        employee.surname === obj.surname ||
        employee.email === obj.email ||
        employee.phone === obj.phone
    );

    //if employee doesn't exist add them
    if (filteredEmployee.length === 0) {
      if (obj.name === "" || obj.surname === "") {
        alert("Please enter employee name and surname.");
      } else {
        setEmployees((prev) => [...prev, obj]);
      }
    }
  }

  function handleDeleteEmployee(id) {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete employee?"
    );
    if (deleteConfirmation) {
      const filteredEmployees = employees.filter(
        (employee) => employee.id !== id
      );
      alert("Employee has been deleted");
      setEmployees(filteredEmployees);
    }
  }

  function handleUpdate(id) {
    const employeesCopy = employees.slice(0);
    let employee = employeesCopy.find((employee) => employee.id === id);
    employee.edit = true;
    setEmployees(employeesCopy);
  }

  function handleResubmit(id, obj) {
    if (obj) {
      let updateConfirmation = window.confirm(
        "You are about to update employee information. Continue?"
      );
      if (updateConfirmation) {
        const employeesCopy = employees.slice(0);
        let employee = employeesCopy.find((employee) => employee.id === id);
        employee.name = obj.name ? obj.name : employee.name;
        employee.surname = obj.surname ? obj.surname : employee.surname;
        employee.id = obj.id ? obj.id : employee.id;
        employee.position = obj.position ? obj.position : employee.position;
        employee.department = obj.department
          ? obj.department
          : employee.department;
        employee.email = obj.email ? obj.email : employee.email;
        employee.phone = obj.phone ? obj.phone : employee.phone;
        employee.date = obj.date ? obj.date : employee.date;
        employee.pic = obj.pic ? obj.pic : employee.pic;

        employee.edit = false;

        if (
          !obj.name &&
          !obj.surname &&
          !obj.id &&
          !obj.position &&
          !obj.department &&
          !obj.email &&
          !obj.phone &&
          !obj.date &&
          !obj.pic
        ) {
          alert("Error! No update information was entered!");
        } else {
          alert("Employee has been updated");
        }

        setEmployees(employeesCopy);
      }
    } else {
      const employeesCopy = employees.slice(0);
      let employee = employeesCopy.find((employee) => employee.id === id);
      employee.edit = false;
      setEmployees(employeesCopy);
    }
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="Main">
        <DisplayEmployees
          employees={employees}
          handleDeleteEmployee={handleDeleteEmployee}
          handleUpdate={handleUpdate}
          handleResubmit={handleResubmit}
          handleAddEmployees={handleAddEmployees}
        />
      </div>
    </div>
  );
}

export default App;
