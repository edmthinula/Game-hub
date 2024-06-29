import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GamecarSceleton from "./GamecarSceleton";
import GamecardContainer from "./GamecardContainer";


const GameGrid = () => {
  const { data, error ,isLoading } = useGames();
  const Skeletons = [1,2,3,4,5,6];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding="10px"
        spacing={3}
      >
        {isLoading && Skeletons.map
        ((skeleton)=> 
        <GamecardContainer>
          <GamecarSceleton key={skeleton}/>
        </GamecardContainer>
        
        )}
        {data.map((game) => (
          <GamecardContainer>
            <GameCard key={game.id} game={game} />
          </GamecardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
