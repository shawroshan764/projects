import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8000/getusers");
    console.log(result.data);
    setUser(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/deleteuser/${id}`);
    loadUsers();
  };
  return (
    <div className="container">
      <h1 className="text-center mt-4">Employees Table</h1>
      <Link to="/add-user" className="btn btn-primary">
        Add Employee
      </Link>

      <div className="row">
        <div className="col  mt-4">
          <table class="table table-bordered">
            <thead className="table-dark text-center">
              <tr>
                <th>SN.NO</th>
                <th>NAME</th>
                <th>USERNAME</th>
                <th>EMAIL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {user.map((item, index) => (
                <tr>
                  <td key={index}>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link
                      to={`/updateuser/${item.id}`}
                      className="btn btn-success btn-sm m-1"
                    >
                      EDIT
                    </Link>
                    <button
                    type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(item.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
