import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";
import { Genere } from "./useGenere";
import { GameQuery } from "../App";

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
  gamequery:GameQuery
) =>
  useData<Game>("/games", { params:
     { genres: gamequery.genere?.id, platforms:gamequery.platform?.id } }, 
     [
    gamequery
  ]);

export default useGames;
