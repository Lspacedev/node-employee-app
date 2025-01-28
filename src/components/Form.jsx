import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
function Form({ toggleClicked }) {
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
  const [csrf, setCsrf] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    getCsrf();
  }, []);
  async function getCsrf() {
    try {
      const response = await fetch(`${process.env.PROD_URL}/`, {
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
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    setObj((prev) => ({ ...prev, pic: e.target.files[0] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      obj.name === "" ||
      obj.surname === "" ||
      obj.id === "" ||
      obj.email === "" ||
      obj.department === "" ||
      obj.position === "" ||
      obj.phone === "" ||
      obj.pic === ""
    ) {
      alert("Fields are required");
      setLoading(false);

      return;
    }
    //  setLoading(true);
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
      const response = await fetch(`${process.env.PROD_URL}/employees`, {
        method: "POST",
        credentials: "include",
        headers: {
          "CSRF-Token": csrf,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
      // Handle error
      alert(error.message);
    }
    setLoading(false);

    toggleClicked();
    navigation(0);
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="Form">
      <div className="form-div">
        <form>
          <div className="form-close" onClick={handleFormClose}>
            <IoCloseOutline className="icon" />
          </div>
          <h5>Enter employee information</h5>
          <br />
          <div className="name-surname">
            <label htmlFor="fname">
              Name:
              <input
                type="text"
                id="fname"
                name="name"
                maxLength="25"
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
                maxLength="25"
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
                maxLength="25"
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
                maxLength="25"
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
                maxLength="25"
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
                maxLength="25"
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
          <br />
          <button
            className="submit-btn"
            onClick={loading ? console.log() : (e) => handleSubmit(e)}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
