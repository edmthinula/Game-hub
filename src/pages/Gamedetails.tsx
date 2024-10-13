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
  HStack,
  Show,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
  Image,
  VStack,
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

  const formattedlink = gameDetail.website
    .replace(/^https?:\/\//i, "") // Remove http:// or https://
    .replace(/^www\./i, "")
    .replace(/\.com(.*)$/, ".com");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const releasedDate = gameDetail.released.replace(/-/g, " ");
  const [year, month, day] = releasedDate.split(" ");
  const monthName = months[parseInt(month) - 1];
  const formattedDay = parseInt(day).toString();
  return (
    <div>
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
        <Button top="10vh" colorScheme="yellow" borderRadius="20px">
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
        <Center>
          <Heading as="h2" size="3xl" marginBottom={7}>
            Achievments
          </Heading>
        </Center>
        <Achievments ids={id} />

        <Box
          p="6"
          marginTop={12}
          rounded="md"
          color="white"
          fontWeight="bold"
          borderRadius="md"
          bg="rgba(44, 44, 44, 1)"
          marginBottom={10}
          style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
            borderRadius: "30px",
          }}
        >
          <HStack>
            <VStack>
              {formattedDescription.map((paragraph, index) => (
                <Text key={index} mb={4}>
                  {paragraph}
                </Text>
              ))}
            </VStack>
            <Image
              src={gameDetail.background_image}
              boxSize="400px"
              objectFit="cover"
            />
          </HStack>
        </Box>
        <Center>
          <Box
            boxShadow="dark-lg"
            marginTop="20px"
            marginBottom="50px"
            maxW="600px"
            width="100%"
            border='4px'
          >
            <HStack>
              <VStack margin='30px 0 30px 0' >
                <Heading size="lg" marginLeft="40px">
                  <a
                    href={gameDetail.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formattedlink}
                  </a>
                </Heading>
                <Text as="samp">Website:</Text>
              </VStack>
              <Spacer />
              <VStack margin='30px 0 30px 0'>
              <Heading size="lg" marginRight="30px">
                {formattedDay} {monthName} {year}
              </Heading>
              <Text as="samp">Released: </Text>
              </VStack>
            </HStack>
          </Box>
        </Center>
        <Stores ids={id} />
      </div>
    </div>
  );
};

export default GameDetail;
