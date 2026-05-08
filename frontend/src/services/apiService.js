import axios from "axios";

const API = axios.create({
  baseURL: "https://lost-n-found-govn.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (input) => {
  return API.post("/user/login", input);
};

export const signupUser = (input) => {
    return API.post("/user/register",input)
}

export const logout = () => {
    return API.get('/user/logout')
}

export const searchPost = (formData) => {
  return API.post("/post/addpost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};

export const getNearby = (id) => {
    return API.get(`/post/nearby/${id}`)
}

export const postDelete = (id) => {
    return API.get(`/post/delete/${id}`)
}

export const markAsFound = (id) => {
  return API.put(`/post/update/${id}`, {}, {
    withCredentials: true,
  });
};

export const getAllPost = () => {
    return API.get(`/post/getallpost`)
}

