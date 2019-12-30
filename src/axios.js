import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/subscriptionservice-f776d/us-central1/api"
});
export default instance;
