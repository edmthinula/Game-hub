import { Button, ButtonGroup, Grid, GridItem, HStack, Show, useStatStyles } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import GameGrid from './components/GameGrid'
import GenereList from './components/GenereList'
import { Genere } from './hooks/useGenere'
import { useState } from 'react'
import { PlatformSelector } from './components/PlatformSelector'
import { platform } from './hooks/useGames'
import SortSelector from './components/SortSelector'

export interface GameQuery{
  genere: Genere | null;
  platform: platform | null;

}


function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery)

  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg :`"nav nav" "aside main"`
  }}>
    <GridItem area='nav'>
    <NavBar/>
    </GridItem>
    <Show above="lg">
      <GridItem area='aside' paddingX={5} marginBottom={5}>
        <GenereList selectedGenre={gameQuery.genere} onSelectGenre=
        {(genere: Genere) => setGameQuery({...gameQuery, genere})}/>
        </GridItem>
    </Show>
    <GridItem area='main'>
      <HStack spacing={5} paddingLeft={2}>
      <PlatformSelector selectedPlatform={gameQuery.platform} onselectPlatform=
      {(platform) => 
        setGameQuery({...gameQuery ,platform})}/>
      <SortSelector/>
      </HStack>
      <GameGrid gameQuery={gameQuery}/>
    </GridItem>
  </Grid>
}

export default App
