import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectUsers } from "../redux/selectors";
import { deleteUser, editUser, fetchUsers, addUser } from "../redux/operations";
import UserForm from "./UserForm";
import ModalContainer from "./Modal/ModalConatiner";
import UserTableBody from "./UserTableBody";
import LoaderMain from "./Loader/LoaderMain";

const UsersTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const isLoading = useSelector(selectIsLoading);
  const users = useSelector(selectUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleUpdateUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleAddUser = (data) => {
    dispatch(addUser(data));
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
    setAddModalOpen(false);
  };

  const handleSaveChanges = (formData) => {
    dispatch(editUser({ id: editingUser._id, data: formData }));
    handleCloseModal();
  };

  return (
    <div>
      <h1>Users Table</h1>
      <button onClick={() => setAddModalOpen(true)}>Add User</button>
      {isLoading && <LoaderMain />}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <UserTableBody
          users={users}
          handleUpdateUser={handleUpdateUser}
          handleDeleteUser={handleDeleteUser}
        />
      </table>
      <ModalContainer isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        {editingUser && (
          <UserForm
            initialValues={{
              name: editingUser.name,
              surname: editingUser.surname,
              numberPhone: editingUser.numberPhone,
              country: editingUser.country,
              height: editingUser.height,
              weight: editingUser.weight,
            }}
            onSubmit={handleSaveChanges}
            text="Update User"
            closeModal={handleCloseModal}
          />
        )}
      </ModalContainer>
      <ModalContainer isOpen={isAddModalOpen} onRequestClose={handleCloseModal}>
        <UserForm
          initialValues={{
            name: "",
            surname: "",
            numberPhone: "",
            country: "",
            height: "",
            weight: "",
          }}
          onSubmit={handleAddUser}
          text="Add User"
          closeModal={handleCloseModal}
        />
      </ModalContainer>
    </div>
  );
};

export default UsersTable;
