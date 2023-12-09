import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectUsers } from "../../redux/selectors";
import {
  deleteUser,
  editUser,
  fetchUsers,
  addUser,
} from "../../redux/operations";
import UserForm from "../UserForm/UserForm";
import ModalContainer from "../Modal/ModalConatiner";
import UserTableBody from "../UserTableBody/UserTableBody";
import LoaderMain from "../Loader/LoaderMain";
import { AddButton, TableHead, TableRow, TableWrap } from "./UsersTable.styled";

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

  const handleDeleteUser = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(fetchUsers());
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
    <TableWrap>
      <AddButton onClick={() => setAddModalOpen(true)}>Add User</AddButton>
      {isLoading && <LoaderMain />}
      <table>
        <thead>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
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
    </TableWrap>
  );
};

export default UsersTable;
