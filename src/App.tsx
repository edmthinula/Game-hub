import {
  Box,
  Button,
  ButtonGroup,
  Spacer,
  Flex,
  Grid,
  GridItem,
  HStack,
  Show,
  useStatStyles,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenereList from "./components/GenereList";
import { Genere } from "./hooks/useGenere";
import { useState } from "react";
import { PlatformSelector } from "./components/PlatformSelector";
import { platform } from "./hooks/useGames";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import Mobilenavbar from "./components/Mobilenavbar";
import React from "react";

export interface GameQuery {
  genere: Genere | null;
  platform: platform | null;
  sort: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5} marginBottom={5}>
          <GenereList
            selectedGenre={gameQuery.genere}
            onSelectGenre={(genere: Genere) =>
              setGameQuery({ ...gameQuery, genere })
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <Flex>
          <GameHeading gameQuery={gameQuery}/>
          <Spacer/>
          <Show breakpoint='(max-width: 977px)'>

          <Button ref={btnRef} colorScheme='teal' onClick={onOpen} marginRight={4}>
          <HamburgerIcon/>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader><GameHeading gameQuery={gameQuery}/></DrawerHeader>
  
            <DrawerBody>
            <GenereList
            selectedGenre={gameQuery.genere}
            onSelectGenre={(genere: Genere) =>
              setGameQuery({ ...gameQuery, genere })
            }
          />
            </DrawerBody>
          </DrawerContent>
        </Drawer>



          </Show>
          </Flex>
          <Flex  marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onselectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />
            </Box>
            <SortSelector
              sortOrder={gameQuery.sort}
              onselecetSortorder={(sort) => setGameQuery({ ...gameQuery, sort })}
            />
          </Flex>
        </Box>
        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
