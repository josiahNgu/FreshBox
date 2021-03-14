import axios from "axios";
const url =
  // eslint-disable-next-line no-restricted-globals
  location.hostname === "localhost"
    ? "http://localhost:5001/subscriptionservice-f776d/us-central1/api"
    : "https://us-central1-subscriptionservice-f776d.cloudfunctions.net/api";
const instance = axios.create({
  baseURL: url
});

export default instance;
