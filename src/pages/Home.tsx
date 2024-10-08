import { Box, Button,Show } from "@chakra-ui/react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavBar from "../components/NavBar";
import GameGrid from "../components/home/GameGrid";
import GenereList from "../components/home/GenereList";
import Landingslideshow from "../components/home/Landingslideshow";
import Fourgame from "../components/home/Fourgame";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const flexDirection = useBreakpointValue<"row" | "column">({
    base: "column",
    lg: "row",
  });

  return (
    <Flex direction="column">
      {/* NavBar */}
      <Box>
        <NavBar
          gameQuery={gameQuery}
          setGameQuery={setGameQuery}
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </Box>

      {/* Slideshow */}
      <Box mt={4} marginBottom='-120px'>
        <Landingslideshow />
      </Box>
      <Box mt={4} display="flex" justifyContent="center"  zIndex={10} top='90vh'>
        <Fourgame />
      </Box>

      <Flex
        direction={flexDirection} // Stack items vertically on smaller screens
        mt={5}
      >

        {/* <Show above="lg">
          <Box flex="1" paddingX={5} marginBottom={5}>
            <GenereList
              selectedGenre={gameQuery.genere}
              onSelectGenre={(genere: Genere) =>
                setGameQuery({ ...gameQuery, genere })
              }
            />
          </Box>
        </Show> */}

        {/* Main Content (GameGrid) */}
        <Box flex="3" paddingLeft={2}>
          {/* Heading and Controls */}
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={5}
          >
            <GameHeading gameQuery={gameQuery} />

            {/* <Show below="lg">
              <Button
                ref={btnRef}
                colorScheme="teal"
                onClick={onOpen}
                marginRight={4}
              >
                <HamburgerIcon />
              </Button>
            </Show> */}
          </Flex>

          {/* Platform Selector and Sort Options */}
          <Flex marginBottom={5} direction={{ base: "column", lg: "row" }}>
            <Flex marginRight={5} direction={{ base: "row", lg: "row" }}>
              <Box>
                <PlatformSelector
                  selectedPlatform={gameQuery.platform}
                  onselectPlatform={(platform) =>
                    setGameQuery({ ...gameQuery, platform })
                  }
                />
              </Box>
              <Box marginLeft={5}>
                <SortSelector
                  sortOrder={gameQuery.sort}
                  onselecetSortorder={(sort) =>
                    setGameQuery({ ...gameQuery, sort })
                  }
                />
              </Box>
            </Flex>
          </Flex>

          {/* GameGrid */}
          <GameGrid gameQuery={gameQuery} />
        </Box>
      </Flex>

      {/* Drawer for Genre List on Smaller Screens */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <GameHeading gameQuery={gameQuery} />
          </DrawerHeader>
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
    </Flex>
  );
}

export default App;
