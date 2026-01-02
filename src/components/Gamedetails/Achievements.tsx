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
import useAchievements from "../../hooks/useAchievements";

interface AchievementsProps {
  id: string | undefined;
}

function Achievements({ id }: AchievementsProps) {
  // FIX 1: Call the hook unconditionally at the top level.
  // If id is undefined, we pass an empty string (or handle it inside the hook),
  // but we MUST call the hook every render.
  const { data, error, isLoading } = useAchievements(id || "");

  // FIX 2: If there is no ID, we shouldn't render the carousel at all.
  if (!id) return null;

  if (error) return null; // Or return <Text>Error loading achievements</Text>
  if (isLoading) return null; // Or a Spinner

  const responsive = {
    superLargeDesktop: {
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
        {/* FIX 3: Use 'data' directly. No need for local state. */}
        {data.map((achievement) => (
          <Card
            maxW="lg"
            height="100%"
            width="80%"
            key={achievement.id}
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
                backgroundImage: `url(${achievement.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)",
                zIndex: 0,
              }}
            />
            <CardBody
              style={{
                position: "relative",
                zIndex: 1,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 50%)",
                color: "white",
              }}
            >
              <Center>
                <Image
                  src={achievement.image}
                  alt={achievement.name}
                  borderRadius="lg"
                  boxShadow="0 4px 8px rgba(0,0,0,0.2)"
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
                <Heading size="md">{achievement.name}</Heading>
                <Text>{achievement.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Carousel>
    </>
  );
}

export default Achievements;
