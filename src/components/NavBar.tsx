import { Box, Button, Center, Divider, Flex, Heading, HStack, Image, Show } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../assets/tj.webp";
import SearchInput from "./home/searchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { GameQuery } from "../pages/Home";
import GenereList from "./home/GenereList";
import { Genere } from "../hooks/useGenere";
import { PlatformSelector } from "./home/PlatformSelector";
import SortSelector from "./home/SortSelector";
import { platform } from "../hooks/useGames"; // Make sure this import is correct
import { MdPadding } from "react-icons/md";

interface Props {
  gameQuery: GameQuery; // Receive gameQuery as prop
  setGameQuery: (query: GameQuery) => void; // Receive setGameQuery function as prop
  onSearch: (searchText: string) => void;
  scrollToGameGrid: () => void;
}

const NavBar = ({ gameQuery, setGameQuery, onSearch, scrollToGameGrid }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePlatformSelect = (platform: platform) => { // Changed from string to platform
    setGameQuery({ ...gameQuery, platform });
    scrollToGameGrid(); // Scroll to GameGrid after selection
  };

  const handleSortSelect = (sort: string) => {
    setGameQuery({ ...gameQuery, sort });
    scrollToGameGrid(); // Scroll to GameGrid after selection
  };

  return (
    <HStack
      padding="10px"
      position="absolute"
      zIndex={10}
      bg="#1a202c"
      w="100%"
    >
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen} marginRight={4}>
        <HamburgerIcon />
      </Button>
      <Image src={Logo} boxSize="60px" borderRadius={20} />
      <SearchInput onSearch={onSearch} />
      <Show above="700px">
        <Flex marginLeft="10px" direction={{ base: "column", lg: "row" }}>
          <Flex marginRight={5} direction={{ base: "row", lg: "row" }}>
            <Box>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onselectPlatform={handlePlatformSelect} // Call the handler
              />
            </Box>
            <Box marginLeft={5}>
              <SortSelector
                sortOrder={gameQuery.sort}
                onselecetSortorder={handleSortSelect} // Call the handler
              />
            </Box>
          </Flex>
        </Flex>
      </Show>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Center>
              <Heading as="h2" size="3xl" marginTop="20px">
                Games
              </Heading>
            </Center>
          </DrawerHeader>
          <Divider />
          <DrawerBody
                  style={{
                    padding:0
                  }}
          >
            <GenereList
              selectedGenre={gameQuery.genere}
              onSelectGenre={(genere: Genere) =>
                setGameQuery({ ...gameQuery, genere })
              }
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default NavBar;
