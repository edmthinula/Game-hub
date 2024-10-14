import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Gamedetails/Navbar";
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
  useBreakpointValue,
  Divider,
} from "@chakra-ui/react";
import ScreenShots from "../components/Gamedetails/ScreenShots";
import Achievments from "../components/Gamedetails/Achievments";
import Stores from "../components/Gamedetails/Stores";
import "./gamedetails.css";
import Footer from "../components/Footer";
import { Triangle } from "react-loader-spinner";

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
  const storesRef = useRef<HTMLDivElement>(null);

  const align = useBreakpointValue({
    lg: "start",
    md: "center",
    sm: "center",
  });

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
  if (isLoading) return   <Center h="100vh">
<Triangle
  visible={true}
  height="2500"
  width="250"
  color="#4fa94d"
  ariaLabel="triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
</Center>
  if (error) return <div>Error: {error}</div>;
  if (!gameDetail) return <div>No data available</div>;

  const formattedDescription = gameDetail.description
    .split("Español")[0]
    .replace(/<br\s*\/?>/gi, "")
    .replace(/<\/?p>/gi, "")
    .split("\n");

  const formattedlink = gameDetail.website
    .replace(/^https?:\/\//i, "")
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
  const scrollToStores = () => {
    if (storesRef.current) {
      storesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar title={gameDetail.name} />
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: "20%",
          left: "4vw",
          width: "90%",
        }}
      >
        <Heading as="h2" size="3xl"
        style={{
        textShadow: '5px 5px 5px black'
        }}
        >
          {gameDetail.name}
        </Heading>
        <Button
          top="10vh"
          colorScheme="yellow"
          onClick={scrollToStores}
        >
          Purchase
        </Button>
        <Hide below="1503px">
          <Stack
            direction={"row"}
            spacing="10"
            style={{
              top: "30vh",
              position: "absolute",
              left: "50vw",
            }}
          >
            <WrapItem
              maxW="sm"
              border="10px solid #ddd"
              borderRadius="md"
              p={4}
              justifyContent="center"
              alignItems="center"
              backgroundColor="rgba(0, 0, 0, 0.5)" 
            >
              <Center>
                <Stack direction={"row"}>
                  <Heading as="h1" size="4xl">
                    {gameDetail.metacritic}
                  </Heading>
                  <Text fontSize="xl">Metacritic<br></br> Score</Text>
                </Stack>
              </Center>
            </WrapItem>
            <WrapItem 
              backgroundColor="rgba(0, 0, 0, 0.5)" 
            border="10px solid #ddd" borderRadius="lg" maxW="sm">
              <Heading size="md" textTransform="uppercase" padding='2px'>
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
        <Show below="1503px">
          <Stack
            direction={"column"}
            spacing="3"
            style={{
              top: "20vh",
              position: "absolute",
              left: "60vw",
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
            <WrapItem 
              backgroundColor="rgba(0, 0, 0, 0.5)" 
            border="10px solid #ddd" borderRadius="lg" maxW="sm">
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
      <div
        className="details"
        style={{
          padding: "0",
          background:
            "repeating-linear-gradient(to bottom, rgba(83, 83, 83, 1) 0%, rgba(19, 19, 19, 1) 25%,rgba(83, 83, 83, 1) 50%)",
        }}
      >
        <div
          style={{
            background: "rgba(39, 39, 39, 1)",
          }}
        >
          <Center padding='20px'>
            <Heading as="h2" size="3xl" marginBottom={7}>
              Achievments
            </Heading>
          </Center>
          <div style={{
            width:'90%',
            maxWidth:'1980px',
            margin:'auto'
          }}>
            <Center></Center>
          <Achievments ids={id} />
          </div>
        </div>
        <Center margin="0 25px 0 25px">
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
            maxW="2062px"
          >
            <HStack>
              <VStack>
                {formattedDescription.map((paragraph, index) => (
                  <Text key={index} mb={4}>
                    {paragraph}
                  </Text>
                ))}
              </VStack>
              <Show breakpoint="(min-width: 1040px)">
                <Image
                  src={gameDetail.background_image}
                  boxSize="400px"
                  objectFit="cover"
                />
              </Show>
            </HStack>
          </Box>
        </Center>
        <Center>
          <Box
            boxShadow="dark-lg"
            marginTop="20px"
            marginBottom="50px"
            maxW="600px"
            width="100%"
            border="4px"
          >
            <HStack>
              <VStack margin="30px 0 30px 0">
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
              <VStack margin="30px 0 30px 0">
                <Heading size="lg" marginRight="30px">
                  {formattedDay} {monthName} {year}
                </Heading>
                <Text as="samp">Released: </Text>
              </VStack>
            </HStack>
          </Box>
        </Center>
        <Center>
          <Stack
            direction={{
              base: "column",
              md: "column", // change to row direction at medium breakpoint
              lg: "row", // change to column direction at large breakpoint
            }}
            spacing="24px"
            maxW="1000px"
            width="100%"
          >
            <VStack align={align} width="100%" maxW="600px">
              <Text
                fontWeight="800"
                fontSize="40px"
                color="rgba(172, 172, 172, 1)"
              >
                Purchase
              </Text>
              <HStack align={align} width="100%">
                <Heading fontWeight="900" fontSize="60px">
                  {gameDetail.name}
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "35px",
                      color: "rgba(172, 172, 172, 1)",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;From
                  </span>
                </Heading>
              </HStack>
            </VStack>
            <Spacer />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div ref={storesRef}>
                <Stores ids={id} />
              </div>
            </div>
          </Stack>
        </Center>
        <Divider margin="20px 0 0 0" />
        <Footer />
      </div>
    </div>
  );
};

export default GameDetail;
