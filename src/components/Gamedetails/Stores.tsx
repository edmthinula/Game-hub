import { SimpleGrid } from "@chakra-ui/react";
import useStores from "../../hooks/useStores";
import StoreButton from "./StoreButton";

interface StoresProps {
  id: string | undefined;
}

interface Store {
  store_id: string;
  url: string;
}

function Stores({ id }: StoresProps) {

  const {data,error,isLoading} = useStores(id||'')


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <SimpleGrid columns={{sm: 3, md: 2}} spacing='4px'>
        {data.map((store) => (
          <div key={store.store_id}>
            <StoreButton storeId={store.store_id} url={store.url}/>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Stores;
