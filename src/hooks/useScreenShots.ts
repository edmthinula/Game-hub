import useData from "./useData";

export interface Screenshot {
  id: number;
  image: string;
}

const useScreenShots = (id: string) =>
  useData<Screenshot>(`games/${id}/screenshots`);

export default useScreenShots;
