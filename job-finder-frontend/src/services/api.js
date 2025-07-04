import axiosInstance from "./axiosInstance";

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

// ✅ Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post("/login", loginData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Invalid credentials" };
  }
};

// ✅ Logout User
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

// ✅ Fetch User Profile
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Profile not found" };
  }
};

// ✅ Update Profile
export const updateProfile = async (updatedData) => {
  try {
    const response = await axiosInstance.put("/update-profile", updatedData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Update is not possible" };
  }
};
