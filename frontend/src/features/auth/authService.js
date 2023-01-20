import axios from "axios";

//const baseUrl = "http://localhost:5000";
const baseUrl = "";

const register = async (userData) => {
  const res = await axios.post(baseUrl + "/api/users", userData);

  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(baseUrl + "/login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("access_token", res.data["access_token"]);
  }

  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
};

const editProfile = async (userData, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(baseUrl + `/api/users/${id}`, userData, config);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  login,
  logout,
  editProfile,
};

export default authService;
