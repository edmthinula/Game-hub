import useData from "./useData";

export interface Store {
  store_id: string;
  url: string;
}

const useStores = (id: string) => useData<Store>(`games/${id}/stores`);

export default useStores;
