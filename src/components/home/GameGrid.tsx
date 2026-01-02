import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useGames, { platform } from "../../hooks/useGames";
import GameCard from "./GameCard";
import GamecarSceleton from "./GamecarSceleton";
import GamecardContainer from "./GamecardContainer";
import { GameQuery } from "../../pages/Home";

interface Props{
  gameQuery:GameQuery;
}

const GameGrid = ({gameQuery}:Props) => {
  const { data, error ,isLoading } = useGames(gameQuery)
  const Skeletons = [1,2,3,4,5,6];

  if(error) return <Text>{error}</Text>

  return (
    <>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={6}
      >
        {isLoading && Skeletons.map
        ((skeleton)=> 
        <GamecardContainer key={skeleton}>
          <GamecarSceleton />
        </GamecardContainer>
        
        )}
        {data.map((game) => (
          <GamecardContainer key={game.id}>
            <GameCard game={game} />
          </GamecardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
