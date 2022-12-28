import axios from "axios";

const baseUrl = "http://localhost:5000";

const register = async (userData) => {
  const res = await axios.post(baseUrl + "/api/users", userData);

  if (res.data) {
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(baseUrl + "/login", userData);

  if (res.data) {
    console.log(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
