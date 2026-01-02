import useData from "./useData";

export interface Achievements {
  id: string;
  name: string;
  description: string;
  image: string;
}

const useAchievements = (id: string) =>
  useData<Achievements>(`games/${id}/achievements`);

export default useAchievements;
