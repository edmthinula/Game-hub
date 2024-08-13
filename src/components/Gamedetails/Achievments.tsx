import React, { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <>
      <h2>Achivements</h2>
      {achi.map((achi) => (
        <Card maxW="sm">
          <CardBody>
            <Image
              src={achi.image}
              alt={achi.name}
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{achi.name}</Heading>
              <Text>
               {achi.description}
              </Text>
            </Stack>
          </CardBody>
         
        </Card>
      ))}
    </>
  );
}

export default Achievments;
