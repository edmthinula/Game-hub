import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";

interface AchievmentsProps {
  ids: string | undefined;
}
interface Achievments {
  id: string;
  name: string;
  description: string;
  image: string;
}
function Achievments({ ids }: AchievmentsProps) {
  const [achi, setachi] = useState<Achievments[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievments = async () => {
      try {
        const response = await axios.get<{ results: Achievments[] }>(
          `https://api.rawg.io/api/games/${ids}/achievements?key=7ff649f928e448d58ceaaadcb391c639`
        );
        setachi(response.data.results);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchAchievments();
  }, [ids]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel responsive={responsive}>
        {achi.map((achi) => (
          <Card maxW="lg" width="80%" key={achi.id}>
            <CardBody>
              <Center>
                <Image src={achi.image} alt={achi.name} borderRadius="lg" />
              </Center>
              <Stack mt="6" spacing="3">
                <Heading size="md">{achi.name}</Heading>
                <Text>{achi.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Carousel>
    </>
  );
}

export default Achievments;
