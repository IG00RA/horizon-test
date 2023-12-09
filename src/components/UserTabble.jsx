import { useState, useEffect } from "react";
import { fetchUsers } from "../api";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
      console.log(data);
    };

    fetchData();
  }, []);

  const handleUpdateUser = (userId) => {
    // Логіка оновлення користувача
    console.log(`Update user with ID ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Логіка видалення користувача
    console.log(`Delete user with ID ${userId}`);
  };

  const handleAddUser = () => {
    // Логіка додавання користувача
    console.log("Add new user");
  };

  return (
    <div>
      <h1>Users Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Number Phone</th>
            <th>Country</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.numberPhone}</td>
              <td>{user.country}</td>
              <td>{user.height}</td>
              <td>{user.weight}</td>
              <td>
                <button onClick={() => handleUpdateUser(user._id)}>
                  Update
                </button>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default UsersTable;
