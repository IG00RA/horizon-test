import { DeleteButton, TableData, UpdateButton } from "./UserTableBody.styled";

const UserTableBody = ({ users, handleUpdateUser, handleDeleteUser }) => {
  return (
    <tbody>
      {users?.map((user) => (
        <tr key={user._id}>
          <TableData>{user._id}</TableData>
          <TableData>{user.name}</TableData>
          <TableData>{user.surname}</TableData>
          <TableData>{user.numberPhone}</TableData>
          <TableData>{user.country}</TableData>
          <TableData>{user.height}</TableData>
          <TableData>{user.weight}</TableData>
          <TableData>
            <UpdateButton onClick={() => handleUpdateUser(user._id)}>
              Update
            </UpdateButton>
            <DeleteButton onClick={() => handleDeleteUser(user._id)}>
              Delete
            </DeleteButton>
          </TableData>
        </tr>
      ))}
    </tbody>
  );
};

export default UserTableBody;
