import useEntity from "./useEntity";

export interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  metacritic: number;
  website: string;
  platforms: { platform: { name: string } }[];
}

const useGameDetails = (id: string) => useEntity<GameDetail>(`games/${id}`);

export default useGameDetails;
