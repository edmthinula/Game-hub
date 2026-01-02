import useData from "./useData";
import { GameQuery } from "../pages/Home";

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
  useData<Game>("games", { params:
     { genres: gamequery.genere?.id, 
      platforms:gamequery.platform?.id,
      ordering: gamequery.sort,
      search:gamequery.searchText
    } }, 
     [
    gamequery
  ]);

export default useGames;
