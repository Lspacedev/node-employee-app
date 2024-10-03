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

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic2");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);

    fReader.onloadend = function (event) {
      setObj({ ...obj, pic: event.target.result });
    };
    /*let url = URL.createObjectURL(e.target.files[0]);
    obj.pic = url;*/
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
            <div className="profile-pic">{pic && <img src={pic} />}</div>
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
