import { Button, ButtonGroup, Grid, GridItem, Show, useStatStyles } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import GameGrid from './components/GameGrid'
import GenereList from './components/GenereList'
import { Genere } from './hooks/useGenere'
import { useState } from 'react'

function App() {
  const [selectedGenre , setSelectedGenre] = 
  useState<Genere | null>(null);

  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg :`"nav nav" "aside main"`
  }}>
    <GridItem area='nav'>
    <NavBar/>
    </GridItem>
    <Show above="lg">
      <GridItem area='aside' paddingX={5} >
        <GenereList onSelectGenre={(Genere) => setSelectedGenre(Genere)}/>
        </GridItem>
    </Show>
    <GridItem area='main'>
      <GameGrid selectedGenre={selectedGenre}/>
    </GridItem>
  </Grid>
}

export default App
