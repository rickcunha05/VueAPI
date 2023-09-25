import axios, { type AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
 
});

export default apiClient