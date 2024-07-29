
import { AxiosResponse } from "axios";
import { Jokes } from "./JokesModels";
import axiosInstance from "@/lib/axios-config";

interface JokeService {
  createJoke: (data: Jokes) => Promise<AxiosResponse<Jokes>>;
}

export const jokeService: JokeService = {
  createJoke: (data: Jokes) => axiosInstance.post("/api/jokes", data)
}