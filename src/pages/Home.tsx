import { Box, Button, Center, Divider, Show } from "@chakra-ui/react";
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
import Footer from "../components/Footer";

export interface GameQuery {
  genere: Genere | null;
  platform: platform | null;
  sort: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const gameGridRef = useRef<HTMLDivElement>(null); // Ref for scrolling to GameGrid
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const flexDirection = useBreakpointValue<"row" | "column">({
    base: "column",
    lg: "row",
  });

  // Function to scroll to GameGrid
  const scrollToGameGrid = () => {
    if (gameGridRef.current) {
      gameGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Flex direction="column">
      {/* NavBar */}
      <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <NavBar
          gameQuery={gameQuery}
          setGameQuery={setGameQuery}
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
          scrollToGameGrid={scrollToGameGrid} // Passing the scroll function
        />
      </Box>

      {/* Slideshow */}
      <Box mt={4} marginBottom="-120px">
        <Landingslideshow />
      </Box>

      <Box mt={4} display="flex" justifyContent="center" zIndex={10} top="90vh">
        <Fourgame />
      </Box>

      <Flex direction={flexDirection} mt={5}>
        <Box flex="3" paddingLeft={2}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            marginBottom={5}
          >
            <Center width="100%">
              <GameHeading gameQuery={gameQuery} />
            </Center>
          </Flex>

          <Show below="700px">
            <Flex marginLeft="10px" marginBottom={5} direction={{ base: "column", lg: "row" }}>
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
          </Show>

          {/* GameGrid with ref */}
          <div ref={gameGridRef}>
            <GameGrid gameQuery={gameQuery} />
          </div>
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

      <Divider margin="20px 0 0 0" />
      <Footer />
    </Flex>
  );
}

export default App;
