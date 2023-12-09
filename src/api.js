import axios from "axios";

axios.defaults.baseURL = "https://horizon-backend-1ce4.onrender.com/api";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};
