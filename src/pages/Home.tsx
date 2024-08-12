import {
  Box,
  Button,
  Spacer,
  Flex,
  Grid,
  GridItem,
  Show,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NavBar from "../components/NavBar";
import GameGrid from "../components/home/GameGrid";
import GenereList from "../components/home/GenereList";
import { Genere } from "../hooks/useGenere";
import { useRef, useState } from "react";
import { PlatformSelector } from "../components/home/PlatformSelector";
import { platform } from "../hooks/useGames";
import SortSelector from "../components/home/SortSelector";
import GameHeading from "../components/home/GameHeading";

export interface GameQuery {
  genere: Genere | null;
  platform: platform | null;
  sort: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null);

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
