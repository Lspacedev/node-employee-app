import "./App.css";
import DisplayEmployees from "./components/displayEmployees";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";

function App() {
  const [employees, setEmployees] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch("http://localhost:8000/employees", {
        method: "GET",
      });

      if (response.ok) {
        let data = await response.json();
        // data = data.map((obj) => {
        //   return { ...obj, edit: false };
        // });
        setEmployees(data);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
      setErr(error.message);
    }
  }

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

  async function handleDeleteEmployee(id) {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete employee?"
    );
    if (deleteConfirmation) {
      try {
        const response = await fetch(`http://localhost:8000/employees/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    }
  }

  function handleUpdate(id) {
    const employeesCopy = employees.slice(0);
    let employee = employeesCopy.find((employee) => employee.docId === id);
    employee.edit = true;
    setEmployees(employeesCopy);
  }

  async function handleResubmit(id, obj) {
    if (obj) {
      let updateConfirmation = window.confirm(
        "You are about to update employee information. Continue?"
      );
      if (updateConfirmation) {
        const employeesCopy = employees.slice(0);
        let employee = employeesCopy.find((employee) => employee.docId === id);

        const formData = new FormData();

        formData.append("name", obj.name);
        formData.append("surname", obj.surname);
        formData.append("id", obj.id);
        formData.append("email", obj.email);
        formData.append("department", obj.department);
        formData.append("position", obj.position);
        formData.append("phone", obj.phone);
        formData.append("date", obj.date);
        formData.append("pic", obj.pic);

        try {
          const response = await fetch(
            `http://localhost:8000/employees/${id}`,
            {
              method: "PUT",
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            alert(data.message);
          } else {
            // Handle error
          }
        } catch (error) {
          // Handle error
          setErr(err.message);
        }
        employee.edit = false;
        setEmployees(employeesCopy);

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
        }

        setEmployees(employeesCopy);
      }
    } else {
      const employeesCopy = employees.slice(0);
      let employee = employeesCopy.find((employee) => employee.docId === id);
      employee.edit = false;
      setEmployees(employeesCopy);
    }
  }
  if (err !== "") return <div className="err">{err}</div>;
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
