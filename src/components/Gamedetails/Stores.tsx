import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";

interface StoresProps {
  ids: string | undefined;
}

interface Store {
  store_id: string;
  url: string;
  name?: string; // name is optional since it will be fetched later
}

const apikey = import.meta.env.VITE_RAWG_API;
function Stores({ ids }: StoresProps) {
  const [wherebuy, setWhereBuy] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWhereToBuy = async () => {
      try {
        const response = await axios.get<{ results: Store[] }>(
          `https://api.rawg.io/api/games/${ids}/stores?key=${apikey}`
        );
        const storesWithNames = await Promise.all(
          response.data.results.map(async (store) => {
            const name = await getStoreName(store.store_id);
            return { ...store, name };
          })
        );
        setWhereBuy(storesWithNames);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    const getStoreName = async (storeId: string) => {
      try {
        const response = await axios.get<{ name: string }>(
          `https://api.rawg.io/api/stores/${storeId}?key=7ff649f928e448d58ceaaadcb391c639`
        );
        return response.data.name;
      } catch (err) {
        setError((err as Error).message);
        return "Unknown Store";
      }
    };

    if (ids) {
      fetchWhereToBuy();
    }
  }, [ids]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <SimpleGrid columns={{sm: 3, md: 2}} spacing='4px'>
        {wherebuy.map((store) => (
          <div key={store.store_id}>
            <a href={store.url} target="_blank" rel="noopener noreferrer">
              <Button colorScheme="teal" size="md">
                {store.name}
              </Button>
            </a>
          </div>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Stores;
