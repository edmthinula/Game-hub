import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Image,
  Card,
  CardBody,
  Stack,
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
      items: 3,
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
          <Card
          
            maxW="lg"
            height="100%"
            width="80%"
            key={achi.id}
            position="relative"
            overflow="hidden"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${achi.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)", // Adjust the blur amount as needed
                zIndex: 0,
              }}
            />
            <CardBody
              style={{
                position: "relative",
                zIndex: 1,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 50%)",
                color: "white", // Set text color to white for better contrast
              }}
            >
              <Center>
                <Image
                  src={achi.image}
                  alt={achi.name}
                  borderRadius="lg"
                  boxShadow="0 4px 8px rgba(0,0,0,0.2)" // Optional: adds a subtle shadow to the image
                />
              </Center>
              <Stack
                mt="6"
                spacing="3"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
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
