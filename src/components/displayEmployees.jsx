import { useState, useEffect } from "react";
import Employee from "./employee";
import useLocalStorage from "./useLocalStorage";
import { IoIosSearch } from "react-icons/io";
import AddEmployee from "./addEmployee";
import ProfileIcon from "./profileIcon";
import SeachBar from "./searchBar";

function DisplayEmployees({
  employees,
  handleDeleteEmployee,
  handleUpdate,
  handleResubmit,
  handleAddEmployees,
}) {
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
          employee.id.toString().match(submittedSearch) ||
          employee.phone.toString().match(submittedSearch.toString()) ||
          employee.email.match(submittedSearch) ||
          employee.date.toLowerCase().match(submittedSearch.toLowerCase())
      );
      setSearchResults(filteredEmployees);
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
            <div>{employees.length}</div> <p> employees</p>
          </div>

          <AddEmployee
            handleAddEmployees={handleAddEmployees}
            handleResubmit={handleResubmit}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>

      <ul className="employees-display">
        {searchResults.length !== 0
          ? searchResults.map((employee, i) => (
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
                  id={employee.id}
                  handleDeleteEmployee={handleDeleteEmployee}
                  handleUpdate={handleUpdate}
                  handleResubmit={handleResubmit}
                />
              </li>
            ))
          : employees.map((employee, i) => (
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
            ))}
      </ul>
    </div>
  );
}

export default DisplayEmployees;
