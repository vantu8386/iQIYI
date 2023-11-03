import axios from "axios";

const apiClouddinary = axios.create({
  baseURL: "http://api.cloudinary.com/v1_1/",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export default apiClouddinary 
