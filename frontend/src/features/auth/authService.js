import axios from "axios";

const baseUrl = "http://localhost:5000";

const register = async (userData) => {
  const res = await axios.post(baseUrl + "/api/users", userData);

  if (res.data) {
    console.log(res.data);
    sessionStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(baseUrl + "/login", userData);

  if (res.data) {
    console.log(res.data);
    sessionStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  login,
};

export default authService;
