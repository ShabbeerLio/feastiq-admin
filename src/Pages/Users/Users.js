import React, { useEffect, useState } from "react";
import Host from "../../Components/Host/Host";
import "./Users.css";
import { MdDelete, MdEdit } from "react-icons/md";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 28;
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${Host}/auth/getallusers`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const json = await response.json();
        setUsers(json.reverse());
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    // console.log(userId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${Host}/auth/deleteuser/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Delete failed");
      }

      // setMessage(data.message);
      alert(data.message);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
      // setMessage(err.message || "Delete failed");
    }
  };
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="Home-button">
          <h3>
            Users{" "}
            <span style={{ fontWeight: "normal" }}>
              ({filteredUsers.length} total)
            </span>
          </h3>
          <div className="planet-filter">
            <div className="group">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="search-icon"
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                id="query"
                className="input"
                type="search"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="Home-box">
          {users &&
            users.length > 0 &&
            currentUsers?.map((j) => (
              <div className="Home-card" key={j._id}>
                <div className="Home-card-head">
                  <h5>{j.name}</h5>
                  <div className="Home-card-button">
                    <p onClick={() => deleteUser(j._id)}>
                      <MdDelete />
                    </p>
                  </div>
                </div>
                <div className="Home-card-box">
                  <p>
                    Email: <span>{j.email}</span>
                  </p>
                  <p>
                    Age: <span>{j.age}</span>
                  </p>
                  <p>
                    Gender: <span>{j.gender}</span>
                  </p>
                  <p>
                    Weight: <span>{j.weight}</span>
                  </p>
                  <p>
                    Height: <span>{j.height}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
