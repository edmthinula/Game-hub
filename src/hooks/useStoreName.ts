import useEntity from "./useEntity";

export interface StoreName {
  name: string;
}

const useStoreName = (storeId: string) =>
  useEntity<StoreName>(`stores/${storeId}`);

export default useStoreName;
