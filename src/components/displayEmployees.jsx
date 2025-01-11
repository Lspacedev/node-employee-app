import { useState, useEffect } from "react";
import Employee from "./employee";
import useLocalStorage from "./useLocalStorage";
import AddEmployee from "./addEmployee";
import ProfileIcon from "./profileIcon";
import SeachBar from "./searchBar";
import { useNavigate } from "react-router-dom";

function DisplayEmployees() {
  const [employees, setEmployees] = useState([]);
  const [err, setErr] = useState("");
  const [data, setData] = useState("");
  const navigation = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [obj, setObj] = useState({
    name: "",
    surname: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    date: "",
    pic: "",
    edit: false,
  });

  const [searchInput, setSearchInput] = useLocalStorage("searchInput", "");
  const [submittedSearch, setsubmittedSearch] = useLocalStorage(
    "submittedSearch",
    ""
  );

  const [searchResults, setSearchResults] = useState([]);
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [data]);
  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    try {
      const response = await fetch(`${process.env.PROD_URL}/tkn`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      setCsrf(data.csrfToken);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchEmployees() {
    try {
      const response = await fetch(`${process.env.PROD_URL}/employees`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "CSRF-Token": csrf,
        },
      });

      if (response.redirected === true) {
        navigation("/");
        localStorage.clear();
        return;
      }
      if (response.ok) {
        let data = await response.json();
        setEmployees(data);
        setLoading(false);
      } else {
        // Handle error
        setLoading(false);
      }
    } catch (error) {
      // Handle error
      setErr(error.message);
      setLoading(false);
    }
  }
  /* Update screen on every change in search input */

  useEffect(() => {
    if (submittedSearch.length > 0) {
      let filteredEmployees = employees.filter(
        (employee) =>
          employee.name.toLowerCase().match(submittedSearch.toLowerCase()) ||
          employee.surname.toLowerCase().match(submittedSearch.toLowerCase()) ||
          employee.position
            .toLowerCase()
            .match(submittedSearch.toLowerCase()) ||
          employee.department
            .toLowerCase()
            .match(submittedSearch.toLowerCase()) ||
          employee.docId.toString().match(submittedSearch) ||
          employee.phone.toString().match(submittedSearch.toString()) ||
          employee.email.match(submittedSearch) ||
          employee.date.toLowerCase().match(submittedSearch.toLowerCase())
      );
      if (filteredEmployees.length === 0) {
        setNotFound(true);
      }
      setSearchResults(filteredEmployees);
    } else {
      setSearchResults(employees);
    }
    return () => {
      setSearchResults([]);
    };
  }, [employees, submittedSearch]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    if (e.target.value.length === 0) {
      setsubmittedSearch("");
    }
    setSearchInput(e.target.value);
  };
  function handleSearchSubmit() {
    setsubmittedSearch(searchInput);
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
        const response = await fetch(
          `${process.env.PROD_URL}/employees/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "CSRF-Token": csrf,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);

          alert(data.message);
        } else {
          // Handle error
        }
      } catch (error) {
        // Handle error
        setErr(error.message);
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
            `${process.env.PROD_URL}/employees/${id}`,
            {
              method: "PUT",
              credentials: "include",
              headers: {
                "CSRF-Token": csrf,
              },
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            setData(data);
            alert(data.message);
          } else {
            // Handle error
          }
          navigation(0);
        } catch (error) {
          // Handle error
          setErr(error.message);
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
  if (loading === true) return <div className="loading">Loading...</div>;
  if (err !== "") return <div className="err">{err}</div>;
  return (
    <div className="Display">
      <div className="header">
        <div className="search-profile">
          <SeachBar
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            searchInput={searchInput}
          />

          <ProfileIcon />
        </div>
        <div className="count-add">
          <div className="employee-count">
            <div>{employees.length}</div> <p> Employees</p>
          </div>

          <AddEmployee
            handleAddEmployees={handleAddEmployees}
            handleResubmit={handleResubmit}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>

      <ul className="employees-display">
        {searchResults.length !== 0 ? (
          searchResults.map((employee, i) => (
            <li key={i}>
              <Employee
                edit={employee.edit}
                name={employee.name}
                surname={employee.surname}
                position={employee.position}
                department={employee.department}
                email={employee.email}
                phone={employee.phone}
                pic={employee.pic}
                date={employee.date}
                id={employee.docId}
                handleDeleteEmployee={handleDeleteEmployee}
                handleUpdate={handleUpdate}
                handleResubmit={handleResubmit}
              />
            </li>
          ))
        ) : searchResults.length === 0 && notFound === true ? (
          <div>No results</div>
        ) : (
          employees.map((employee, i) => (
            <li key={i}>
              <Employee
                edit={employee.edit}
                name={employee.name}
                surname={employee.surname}
                position={employee.position}
                department={employee.department}
                email={employee.email}
                phone={employee.phone}
                pic={employee.pic}
                date={employee.date}
                id={employee.docId}
                handleDeleteEmployee={handleDeleteEmployee}
                handleUpdate={handleUpdate}
                handleResubmit={handleResubmit}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default DisplayEmployees;
