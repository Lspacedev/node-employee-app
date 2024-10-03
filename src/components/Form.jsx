import { useState } from "react";
import { Image } from "react";
function Form({ handleAddEmployees, toggleClicked }) {
  const [obj, setObj] = useState({
    id: "",
    name: "",
    surname: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    pic: "",
    date: "",
    edit: false,
  });
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      obj.pic = event.target.result;
    };
    /*let url = URL.createObjectURL(e.target.files[0]);
    obj.pic = url;*/
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddEmployees(obj);
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
      <div className="form-div">
        <div className="form-close" onClick={handleFormClose}>
          x
        </div>
        <form>
          <h3>Enter employee information</h3>

          <div className="name-surname">
            <label htmlFor="fname">
              Name:
              <input
                type="text"
                id="fname"
                name="name"
                onChange={(e) => handleChange(e)}
                value={obj.name}
              />
            </label>
            <label htmlFor="lname">
              Surname:
              <input
                type="text"
                id="lname"
                name="surname"
                onChange={(e) => handleChange(e)}
                value={obj.surname}
              />
            </label>
          </div>
          <div className="id-number-email">
            <label htmlFor="id-number">
              ID Number:
              <input
                type="text"
                id="id-number"
                name="id"
                onChange={(e) => handleChange(e)}
                value={obj.id}
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={obj.email}
                required
              />
            </label>
          </div>

          <div className="department-position">
            <label htmlFor="department">
              Department:
              <input
                type="text"
                id="department"
                name="department"
                onChange={(e) => handleChange(e)}
                value={obj.department}
              />
            </label>
            <label htmlFor="position">
              Position:
              <input
                type="text"
                id="position"
                name="position"
                onChange={(e) => handleChange(e)}
                value={obj.position}
              />
            </label>
          </div>

          <div className="phone-number-date">
            <label htmlFor="phone-number">
              Phone:
              <input
                type="text"
                id="phone-number"
                name="phone"
                onChange={(e) => handleChange(e)}
                value={obj.phone}
              />
            </label>
            <label htmlFor="date">
              Date:
              <input
                type="date"
                id="date"
                name="date"
                onChange={(e) => handleChange(e)}
                value={obj.date}
              />
            </label>
          </div>

          <div className="profile-pic">
            <label htmlFor="profile-pic">
              Profile picture:
              <input
                type="file"
                id="profile-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Submit"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Form;
