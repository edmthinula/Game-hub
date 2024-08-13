import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Stack,
  StackDivider,
  Text,
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
  // Add other fields as needed
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
      <div className="details">
        <Flex display={{ xl: "flex" }} align="center" width="100%">
          <Box boxShadow="dark-lg" marginTop='auto' marginBottom='auto'>
            <Card >
              <CardHeader>
                <Heading size="lg">{gameDetail.name}</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="md" textTransform="uppercase">
                      Released: {gameDetail.released}
                    </Heading>
                  </Box>
                  <Box>
                    <Heading size="md" textTransform="uppercase">
                      Metacritic Score: {gameDetail.metacritic}
                    </Heading>
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
                    <Heading size="md" textTransform="uppercase">
                      Platforms:{" "}
                      <Text>
                        {gameDetail.platforms
                          .map((platform) => platform.platform.name)
                          .join(", ")}
                      </Text>
                    </Heading>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Spacer />
          <Box width="100%" borderRadius="20px">
            <ScreenShots ids={id} />
          </Box>
        </Flex>
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

        <Achievments ids={id}/>
        <Stores ids={id}/>
      </div>
    </div>
  );
};

export default GameDetail;
