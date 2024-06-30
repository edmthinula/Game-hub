import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";
import { Genere } from "./useGenere";

export interface platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: platform }[];
  metacritic: number;
}

const useGames = (
  selectedGenre: Genere | null,
  selectedPlatform: platform | null
) =>
  useData<Game>("/games", { params:
     { genres: selectedGenre?.id, platforms:selectedPlatform?.id } }, 
     [
    selectedGenre?.id,selectedPlatform?.id
  ]);

export default useGames;
