import { Box, Button, Center, Divider, Flex, Heading, HStack, Image, Show, Text } from "@chakra-ui/react";
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
import ColorModdSwitch from "./ColorModdSwitch";
import SearchInput from "./home/searchInput";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import GameHeading from "./home/GameHeading";
import { GameQuery } from "../pages/Home";
import GenereList from "./home/GenereList";
import { Genere } from "../hooks/useGenere";
import { PlatformSelector } from "./home/PlatformSelector";
import SortSelector from "./home/SortSelector";
interface Props {
  gameQuery: GameQuery;  // Receive gameQuery as prop
  setGameQuery: (query: GameQuery) => void;  // Receive setGameQuery function as prop
  onSearch: (SerchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <HStack
      padding="10px"
      position="absolute"
      zIndex={10}
      bg="#1a202c"
      w="100%"
    >
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} marginRight={4}>
        <HamburgerIcon />
      </Button>
      <Image src={Logo} boxSize="60px" borderRadius={20} />
      <SearchInput onSearch={onSearch} />
      <Show above="700px">
      <Flex marginLeft='10px'  direction={{ base: "column", lg: "row" }}>
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
                <Heading as='h2' size='3xl' marginTop='20px'>
                    Games
                  </Heading>
            </Center>
          </DrawerHeader>
          <Divider/>
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
      {/* <ColorModdSwitch/> */}
    </HStack>
  );
};

export default NavBar;
