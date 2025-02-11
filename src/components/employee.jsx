import { FaPhone } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import IconText from "./iconText";
import { IoIosClose } from "react-icons/io";

import { useState } from "react";

function Employee({
  edit,
  name,
  surname,
  position,
  department,
  email,
  phone,
  pic,
  date,
  id,
  handleDeleteEmployee,
  handleUpdate,
  handleResubmit,
}) {
  const [obj, setObj] = useState({
    id: id,
    name: name,
    surname: surname,
    position: position,
    department: department,
    email: email,
    phone: phone,
    date: date,
    pic: "",
    edit: false,
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (value.length > 15) {
      alert("Input must be less or equal to 15");
      return;
    }
    if (name === "name" && value.length > 0 && !isNaN(value)) {
      alert("Field must be a string");
    }
    if (name === "surname" && value.length > 0 && !isNaN(value)) {
      alert("Field must be a string");
    }
    if (name === "position" && value.length > 0 && !isNaN(value)) {
      alert("Field must be a string");
    }
    if (name === "department" && value.length > 0 && !isNaN(value)) {
      alert("Field must be a string");
    }
    if (name === "phone" && isNaN(value)) {
      alert("Field must be a number");
    }
    if (name === "id" && isNaN(value)) {
      alert("Field must be a number");
    }
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    setObj((prev) => ({ ...prev, pic: e.target.files[0] }));
  }
  function handleEmployeeUpdate() {
    handleResubmit(id, obj);
    setObj({
      id: "",
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
  }

  return (
    <div>
      {edit === true ? (
        <div className="update-form">
          <div className="cancel-update" onClick={() => handleResubmit(id)}>
            <IoIosClose />
          </div>
          <div className="name">
            <label htmlFor="fname">
              <input
                type="text"
                id="fname"
                name="name"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
                value={obj.name}
              />
            </label>
          </div>
          <div className="surname">
            <label htmlFor="lname">
              <input
                type="text"
                id="lname"
                name="surname"
                placeholder="Surname"
                onChange={(e) => handleChange(e)}
                value={obj.surname}
              />
            </label>
          </div>
          <div className="id">
            <label htmlFor="id-number">
              <input
                type="text"
                id="id-number"
                name="id"
                placeholder=" ID Number"
                onChange={(e) => handleChange(e)}
                value={obj.id}
              />
            </label>
          </div>
          <div className="position">
            <label htmlFor="position">
              <input
                type="text"
                id="position"
                name="position"
                placeholder="Position"
                onChange={(e) => handleChange(e)}
                value={obj.position}
              />
            </label>
          </div>
          <div className="department">
            <label htmlFor="department">
              <input
                type="text"
                id="department"
                name="department"
                placeholder="Department"
                onChange={(e) => handleChange(e)}
                value={obj.department}
              />
            </label>
          </div>
          <div className="email">
            <label htmlFor="edit-email">
              <input
                type="email"
                id="edit-email"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChange(e)}
                value={obj.email}
              />
            </label>
          </div>
          <div className="phone-number">
            <label htmlFor="edit-phone-number">
              <input
                type="text"
                id="edit-phone-number"
                name="phone"
                placeholder="Phone number"
                onChange={(e) => handleChange(e)}
                value={obj.phone}
              />
            </label>
          </div>
          <div className="date-image">
            <input
              type="date"
              id="udate"
              name="date"
              placeholder="Date"
              onChange={(e) => handleChange(e)}
              value={obj.date}
            />
            <div className="profile-pic2">
              <label htmlFor="profile-pic2">
                Upload image
                <input
                  type="file"
                  id="profile-pic2"
                  name="pic"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="Employee">
          <div className="profile-name">
            <div className="profile-pic">{pic && <img src={pic[0]} />}</div>
            <div className="name">
              <div className="fname-sname">{name + " " + surname}</div>
              <div className="position">{position}</div>
            </div>
          </div>
          <div className="id-div">
            <div className="id">ID Number</div>
            <div className="id-value">{id}</div>
          </div>
          <div className="department-date">
            <div className="department">
              <p>Department</p>
              <p className="department-value">{department}</p>
            </div>
            <div className="date">
              <p>Date</p>
              <p className="date-value">{date}</p>
            </div>
          </div>
          <div className="email-phone">
            <IconText classText="email">
              <MdOutlineEmail style={{ paddingRight: "5px" }} />
              {email}
            </IconText>
            <IconText classText="phone">
              <FaPhone style={{ paddingRight: "5px" }} />
              {phone}
            </IconText>
          </div>
        </div>
      )}
      <div className="delete-update">
        <button
          className="update"
          onClick={() => {
            edit ? handleEmployeeUpdate() : handleUpdate(id);
          }}
        >
          {edit ? "Update" : "Edit"}
        </button>

        <button className="delete" onClick={() => handleDeleteEmployee(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Employee;
