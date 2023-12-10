import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

axios.defaults.baseURL = "https://74.234.2.2:3001/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (error) {
      Notify.failure("There are no users", { timeout: 2000 });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users", data);
      Notify.success("The user was created", { timeout: 2000 });
      return response.data;
    } catch (error) {
      Notify.failure(`${error.response.data.message}`, {
        timeout: 2000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.put(`/users/${id}`, data);
      Notify.success("The user has been updated", { timeout: 2000 });
      return response.data;
    } catch (error) {
      Notify.failure(`${error.response.data.message}`, {
        timeout: 2000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      Notify.success("The user was successfully deleted", { timeout: 2000 });
      return response.data;
    } catch (error) {
      Notify.failure(`${error.response.data.message}`, {
        timeout: 2000,
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
