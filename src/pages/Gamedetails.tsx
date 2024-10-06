import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Hide,
  Show,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import ScreenShots from "../components/Gamedetails/ScreenShots";
import Achievments from "../components/Gamedetails/Achievments";
import Stores from "../components/Gamedetails/Stores";
import "./gamedetails.css";

interface GameDetail {
  id: number;
  name: string;
  description: string;
  background_image: string;
  released: string;
  metacritic: number;
  website: string;
  platforms: { platform: { name: string } }[];
}

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameDetail, setGameDetail] = useState<GameDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get<GameDetail>(
          `https://api.rawg.io/api/games/${id}?key=7ff649f928e448d58ceaaadcb391c639`
        );
        setGameDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [id]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!gameDetail) return <div>No data available</div>;

  const formattedDescription = gameDetail.description
    .split("Español")[0] // Split and take only the English part
    .replace(/<br\s*\/?>/gi, "") // Remove all <br/> tags
    .replace(/<\/?p>/gi, "") // Remove all <p> and </p> tags
    .split("\n");

  return (
    <div>
      <div
        className="fixedimg"
        style={{
          backgroundImage: `url(${gameDetail.background_image})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "23%",
          left: "4vw",
          width: "90%",
        }}
      >
        <Heading as="h2" size="3xl">
          {gameDetail.name}
        </Heading>
        <Button top='10vh' colorScheme="yellow" borderRadius="20px">
          Purchase
        </Button>
        <Hide below="802px">
          <Stack
            direction={"row"}
            spacing="10"
            style={{
              top: "40vh",
              position: "absolute",
              left: "40vw",
            }}
          >
            <WrapItem
              maxW="sm"
              border="10px solid #ddd" 
              borderRadius="md" 
              p={4} 
              justifyContent="center" 
              alignItems="center" 
            >
              <Center>
                <Stack direction={"row"}>
                  <Heading as="h1" size="4xl">
                    {gameDetail.metacritic}
                  </Heading>
                  <Text fontSize="xl">Metacritic Score</Text>
                </Stack>
              </Center>
            </WrapItem>
            <WrapItem borderWidth="1px" borderRadius="lg" maxW="sm">
              <Heading size="md" textTransform="uppercase">
                available on:{" "}
                <Text>
                  {gameDetail.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </Text>
              </Heading>
            </WrapItem>
          </Stack>
        </Hide>
        <Show below="802px">
          <Stack
            direction={"column"}
            spacing="3"
            style={{
              top: "35vh",
              position: "absolute",
              left: "40vw",
            }}
          >
            <WrapItem
              maxW="sm"
              border="10px solid #ddd" 
              borderRadius="md" 
              p={4} 
              justifyContent="center" 
              alignItems="center" 
            >
              <Center>
                <Heading size="md" textTransform="uppercase">
                  Metacritic Score: {gameDetail.metacritic}
                </Heading>
              </Center>
            </WrapItem>
            <WrapItem borderWidth="1px" borderRadius="lg" maxW="sm">
              <Heading size="md" textTransform="uppercase">
                Platforms:{" "}
                <Text>
                  {gameDetail.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </Text>
              </Heading>
            </WrapItem>
          </Stack>
        </Show>
      </div>
      <ScreenShots ids={id} />
      <div className="details">
        {/* <Box boxShadow="dark-lg" marginTop="auto" marginBottom="auto">
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="md" textTransform="uppercase">
                    Released: {gameDetail.released}
                  </Heading>
                </Box>
                <Box>
                </Box>
                <Box>
                  <Heading size="md" textTransform="uppercase">
                    Website: <Text></Text>
                    <a
                      href={gameDetail.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {gameDetail.website}
                    </a>
                  </Heading>
                </Box>
                <Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box> */}
        <Box
          boxShadow="outline"
          p="6"
          rounded="md"
          color="white"
          fontWeight="bold"
          borderRadius="md"
          bgGradient="linear(to-r, teal.500, green.500)"
          _hover={{
            bgGradient: "linear(to-r, red.500, yellow.500)",
          }}
        >
          {formattedDescription.map((paragraph, index) => (
            <Text key={index} mb={4}>
              {paragraph}
            </Text>
          ))}
        </Box>
        <Achievments ids={id} />
        <Stores ids={id} />
      </div>
    </div>
  );
};

export default GameDetail;
