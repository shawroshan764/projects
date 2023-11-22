import React,{useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const cardStyle = {
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  };

  const {id} = useParams();
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });
  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUsers();
  },[])

  const updateEmployee = async (e) => {
    await axios.put(`http://localhost:8000/updateuser/${id}`,user);
    navigate("/");
  };
  const loadUsers = async() =>{
    const result = await axios.get(`http://localhost:8000/user/${id}`);
    setUser(result.data);
  }
  return (
    <div className="container">
      <h1 className="text-center mt-4">ADD NEW EMPLOYEE</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <div className="card mt-4" style={cardStyle}>
            <div className="card-body">
              <div class="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div class="row mt-4">
                <div className="col">
                  <label htmlFor="formGroupExampleInput" class="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="float-end mt-4">
                <Link to="/" className="btn btn-outline-primary m-1">
                  Back
                </Link>
                <button
                  type="button"
                  onClick={updateEmployee}
                  className="btn btn-primary"
                >
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
