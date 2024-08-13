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

  return (
    <div>
      <div
        className="fixedimg"
        style={{
          backgroundImage: `url(${gameDetail.background_image})`,
        }}
      />
      <div className="details">
        <Flex display={{ md: "flex" }}  align="center"  width="100%">
          <Box>
            <Card>
              <CardHeader>
                <Heading size="md">Client Report</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Overview
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Check out the overview of your clients.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Analysis
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      See a detailed analysis of all your business clients.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Spacer />
          <Box width="100%">
          <ScreenShots ids={id} />
          </Box>
        </Flex>
        <h1>{gameDetail.name}</h1>
        <p>Released: {gameDetail.released}</p>
        <p>Metacritic Score: {gameDetail.metacritic}</p>
        <p>{gameDetail.description}</p>
        <p>
          Website:{" "}
          <a
            href={gameDetail.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {gameDetail.website}
          </a>
        </p>
        <p>
          Platforms:{" "}
          {gameDetail.platforms
            .map((platform) => platform.platform.name)
            .join(", ")}
        </p>
        {/* <ScreenShots ids={id} /> */}
        {/* <Achievments ids={id}/> */}
        {/* <Stores ids={id}/> */}
      </div>
    </div>
  );
};

export default GameDetail;
