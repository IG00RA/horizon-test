import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchUsers, addUser, deleteUser, editUser } from "./operations";

const usersInitialState = {
  users: [],
  isLoading: false,
  error: "",
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilledGet = (state, action) => {
  state.isLoading = false;
  state.users = action.payload;
  state.error = "";
};

const handleFulfilledAdd = (state, action) => {
  state.isLoading = false;
  state.users.push(action.payload);
  state.error = "";
};

const handleFulfilledUpdate = (state, action) => {
  state.isLoading = false;

  if (action.payload) {
    const idx = state.users.findIndex(
      (user) => user?._id === action.payload._id
    );

    if (idx !== -1) {
      state.users.splice(idx, 1, action.payload);
    }
  } else if (action.error) {
    state.error = action.error.message;
  }
  state.error = "";
};

const handleFulfilledDelete = (state, action) => {
  state.isLoading = false;
  state.users = state.users.filter((user) => user?._id !== action.payload._id);
  state.error = "";
};

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, handleFulfilledGet)
      .addCase(addUser.fulfilled, handleFulfilledAdd)
      .addCase(editUser.fulfilled, handleFulfilledUpdate)
      .addCase(deleteUser.fulfilled, handleFulfilledDelete)
      .addMatcher(
        isAnyOf(
          fetchUsers.pending,
          addUser.pending,
          editUser.pending,
          deleteUser.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchUsers.rejected,
          addUser.rejected,
          editUser.rejected,
          deleteUser.rejected
        ),
        handleRejected
      );
  },
});
export const usersReducer = usersSlice.reducer;
