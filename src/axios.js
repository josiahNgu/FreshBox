import axios from "axios";
const instance = axios.create({
  baseURL:
    // "https://us-central1-subscriptionservice-f776d.cloudfunctions.net/api"
    "http://localhost:5000/subscriptionservice-f776d/us-central1/api"
});

export default instance;
