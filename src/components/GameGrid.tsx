import { SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import useGames, { platform } from "../hooks/useGames";
import GameCard from "./GameCard";
import GamecarSceleton from "./GamecarSceleton";
import GamecardContainer from "./GamecardContainer";
import { Genere } from "../hooks/useGenere";

interface Props{
  selectedGenre : null | Genere;
  selectedPlatform : platform | null;
}

const GameGrid = ({selectedGenre, selectedPlatform}:Props) => {
  const { data, error ,isLoading } = useGames(selectedGenre,selectedPlatform);
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
