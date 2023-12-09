const UserTableBody = ({ users, handleUpdateUser, handleDeleteUser }) => {
  return (
    <tbody>
      {users?.map((user) => (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.surname}</td>
          <td>{user.numberPhone}</td>
          <td>{user.country}</td>
          <td>{user.height}</td>
          <td>{user.weight}</td>
          <td>
            <button onClick={() => handleUpdateUser(user._id)}>Update</button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableBody;
