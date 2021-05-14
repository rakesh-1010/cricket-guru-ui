import axios from "axios";
const API_URL = "http://localhost:8090/api/auth/";

let bcrypt = require("bcryptjs");
const register = (username, email, password, roles) => {
  let encryptedPassword = bcrypt.hashSync(password, 8);
  return axios.post(API_URL + "signup", {
    username,
    email,
    password: encryptedPassword,
    roles
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};